import { redirect } from "next/navigation";
import { getSupabaseServer } from "./supabase/server";

const NORATECH_URL = process.env.NEXT_PUBLIC_NORATECH_URL || "https://noratech.com.br";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://falahub.noratech.com.br";
const REQUIRE_ENTITLEMENT =
  (process.env.FALAHUB_REQUIRE_ENTITLEMENT || "false").toLowerCase() === "true";

export type Session = {
  id: string;
  email: string;
  name: string;
};

export async function getSession(): Promise<Session | null> {
  const sb = await getSupabaseServer();
  const { data } = await sb.auth.getUser();
  const user = data.user;
  if (!user) return null;

  let name =
    (user.user_metadata?.name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    "";

  if (!name) {
    const { data: profile } = await sb
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();
    name = profile?.name ?? "";
  }

  if (!name) name = user.email?.split("@")[0] ?? "Usuário";

  return { id: user.id, email: user.email ?? "", name };
}

function loginRedirect(returnTo: string): never {
  const url = new URL(`${NORATECH_URL}/entrar`);
  url.searchParams.set("next", `${APP_URL}${returnTo}`);
  redirect(url.toString());
}

export async function requireFalahubAccess(returnTo: string): Promise<Session> {
  const session = await getSession();
  if (!session) loginRedirect(returnTo);

  if (REQUIRE_ENTITLEMENT) {
    const sb = await getSupabaseServer();
    const { data, error } = await sb
      .from("entitlements")
      .select("status")
      .eq("user_id", session.id)
      .eq("product", "falahub")
      .maybeSingle();
    const ok = !error && data && ["active", "trial"].includes(data.status);
    if (!ok) redirect(`${NORATECH_URL}/portal?erro=sem-acesso-falahub`);
  }

  return session;
}
