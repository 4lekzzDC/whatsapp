"use client";

import { MessageCircle } from "lucide-react";

const footerLinks = {
  Produto: ["Funcionalidades", "Integrações", "Preços", "Changelog"],
  Empresa: ["Sobre", "Blog", "Carreiras", "Contato"],
  Recursos: ["Documentação", "API", "Guias", "Status"],
  Legal: ["Privacidade", "Termos", "LGPD", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-green-primary/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-primary" />
              </div>
              <span className="text-base font-bold">WhatsApp Bot</span>
            </a>
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-muted hover:text-white transition-colors"
                    >
                      {link}
                    </a>
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
            <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">
              Termos
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">
              LGPD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
