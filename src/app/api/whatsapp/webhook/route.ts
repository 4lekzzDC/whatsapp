import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// The webhook is called by the Evolution API server (not the browser),
// so we use a service-role client that bypasses RLS to update rows by
// instance_name. The shared secret is sent via the `apikey` header.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SHARED_SECRET = process.env.EVOLUTION_API_KEY || "";

function adminClient() {
  return createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

type EvoWebhookBody = {
  event?: string;
  instance?: string;
  data?: Record<string, unknown> & {
    state?: string;
    qrcode?: { base64?: string; code?: string };
    base64?: string;
    code?: string;
  };
  destination?: string;
  date_time?: string;
  sender?: string;
  server_url?: string;
};

export async function POST(req: Request) {
  if (SHARED_SECRET) {
    const headerKey = req.headers.get("apikey") || req.headers.get("x-api-key") || "";
    if (headerKey !== SHARED_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const body = (await req.json().catch(() => null)) as EvoWebhookBody | null;
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const instanceName = body.instance;
  const event = (body.event || "").toUpperCase();
  if (!instanceName) return NextResponse.json({ ok: true });

  const sb = adminClient();
  const update: Record<string, unknown> = {};

  if (event === "QRCODE_UPDATED" || event === "QRCODE.UPDATED") {
    const qr = body.data?.qrcode?.base64 || body.data?.base64 || null;
    if (qr) {
      update.status = "qr";
      update.last_qr = qr;
      update.last_qr_at = new Date().toISOString();
    }
  } else if (event === "CONNECTION_UPDATE" || event === "CONNECTION.UPDATE") {
    const state = String(body.data?.state || "").toLowerCase();
    if (state === "open") {
      update.status = "connected";
      update.last_qr = null;
      update.last_seen_at = new Date().toISOString();
    } else if (state === "connecting") {
      update.status = "connecting";
    } else if (state === "close" || state === "closed") {
      update.status = "disconnected";
    }
  } else if (event === "MESSAGES_UPSERT" || event === "MESSAGES.UPSERT") {
    // increment counter; cheap and approximate
    const { data: row } = await sb
      .from("whatsapp_connections")
      .select("id, messages_count")
      .eq("instance_name", instanceName)
      .maybeSingle();
    if (row) {
      await sb
        .from("whatsapp_connections")
        .update({ messages_count: (row.messages_count ?? 0) + 1 })
        .eq("id", row.id);
    }
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(update).length > 0) {
    await sb.from("whatsapp_connections").update(update).eq("instance_name", instanceName);
  }
  return NextResponse.json({ ok: true });
}
