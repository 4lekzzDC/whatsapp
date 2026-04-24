import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/painel/AuthShell";
import { entrar } from "./actions";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Entrar — WhatsApp Bot",
};

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/painel/atendimentos");

  const { erro } = await searchParams;

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse o painel da sua empresa."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-green-primary hover:underline font-medium">
            Cadastre-se grátis
          </Link>
        </>
      }
    >
      {erro && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {erro === "campos"
            ? "Preencha e-mail e senha."
            : "Não foi possível entrar. Tente novamente."}
        </div>
      )}
      <form action={entrar} className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-white/80 mb-1.5 block">E-mail</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@empresa.com"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </label>
        <label className="block">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-white/80">Senha</span>
            <Link href="/entrar" className="text-xs text-text-muted hover:text-white">
              Esqueci minha senha
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-text-muted">
          <input type="checkbox" name="remember" defaultChecked className="accent-green-primary" />
          Manter conectado por 7 dias
        </label>
        <button
          type="submit"
          className="w-full bg-green-primary hover:bg-green-primary/90 text-black font-semibold py-2.5 rounded-lg text-sm"
        >
          Entrar
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-text-muted">
        <span className="flex-1 h-px bg-white/5" />
        ou
        <span className="flex-1 h-px bg-white/5" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="border border-white/10 hover:border-white/20 text-white/80 text-sm py-2 rounded-lg"
        >
          Google
        </button>
        <button
          type="button"
          className="border border-white/10 hover:border-white/20 text-white/80 text-sm py-2 rounded-lg"
        >
          Microsoft
        </button>
      </div>
    </AuthShell>
  );
}
