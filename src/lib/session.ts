import { cookies } from "next/headers";

export const SESSION_COOKIE = "wb_session";

export type Session = {
  email: string;
  name: string;
};

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

// `BASE_PATH` é injetado em build time pelo next.config.ts via env, e replicado
// em `NEXT_PUBLIC_BASE_PATH`. Escopa o cookie ao subpath para não vazar para
// outras apps quando o painel roda em noratech.com.br/painel/falahub.
const COOKIE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "/";

export async function setSession(session: Session) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, encodeURIComponent(JSON.stringify(session)), {
    path: COOKIE_PATH,
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const jar = await cookies();
  // Sobrescreve com maxAge=0 no mesmo path em que foi setado — `delete()` sem
  // path usa "/" e não remove cookies escopados em /painel/falahub.
  jar.set(SESSION_COOKIE, "", {
    path: COOKIE_PATH,
    maxAge: 0,
  });
}
