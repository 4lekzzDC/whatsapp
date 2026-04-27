"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

const NORATECH_URL = process.env.NEXT_PUBLIC_NORATECH_URL || "https://noratech.com.br";

export async function sair() {
  const sb = await getSupabaseServer();
  await sb.auth.signOut();
  redirect(`${NORATECH_URL}/entrar`);
}
