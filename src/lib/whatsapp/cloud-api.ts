/**
 * Adaptador WhatsApp Cloud API (oficial do Meta).
 *
 * Referência: https://developers.facebook.com/docs/whatsapp/cloud-api
 */

import crypto from "node:crypto";
import { env } from "../env";
import type {
  SendMediaInput,
  SendResult,
  SendTemplateInput,
  SendTextInput,
  WebhookMessage,
  WhatsAppProvider,
} from "./provider";

const GRAPH = "https://graph.facebook.com";

type GraphSendResponse = {
  messaging_product: "whatsapp";
  contacts?: { input: string; wa_id: string }[];
  messages: { id: string }[];
};

type GraphError = {
  error?: { message?: string; type?: string; code?: number; error_subcode?: number; fbtrace_id?: string };
};

function toE164Digits(wa: string): string {
  return wa.replace(/\D/g, "");
}

async function graphFetch<T>(path: string, init: RequestInit): Promise<T> {
  const token = env.whatsapp.accessToken();
  if (!token) {
    throw new Error("WHATSAPP_ACCESS_TOKEN não configurado.");
  }
  const url = `${GRAPH}/${env.whatsapp.graphVersion()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // corpo não era JSON
  }
  if (!res.ok) {
    const err = (parsed as GraphError)?.error;
    throw new Error(
      `Graph API ${res.status}: ${err?.message ?? text ?? "erro desconhecido"}`
    );
  }
  return parsed as T;
}

async function sendToPhoneNumber(body: Record<string, unknown>): Promise<SendResult> {
  const phoneNumberId = env.whatsapp.phoneNumberId();
  if (!phoneNumberId) throw new Error("WHATSAPP_PHONE_NUMBER_ID não configurado.");
  const response = await graphFetch<GraphSendResponse>(`/${phoneNumberId}/messages`, {
    method: "POST",
    body: JSON.stringify({ messaging_product: "whatsapp", ...body }),
  });
  return { waMessageId: response.messages[0]?.id ?? "", raw: response };
}

export const cloudApiProvider: WhatsAppProvider = {
  name: "cloud_api",

  async sendText(input: SendTextInput) {
    const body: Record<string, unknown> = {
      to: toE164Digits(input.to),
      type: "text",
      text: { body: input.text, preview_url: input.previewUrl ?? false },
    };
    if (input.replyToWaMessageId) {
      body.context = { message_id: input.replyToWaMessageId };
    }
    return sendToPhoneNumber(body);
  },

  async sendTemplate(input: SendTemplateInput) {
    return sendToPhoneNumber({
      to: toE164Digits(input.to),
      type: "template",
      template: {
        name: input.template,
        language: { code: input.language ?? "pt_BR" },
        components: input.components ?? [],
      },
    });
  },

  async sendMedia(input: SendMediaInput) {
    const media: Record<string, unknown> = { link: input.mediaUrl };
    if (input.caption && (input.kind === "image" || input.kind === "video" || input.kind === "document")) {
      media.caption = input.caption;
    }
    if (input.filename && input.kind === "document") {
      media.filename = input.filename;
    }
    return sendToPhoneNumber({
      to: toE164Digits(input.to),
      type: input.kind,
      [input.kind]: media,
    });
  },

  verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
    const secret = env.whatsapp.appSecret();
    if (!secret) return false;
    if (!signatureHeader) return false;
    // Meta envia no formato: "sha256=<hex>"
    const received = signatureHeader.startsWith("sha256=")
      ? signatureHeader.slice(7)
      : signatureHeader;
    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    // timingSafeEqual exige mesmo tamanho
    const recvBuf = Buffer.from(received, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (recvBuf.length !== expBuf.length) return false;
    return crypto.timingSafeEqual(recvBuf, expBuf);
  },

  parseWebhook(payload: unknown): WebhookMessage[] {
    // Estrutura (resumida):
    // { entry: [ { changes: [ { value: { messages?: [...], statuses?: [...], contacts?: [...] } } ] } ] }
    const out: WebhookMessage[] = [];
    const p = payload as {
      entry?: Array<{
        changes?: Array<{
          value?: {
            messages?: Array<Record<string, unknown>>;
            statuses?: Array<Record<string, unknown>>;
            contacts?: Array<{ wa_id?: string; profile?: { name?: string } }>;
            metadata?: { display_phone_number?: string; phone_number_id?: string };
          };
        }>;
      }>;
    };

    for (const entry of p.entry ?? []) {
      for (const change of entry.changes ?? []) {
        const value = change.value ?? {};
        const toPhone = value.metadata?.display_phone_number ?? "";
        const contacts = value.contacts ?? [];

        for (const msg of value.messages ?? []) {
          const id = String(msg.id ?? "");
          const from = String(msg.from ?? "");
          const ts = new Date(Number(msg.timestamp ?? 0) * 1000);
          const contactName = contacts.find((c) => c.wa_id === from)?.profile?.name;
          const type = String(msg.type ?? "text");

          if (type === "text") {
            const text = (msg.text as { body?: string } | undefined)?.body ?? "";
            out.push({ kind: "text", waMessageId: id, from, to: toPhone, text, timestamp: ts, contactName });
          } else if (
            type === "image" ||
            type === "audio" ||
            type === "video" ||
            type === "document" ||
            type === "sticker"
          ) {
            const media = (msg as Record<string, { id?: string; mime_type?: string; caption?: string }>)[type];
            out.push({
              kind: "media",
              waMessageId: id,
              from,
              to: toPhone,
              mediaId: String(media?.id ?? ""),
              mediaType: type as "image" | "audio" | "video" | "document" | "sticker",
              mime: media?.mime_type,
              caption: media?.caption,
              timestamp: ts,
              contactName,
            });
          }
          // outros tipos (location, contacts, interactive, reaction) podem ser adicionados depois
        }

        for (const s of value.statuses ?? []) {
          const id = String(s.id ?? "");
          const status = String(s.status ?? "sent") as "sent" | "delivered" | "read" | "failed";
          const ts = new Date(Number(s.timestamp ?? 0) * 1000);
          const err = (s.errors as Array<{ code?: number; title?: string }> | undefined)?.[0];
          out.push({
            kind: "status",
            waMessageId: id,
            status,
            timestamp: ts,
            errorCode: err?.code,
            errorTitle: err?.title,
          });
        }
      }
    }

    return out;
  },
};
