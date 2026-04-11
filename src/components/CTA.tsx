"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-card rounded-3xl p-10 lg:p-16 text-center overflow-hidden glow-border">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-primary/[0.08] via-transparent to-green-primary/[0.04]" />

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-green-primary/15 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-green-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Pronto para <span className="gradient-text">automatizar</span>
              <br />
              seu atendimento?
            </h2>

            <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
              Comece gratuitamente e veja como o WhatsApp Bot pode transformar o
              atendimento ao cliente da sua empresa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-green-primary/25 hover:scale-[1.02]"
              >
                Começar Gratuitamente
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium px-8 py-4 rounded-xl text-base transition-all hover:bg-white/5"
              >
                Agendar Demonstração
              </a>
            </div>

            <p className="text-xs text-text-muted mt-6">
              Sem cartão de crédito. Configuração em 5 minutos. Cancele quando quiser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
