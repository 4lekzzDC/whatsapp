/**
 * Resolve qual WhatsApp provider usar em runtime.
 * Hoje só temos Cloud API. Quando adicionarmos Baileys, passa a
 * escolher via env (`WHATSAPP_PROVIDER`) ou por tenant no banco.
 */

import { cloudApiProvider } from "./cloud-api";
import type { WhatsAppProvider } from "./provider";

export function getProvider(): WhatsAppProvider {
  return cloudApiProvider;
}

export * from "./provider";
