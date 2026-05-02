import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase/server";
import { deleteInstance } from "@/lib/evolution";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;

  const sb = await getSupabaseServer();
  const { data: row, error: rowError } = await sb
    .from("whatsapp_connections")
    .select("id, instance_name, owner_id")
    .eq("id", id)
    .maybeSingle();
  if (rowError) return NextResponse.json({ error: rowError.message }, { status: 500 });
  if (!row || row.owner_id !== session.id)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  try {
    await deleteInstance(row.instance_name);
  } catch {
    // even if Evolution doesn't know about it, drop the local row
  }
  await sb.from("whatsapp_connections").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
