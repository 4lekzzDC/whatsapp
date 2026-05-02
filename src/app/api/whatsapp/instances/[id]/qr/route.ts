import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase/server";
import { connectInstance, getConnectionState, mapState } from "@/lib/evolution";

export const dynamic = "force-dynamic";

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
    .select("id, instance_name, owner_id, status, last_qr")
    .eq("id", id)
    .maybeSingle();
  if (!row || row.owner_id !== session.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  // First, check current state — if already connected we don't need a QR.
  let status: "connected" | "connecting" | "disconnected" | "qr" = row.status;
  try {
    const state = await getConnectionState(row.instance_name);
    status = mapState(state.instance?.state);
  } catch {
    // ignore
  }

  if (status === "connected") {
    await sb
      .from("whatsapp_connections")
      .update({ status: "connected", last_qr: null, last_seen_at: new Date().toISOString() })
      .eq("id", id);
    return NextResponse.json({ status: "connected", qr: null });
  }

  let qr: string | null = row.last_qr ?? null;
  try {
    const r = await connectInstance(row.instance_name);
    if (r.base64) qr = r.base64;
  } catch {
    // keep last cached QR
  }

  await sb
    .from("whatsapp_connections")
    .update({ status: "qr", last_qr: qr, last_qr_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ status: "qr", qr });
}
