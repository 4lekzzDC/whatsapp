import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo */}
      <div className="hidden lg:flex flex-col justify-between flex-1 bg-gradient-to-br from-green-dark/30 via-background to-background border-r border-white/5 p-10 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-green-primary/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-primary" />
          </div>
          <span className="text-lg font-bold">WhatsApp Bot</span>
        </Link>

        <div className="relative max-w-md">
          <p className="text-xs uppercase tracking-wider text-green-primary font-semibold mb-3">
            Atendimento inteligente
          </p>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            Centralize todo o seu atendimento via WhatsApp em um único painel.
          </h2>
          <p className="text-text-muted leading-relaxed">
            Conecte seus números, organize por setores, automatize com IA e
            acompanhe métricas em tempo real.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: "92%", l: "Resolução" },
              { v: "8s", l: "Resposta" },
              { v: "24/7", l: "Online" },
            ].map((s) => (
              <div key={s.l} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-green-primary">{s.v}</p>
                <p className="text-[11px] text-text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-text-muted">
          &copy; {new Date().getFullYear()} WhatsApp Bot
        </p>
      </div>

      {/* Lado direito (formulário) */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm mx-auto">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-green-primary/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-primary" />
            </div>
            <span className="text-base font-bold">WhatsApp Bot</span>
          </Link>

          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-sm text-text-muted mb-6">{subtitle}</p>
          {children}
          {footer && <div className="mt-6 text-center text-sm text-text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
