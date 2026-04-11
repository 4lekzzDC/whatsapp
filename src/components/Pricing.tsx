"use client";

import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "R$ 197",
    period: "/mês",
    description: "Ideal para pequenas empresas que estão começando.",
    features: [
      "Até 1.000 conversas/mês",
      "1 número de WhatsApp",
      "Chatbot básico",
      "Relatórios simples",
      "Suporte por email",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Professional",
    price: "R$ 497",
    period: "/mês",
    description: "Para empresas em crescimento que precisam escalar.",
    features: [
      "Até 5.000 conversas/mês",
      "3 números de WhatsApp",
      "NLP avançado com intenções",
      "Relatórios completos",
      "Transferência para humanos",
      "Integrações com CRM",
      "Suporte prioritário",
    ],
    cta: "Começar Agora",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    description: "Solução personalizada para grandes operações.",
    features: [
      "Conversas ilimitadas",
      "Números ilimitados",
      "NLP customizado",
      "API completa",
      "SLA garantido",
      "Gerente dedicado",
      "Treinamento da equipe",
      "Infraestrutura dedicada",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.03] via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Escolha o plano <span className="gradient-text">ideal para você</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Planos flexíveis que crescem junto com o seu negócio. Comece grátis e
            escale quando precisar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-card rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-green-primary/40 shadow-lg shadow-green-primary/10 scale-[1.02] lg:scale-105"
                  : "hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-primary text-black text-xs font-bold px-4 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-text-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-text-muted text-sm">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-primary/15 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-green-primary" />
                    </div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-green-primary text-black hover:bg-green-primary/90 hover:shadow-lg hover:shadow-green-primary/25"
                    : "border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
