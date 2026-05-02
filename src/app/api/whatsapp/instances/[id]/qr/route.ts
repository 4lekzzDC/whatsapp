import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  connectInstance,
  createInstance,
  EvolutionError,
  getConnectionState,
  mapState,
  setWebhook,
} from "@/lib/evolution";

export const dynamic = "force-dynamic";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://falahub.noratech.com.br";

function isMissingInstance(e: unknown): boolean {
  if (!(e instanceof EvolutionError)) return false;
  if (e.status === 404) return true;
  const body = e.body as { message?: unknown; response?: { message?: unknown } } | null;
  const blob = JSON.stringify(body ?? {}).toLowerCase();
  return blob.includes("does not exist") || blob.includes("not found");
}

async function ensureInstanceExists(instanceName: string): Promise<void> {
  try {
    await getConnectionState(instanceName);
    return;
  } catch (e) {
    if (!isMissingInstance(e)) throw e;
  }
  await createInstance({ instanceName });
  try {
    await setWebhook(instanceName, {
      url: `${APP_URL}/api/whatsapp/webhook`,
      byEvents: false,
      base64: true,
    });
  } catch {
    // best-effort
  }
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;

  const sb = await getSupabaseServer();
  const { data: row } = await sb
    .from("whatsapp_connections")
    .select("id, instance_name, owner_id, status")
    .eq("id", id)
    .maybeSingle();
  if (!row || row.owner_id !== session.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  // Recreate the instance on Evolution if it was deleted there.
  try {
    await ensureInstanceExists(row.instance_name);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "evolution error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  // Already connected? Don't bother fetching a QR.
  try {
    const state = await getConnectionState(row.instance_name);
    if (mapState(state.instance?.state) === "connected") {
      await sb
        .from("whatsapp_connections")
        .update({
          status: "connected",
          last_qr: null,
          last_qr_at: null,
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", id);
      return NextResponse.json({ status: "connected", qr: null });
    }
  } catch {
    // ignore — we'll try to connect below
  }

  let qr: string | null = null;
  try {
    const r = await connectInstance(row.instance_name);
    qr = r.base64 ?? null;
  } catch {
    // leave qr as null — the UI keeps polling
  }

  await sb
    .from("whatsapp_connections")
    .update({
      status: "qr",
      last_qr: qr,
      last_qr_at: qr ? new Date().toISOString() : null,
    })
    .eq("id", id);

  return NextResponse.json({ status: "qr", qr });
}
