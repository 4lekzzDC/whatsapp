import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  createInstance,
  connectInstance,
  mapState,
  getConnectionState,
  setWebhook,
} from "@/lib/evolution";

export const dynamic = "force-dynamic";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://falahub.noratech.com.br";

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32) || "wa";
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sb = await getSupabaseServer();
  const { data, error } = await sb
    .from("whatsapp_connections")
    .select("id, name, instance_name, sector_id, phone, status, last_seen_at, messages_count, battery, created_at")
    .eq("owner_id", session.id)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Best-effort sync of state with Evolution (non-fatal).
  const rows = data ?? [];
  await Promise.all(
    rows.map(async (row) => {
      try {
        const r = await getConnectionState(row.instance_name);
        const mapped = mapState(r.instance?.state);
        if (mapped !== row.status && row.status !== "qr") {
          await sb.from("whatsapp_connections").update({ status: mapped }).eq("id", row.id);
          row.status = mapped;
        }
      } catch {
        // ignore — Evolution might be down briefly
      }
    }),
  );

  return NextResponse.json({ connections: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const sectorId = body.sector_id ? String(body.sector_id) : null;
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  const sb = await getSupabaseServer();
  const instanceName = `${slugify(name)}-${Date.now().toString(36)}`;

  let qrBase64: string | null = null;
  try {
    const created = await createInstance({ instanceName });
    qrBase64 = created.qrcode?.base64 ?? null;

    // Register the webhook AFTER creation (v2.2.x requires a separate call).
    // Best-effort: if it fails, the instance still exists and we'll fall back
    // to polling in the UI.
    try {
      await setWebhook(instanceName, {
        url: `${APP_URL}/api/whatsapp/webhook`,
        byEvents: false,
        base64: true,
      });
    } catch {
      // ignore — webhook can be reconfigured later
    }

    // The QR may not be ready in the create response; poll /instance/connect
    // a couple of times before giving up (UI will keep polling anyway).
    for (let i = 0; i < 3 && !qrBase64; i++) {
      await new Promise((r) => setTimeout(r, 800));
      try {
        const cn = await connectInstance(instanceName);
        qrBase64 = cn.base64 ?? null;
      } catch {
        // keep trying
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "evolution error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const { data, error } = await sb
    .from("whatsapp_connections")
    .insert({
      owner_id: session.id,
      name,
      instance_name: instanceName,
      sector_id: sectorId,
      status: "qr",
      last_qr: qrBase64,
      last_qr_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ connection: data, qr: qrBase64 });
}
