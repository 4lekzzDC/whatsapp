/**
 * Acesso tipado e validado às variáveis de ambiente.
 *
 * Estratégia:
 *   - `get("X")` → retorna string (lança se ausente em produção; vazio em dev)
 *   - `getOptional("X")` → retorna `string | undefined`, nunca lança
 *
 * Em desenvolvimento, a ausência de uma env não derruba o app; chamadas
 * que dependam dela simplesmente retornam erros controlados nos handlers.
 */

function read(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export function getOptional(name: string): string | undefined {
  return read(name);
}

export function get(name: string, fallback?: string): string {
  const v = read(name);
  if (v !== undefined) return v;
  if (fallback !== undefined) return fallback;
  if (process.env.NODE_ENV === "production") {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  }
  return "";
}

export function isConfigured(...names: string[]): boolean {
  return names.every((n) => read(n) !== undefined);
}

export const env = {
  databaseUrl: () => getOptional("DATABASE_URL"),
  jwtSecret: () => getOptional("JWT_SECRET"),
  appUrl: () => getOptional("APP_URL") ?? "http://localhost:3000",
  whatsapp: {
    phoneNumberId: () => getOptional("WHATSAPP_PHONE_NUMBER_ID"),
    wabaId: () => getOptional("WHATSAPP_BUSINESS_ACCOUNT_ID"),
    accessToken: () => getOptional("WHATSAPP_ACCESS_TOKEN"),
    webhookVerifyToken: () => getOptional("WHATSAPP_WEBHOOK_VERIFY_TOKEN"),
    appSecret: () => getOptional("WHATSAPP_APP_SECRET"),
    graphVersion: () => getOptional("WHATSAPP_GRAPH_VERSION") ?? "v21.0",
  },
  /** true quando todas as credenciais do Cloud API estão presentes. */
  whatsappReady(): boolean {
    return isConfigured(
      "WHATSAPP_PHONE_NUMBER_ID",
      "WHATSAPP_ACCESS_TOKEN",
      "WHATSAPP_WEBHOOK_VERIFY_TOKEN",
      "WHATSAPP_APP_SECRET"
    );
  },
  dbReady(): boolean {
    return isConfigured("DATABASE_URL");
  },
};
