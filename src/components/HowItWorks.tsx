"use client";

import { MessageCircle, Inbox, Send, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Conecte seu WhatsApp",
    description:
      "Escaneie o QR Code e vincule um ou mais números. Cada número pode ser direcionado a um setor.",
  },
  {
    icon: Inbox,
    number: "02",
    title: "Todas as conversas organizadas",
    description:
      "Caixa de entrada compartilhada por setor, com tags, respostas rápidas e histórico completo do cliente.",
  },
  {
    icon: Send,
    number: "03",
    title: "Atenda e dispare mensagens",
    description:
      "Responda de qualquer lugar, em equipe, e agende campanhas, lembretes e respostas automáticas.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Ative a IA quando quiser",
    description:
      "Ligue o add-on de IA e o bot começa a entender e resolver conversas sozinho, chamando o humano só quando preciso.",
    addon: true,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Rápido de começar, <span className="gradient-text">fácil de operar</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Do primeiro QR Code até o atendimento em escala, em quatro passos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green-primary/20 via-green-primary/40 to-green-primary/20" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative text-center group">
                <div
                  className={`relative mx-auto w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 transition-all ${
                    step.addon
                      ? "bg-accent-purple/10 border-accent-purple/20 group-hover:bg-accent-purple/20"
                      : "bg-green-primary/10 border-green-primary/20 group-hover:bg-green-primary/20"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${step.addon ? "text-accent-purple" : "text-green-primary"}`}
                  />
                  <span
                    className={`absolute -top-2 -right-2 text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      step.addon ? "bg-accent-purple text-white" : "bg-green-primary text-black"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                {step.addon && (
                  <span className="inline-block text-[10px] font-semibold bg-accent-purple/15 text-accent-purple px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                    Add-on opcional
                  </span>
                )}
                <p className="text-sm text-text-muted leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
