"use server";

import { redirect } from "next/navigation";
import { setSession, clearSession } from "@/lib/session";

export async function entrar(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/entrar?erro=campos");
  }

  // Stub de autenticação enquanto não há backend.
  // Aceita qualquer e-mail/senha não vazios.
  const name = email.split("@")[0].replace(/[._-]/g, " ");
  await setSession({
    email,
    name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
  });

  redirect("/painel/atendimentos");
}

export async function cadastrar(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !password || !name) {
    redirect("/cadastro?erro=campos");
  }

  await setSession({ email, name });
  redirect("/painel/whatsapp");
}

export async function sair() {
  await clearSession();
  redirect("/entrar");
}
