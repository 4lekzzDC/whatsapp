import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/painel/AuthShell";
import { cadastrar } from "@/app/entrar/actions";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Criar conta — WhatsApp Bot",
};

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/painel/atendimentos");

  const { erro } = await searchParams;

  return (
    <AuthShell
      title="Criar conta grátis"
      subtitle="14 dias grátis. Sem cartão de crédito."
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/entrar" className="text-green-primary hover:underline font-medium">
            Entrar
          </Link>
        </>
      }
    >
      {erro && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          Preencha todos os campos.
        </div>
      )}
      <form action={cadastrar} className="space-y-4">
        <label className="block">
          <span className="text-xs font-medium text-white/80 mb-1.5 block">Nome</span>
          <input
            name="name"
            required
            placeholder="Seu nome completo"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-white/80 mb-1.5 block">E-mail corporativo</span>
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
          <span className="text-xs font-medium text-white/80 mb-1.5 block">Senha</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </label>
        <label className="flex items-start gap-2 text-xs text-text-muted">
          <input type="checkbox" required className="accent-green-primary mt-0.5" />
          <span>
            Concordo com os{" "}
            <Link href="/termos" className="text-green-primary hover:underline">
              Termos
            </Link>{" "}
            e a{" "}
            <Link href="/privacidade" className="text-green-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        <button
          type="submit"
          className="w-full bg-green-primary hover:bg-green-primary/90 text-black font-semibold py-2.5 rounded-lg text-sm"
        >
          Criar conta e conectar WhatsApp
        </button>
      </form>
    </AuthShell>
  );
}
