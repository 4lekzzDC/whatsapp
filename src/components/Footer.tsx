"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const footerLinks = {
  Produto: [
    { label: "Funcionalidades", href: "/funcionalidades" },
    { label: "Integrações", href: "/integracoes" },
    { label: "Preços", href: "/precos" },
    { label: "Changelog", href: "/changelog" },
  ],
  Empresa: [
    { label: "Sobre", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Carreiras", href: "/carreiras" },
    { label: "Contato", href: "/contato" },
  ],
  Recursos: [
    { label: "Documentação", href: "/documentacao" },
    { label: "API", href: "/api-docs" },
    { label: "Guias", href: "/guias" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos", href: "/termos" },
    { label: "LGPD", href: "/lgpd" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-green-primary/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-primary" />
              </div>
              <span className="text-base font-bold">WhatsApp Bot</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Automatize o atendimento via WhatsApp com inteligência artificial.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} WhatsApp Bot. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidade" className="text-xs text-text-muted hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="text-xs text-text-muted hover:text-white transition-colors">
              Termos
            </Link>
            <Link href="/lgpd" className="text-xs text-text-muted hover:text-white transition-colors">
              LGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
