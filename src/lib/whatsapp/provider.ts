/**
 * Interface do WhatsApp Provider.
 *
 * Implementações concretas:
 *   - `CloudApiProvider` (oficial, produção)
 *   - (futuro) `BaileysProvider` (não oficial, QR Code, VPS dedicada)
 *
 * O restante do app só conhece esta interface, então trocar de provider
 * depois é só injetar outra implementação em `getProvider()`.
 */

export type WaId = string; // E.164 sem '+', ex: "5551998765432"

export type SendTextInput = {
  to: WaId;
  text: string;
  previewUrl?: boolean;
  /** Quando definido, responde a uma mensagem específica do Meta. */
  replyToWaMessageId?: string;
};

export type SendTemplateInput = {
  to: WaId;
  template: string;
  language?: string; // ex: "pt_BR"
  components?: unknown[]; // estrutura do Meta (header/body/button params)
};

export type SendMediaInput = {
  to: WaId;
  kind: "image" | "document" | "audio" | "video";
  mediaUrl: string;
  caption?: string;
  filename?: string;
};

export type SendResult = {
  waMessageId: string;
  raw: unknown;
};

export type WebhookMessage =
  | {
      kind: "text";
      waMessageId: string;
      from: WaId;
      to: WaId;
      text: string;
      timestamp: Date;
      contactName?: string;
    }
  | {
      kind: "media";
      waMessageId: string;
      from: WaId;
      to: WaId;
      mediaId: string;
      mediaType: "image" | "document" | "audio" | "video" | "sticker";
      mime?: string;
      caption?: string;
      timestamp: Date;
      contactName?: string;
    }
  | {
      kind: "status";
      waMessageId: string;
      status: "sent" | "delivered" | "read" | "failed";
      timestamp: Date;
      errorCode?: number;
      errorTitle?: string;
    };

export interface WhatsAppProvider {
  readonly name: "cloud_api" | "baileys";

  sendText(input: SendTextInput): Promise<SendResult>;
  sendTemplate(input: SendTemplateInput): Promise<SendResult>;
  sendMedia(input: SendMediaInput): Promise<SendResult>;

  /**
   * Recebe o body bruto do webhook (já em objeto) e retorna
   * mensagens normalizadas prontas para persistir/notificar UI.
   * Providers que não tenham webhook (Baileys) podem retornar `[]`
   * e emitir via outro canal.
   */
  parseWebhook(payload: unknown): WebhookMessage[];

  /**
   * Valida a origem do webhook. No Cloud API usa HMAC do X-Hub-Signature-256.
   */
  verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean;
}
