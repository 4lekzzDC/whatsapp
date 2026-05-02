// Thin client for the Evolution API (https://doc.evolution-api.com).
// All calls go through the internal localhost URL on the same VPS by default.

const BASE_URL = (process.env.EVOLUTION_API_URL || "http://localhost:8080").replace(/\/+$/, "");
const API_KEY = process.env.EVOLUTION_API_KEY || "";

export type EvolutionConnectionState = "open" | "connecting" | "close";

export type CreateInstanceResponse = {
  instance: { instanceName: string; instanceId?: string; status?: string };
  hash?: string | { apikey?: string };
  qrcode?: { base64?: string; code?: string; pairingCode?: string };
};

export type ConnectResponse = {
  base64?: string;
  code?: string;
  pairingCode?: string;
  count?: number;
};

export type ConnectionStateResponse = {
  instance?: { instanceName?: string; state?: EvolutionConnectionState };
};

class EvolutionError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message?: string) {
    super(message || `Evolution API error ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request<T>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<T> {
  if (!API_KEY) {
    throw new EvolutionError(500, null, "EVOLUTION_API_KEY is not configured");
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method: init.method ?? "GET",
    headers: {
      apikey: API_KEY,
      "content-type": "application/json",
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }
  if (!res.ok) throw new EvolutionError(res.status, parsed);
  return parsed as T;
}

export function evolutionConfigured(): boolean {
  return Boolean(API_KEY);
}

export async function createInstance(params: {
  instanceName: string;
  webhookUrl?: string;
  webhookByEvents?: boolean;
  events?: string[];
}): Promise<CreateInstanceResponse> {
  return request<CreateInstanceResponse>("/instance/create", {
    method: "POST",
    body: {
      instanceName: params.instanceName,
      qrcode: true,
      integration: "WHATSAPP-BAILEYS",
      ...(params.webhookUrl
        ? {
            webhook: {
              url: params.webhookUrl,
              byEvents: params.webhookByEvents ?? false,
              base64: true,
              events: params.events ?? [
                "QRCODE_UPDATED",
                "CONNECTION_UPDATE",
                "MESSAGES_UPSERT",
              ],
            },
          }
        : {}),
    },
  });
}

export async function connectInstance(instanceName: string): Promise<ConnectResponse> {
  return request<ConnectResponse>(`/instance/connect/${encodeURIComponent(instanceName)}`);
}

export async function getConnectionState(instanceName: string): Promise<ConnectionStateResponse> {
  return request<ConnectionStateResponse>(
    `/instance/connectionState/${encodeURIComponent(instanceName)}`,
  );
}

export async function logoutInstance(instanceName: string): Promise<unknown> {
  return request(`/instance/logout/${encodeURIComponent(instanceName)}`, { method: "DELETE" });
}

export async function deleteInstance(instanceName: string): Promise<unknown> {
  return request(`/instance/delete/${encodeURIComponent(instanceName)}`, { method: "DELETE" });
}

export async function restartInstance(instanceName: string): Promise<unknown> {
  return request(`/instance/restart/${encodeURIComponent(instanceName)}`, { method: "POST" });
}

export function mapState(state: EvolutionConnectionState | undefined | null): "connected" | "connecting" | "disconnected" {
  if (state === "open") return "connected";
  if (state === "connecting") return "connecting";
  return "disconnected";
}

export { EvolutionError };
