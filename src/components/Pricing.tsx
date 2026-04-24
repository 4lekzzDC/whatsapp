"use client";

import { Check, Sparkles } from "lucide-react";
import { useT } from "./LocaleProvider";

export default function Pricing() {
  const t = useT();

  const plans = [
    {
      name: "Starter",
      price: "R$ 197",
      period: "/mês",
      description: "Para começar a organizar o atendimento da equipe.",
      features: [
        "Até 1.000 conversas/mês",
        "1 número de WhatsApp",
        "Inbox compartilhado por setor",
        "3 operadores",
        "Respostas rápidas e tags",
        "Disparo manual de mensagens",
        "Relatórios essenciais",
      ],
      cta: t("hero.cta.primary"),
      popular: false,
    },
    {
      name: "Professional",
      price: "R$ 497",
      period: "/mês",
      description: "Para equipes que precisam escalar sem perder controle.",
      features: [
        "Até 5.000 conversas/mês",
        "3 números de WhatsApp",
        "Operadores ilimitados",
        "Campanhas e disparos agendados",
        "Automações por palavra-chave",
        "Fluxos automáticos ilimitados",
        "Integrações (CRM, webhooks)",
        "Relatórios completos",
        "Suporte prioritário",
      ],
      cta: t("hero.cta.primary"),
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      description: "Para grandes operações com integrações sob medida.",
      features: [
        "Conversas ilimitadas",
        "Números ilimitados",
        "SSO e papéis customizados",
        "API completa",
        "SLA e gerente dedicado",
        "Treinamento da equipe",
        "Infraestrutura dedicada",
      ],
      cta: "Falar com vendas",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.03] via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            {t("pricing.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("pricing.title.prefix")}{" "}
            <span className="gradient-text">{t("pricing.title.highlight")}</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">{t("pricing.subtitle")}</p>
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
                    {t("pricing.popular")}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-text-muted mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-text-muted text-sm">{plan.period}</span>}
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
                href="/cadastro"
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

        {/* Add-on de IA */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative glass-card rounded-2xl p-8 border-accent-purple/30 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-accent-purple/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-accent-purple" />
              </div>
              <div className="flex-1">
                <span className="inline-block text-[11px] font-semibold bg-accent-purple/15 text-accent-purple px-2 py-1 rounded-full uppercase tracking-wider mb-2">
                  {t("pricing.aiAddon.badge")}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t("pricing.aiAddon.title")}
                </h3>
                <p className="text-sm text-text-muted max-w-2xl leading-relaxed">
                  {t("pricing.aiAddon.description")}
                </p>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-white/80">
                  {[
                    "Entende intenção (NLP) e responde na linguagem do cliente",
                    "Aprende com suas respostas rápidas e fluxos",
                    "Só encaminha para humano quando necessário",
                    "Funciona junto com qualquer plano acima",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent-purple mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {t("pricing.aiAddon.price")}
                  </span>
                  <span className="text-text-muted text-sm">
                    {t("pricing.aiAddon.period")}
                  </span>
                </div>
                <a
                  href="/cadastro"
                  className="inline-flex items-center gap-2 bg-accent-purple hover:bg-accent-purple/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-accent-purple/25"
                >
                  <Sparkles className="w-4 h-4" />
                  {t("pricing.aiAddon.cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
