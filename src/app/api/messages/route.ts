/**
 * POST /api/messages  → envia uma mensagem via Cloud API.
 *
 * Hoje faz o envio e retorna o id do Meta. Nas próximas iterações:
 *   - resolver/abrir ticket no banco
 *   - persistir como message (direction=out)
 *   - validar permissão do operador logado
 */

import { NextResponse } from "next/server";
import { getProvider } from "@/lib/whatsapp";
import { env } from "@/lib/env";
import { getSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SendBody =
  | { kind: "text"; to: string; text: string; previewUrl?: boolean; replyToWaMessageId?: string }
  | { kind: "template"; to: string; template: string; language?: string; components?: unknown[] }
  | {
      kind: "media";
      to: string;
      media: "image" | "document" | "audio" | "video";
      url: string;
      caption?: string;
      filename?: string;
    };

export async function POST(request: Request) {
  // Só operadores logados enviam.
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!env.whatsappReady()) {
    return NextResponse.json(
      { error: "WhatsApp Cloud API ainda não configurado no servidor." },
      { status: 503 }
    );
  }

  let body: SendBody;
  try {
    body = (await request.json()) as SendBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const provider = getProvider();

  try {
    let result;
    if (body.kind === "text") {
      if (!body.to || !body.text) {
        return NextResponse.json({ error: "to/text obrigatórios" }, { status: 400 });
      }
      result = await provider.sendText({
        to: body.to,
        text: body.text,
        previewUrl: body.previewUrl,
        replyToWaMessageId: body.replyToWaMessageId,
      });
    } else if (body.kind === "template") {
      result = await provider.sendTemplate({
        to: body.to,
        template: body.template,
        language: body.language,
        components: body.components,
      });
    } else if (body.kind === "media") {
      result = await provider.sendMedia({
        to: body.to,
        kind: body.media,
        mediaUrl: body.url,
        caption: body.caption,
        filename: body.filename,
      });
    } else {
      return NextResponse.json({ error: "kind desconhecido" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, waMessageId: result.waMessageId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
