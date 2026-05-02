import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase/server";
import { restartInstance } from "@/lib/evolution";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const sb = await getSupabaseServer();
  const { data: row } = await sb
    .from("whatsapp_connections")
    .select("instance_name, owner_id")
    .eq("id", id)
    .maybeSingle();
  if (!row || row.owner_id !== session.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  try {
    await restartInstance(row.instance_name);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "evolution error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
