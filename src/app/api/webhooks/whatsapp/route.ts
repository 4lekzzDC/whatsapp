/**
 * Webhook do WhatsApp Cloud API.
 *
 *   GET  /api/webhooks/whatsapp  → handshake de verificação do Meta
 *   POST /api/webhooks/whatsapp  → eventos (mensagens + status)
 *
 * Checklist de segurança:
 *   - GET confere hub.verify_token contra WHATSAPP_WEBHOOK_VERIFY_TOKEN
 *   - POST valida X-Hub-Signature-256 (HMAC SHA-256 com APP_SECRET)
 *   - POST responde 200 em ≤ 5s; processamento pesado fica async
 *   - Dedup de evento via webhook_events.event_id (quando houver DB)
 *
 * Em dev, sem DB, as mensagens só são logadas — o contrato do Meta é
 * respeitado e o webhook já pode ser apontado para painel.noratech.com.br.
 */

import { NextResponse } from "next/server";
import { getProvider } from "@/lib/whatsapp";
import { env } from "@/lib/env";
import { isDbReady, query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------- GET: verificação (subscrição do webhook no Meta) ----------

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const expected = env.whatsapp.webhookVerifyToken();
  if (!expected) {
    return new NextResponse("Webhook não configurado", { status: 503 });
  }
  if (mode === "subscribe" && token === expected) {
    // Meta exige retornar o challenge em texto puro.
    return new NextResponse(challenge ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// ---------- POST: eventos (mensagens recebidas + status) ----------

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  const provider = getProvider();

  if (!provider.verifyWebhookSignature(rawBody, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  // Responde já — processamento roda em segundo plano para ficar < 5s.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  processAsync(payload);

  return NextResponse.json({ ok: true });
}

async function processAsync(payload: unknown): Promise<void> {
  const provider = getProvider();
  const events = provider.parseWebhook(payload);

  // Sem DB: apenas loga (útil em dev enquanto não há schema rodando).
  if (!isDbReady()) {
    // eslint-disable-next-line no-console
    console.log("[webhook] %d eventos recebidos (DB offline):", events.length, events);
    return;
  }

  try {
    // Persistência de auditoria (idempotente via event_id quando disponível).
    const auditIds: string[] = [];
    for (const ev of events) {
      if ("waMessageId" in ev && ev.waMessageId) auditIds.push(ev.waMessageId);
    }
    await query(
      "INSERT INTO webhook_events (event_id, payload) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [auditIds[0] ?? null, payload as object]
    );

    // TODO nos próximos passos:
    //   - upsert em contacts (pelo wa_id + tenant)
    //   - open/reopen ticket associado
    //   - insert em messages (direction=in), respeitando UNIQUE wa_message_id
    //   - atualizar status de mensagens de saída quando ev.kind === "status"
    //   - emitir via SSE para o painel aberto
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[webhook] falha ao processar:", err);
  }
}
