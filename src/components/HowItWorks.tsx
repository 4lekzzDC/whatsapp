"use client";

import { MessageCircle, Brain, GitBranch, UserCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Cliente envia mensagem",
    description:
      "O cliente entra em contato via WhatsApp e é recebido instantaneamente pelo bot de atendimento.",
  },
  {
    icon: Brain,
    number: "02",
    title: "NLP analisa a intenção",
    description:
      "O sistema de NLP processa a mensagem, identifica a intenção e categoriza automaticamente o assunto.",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Pré-atendimento automático",
    description:
      "O bot coleta informações necessárias, responde dúvidas comuns e realiza triagem inteligente.",
  },
  {
    icon: UserCheck,
    number: "04",
    title: "Resolução ou transferência",
    description:
      "O atendimento é resolvido automaticamente ou transferido para um humano com todo o contexto.",
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
            Simples de usar,{" "}
            <span className="gradient-text">poderoso nos resultados</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Do primeiro contato à resolução, o processo é 100% automatizado e
            inteligente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green-primary/20 via-green-primary/40 to-green-primary/20" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative text-center group">
                <div className="relative mx-auto w-16 h-16 rounded-2xl bg-green-primary/10 border border-green-primary/20 flex items-center justify-center mb-6 group-hover:bg-green-primary/20 transition-all">
                  <Icon className="w-7 h-7 text-green-primary" />
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-green-primary text-black w-6 h-6 rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
