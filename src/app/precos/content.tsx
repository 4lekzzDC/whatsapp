"use client";

import { useState } from "react";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";

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
    cta: "Começar Grátis",
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
    cta: "Começar Grátis",
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

const comparisonFeatures = [
  { name: "Conversas/mês", starter: "1.000", professional: "5.000", enterprise: "Ilimitadas" },
  { name: "Números de WhatsApp", starter: "1", professional: "3", enterprise: "Ilimitados" },
  { name: "Chatbot com IA", starter: "Básico", professional: "Avançado", enterprise: "Customizado" },
  { name: "NLP / Intenções", starter: false, professional: true, enterprise: true },
  { name: "Relatórios", starter: "Simples", professional: "Completos", enterprise: "Customizados" },
  { name: "Transferência humana", starter: false, professional: true, enterprise: true },
  { name: "Integrações CRM", starter: false, professional: true, enterprise: true },
  { name: "API REST", starter: false, professional: "Limitada", enterprise: "Completa" },
  { name: "Webhooks", starter: false, professional: true, enterprise: true },
  { name: "Multi-idiomas", starter: false, professional: true, enterprise: true },
  { name: "SLA garantido", starter: false, professional: false, enterprise: true },
  { name: "Gerente dedicado", starter: false, professional: false, enterprise: true },
  { name: "Infraestrutura dedicada", starter: false, professional: false, enterprise: true },
  { name: "Treinamento da equipe", starter: false, professional: false, enterprise: true },
  { name: "Suporte", starter: "Email", professional: "Prioritário", enterprise: "24/7 dedicado" },
];

const faqs = [
  {
    question: "Posso testar gratuitamente?",
    answer:
      "Sim! Todos os planos incluem 14 dias de teste gratuito, sem necessidade de cartão de crédito. Você pode cancelar a qualquer momento.",
  },
  {
    question: "Como funciona a cobrança?",
    answer:
      "A cobrança é mensal e recorrente. Você pode cancelar a qualquer momento sem multa. Para planos anuais, oferecemos 20% de desconto.",
  },
  {
    question: "Posso trocar de plano depois?",
    answer:
      "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente.",
  },
  {
    question: "O que acontece se eu ultrapassar o limite de conversas?",
    answer:
      "Você receberá um alerta quando atingir 80% do limite. Ao ultrapassar, as conversas excedentes são cobradas a parte ou você pode fazer upgrade do plano.",
  },
  {
    question: "Vocês oferecem desconto para ONGs?",
    answer:
      "Sim! Oferecemos 50% de desconto em todos os planos para organizações sem fins lucrativos. Entre em contato para solicitar o benefício.",
  },
];

export default function PrecosContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Preços
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Planos que cabem no{" "}
            <span className="gradient-text">seu bolso</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Planos flexíveis que crescem junto com o seu negócio. Comece
            gratuitamente e escale quando precisar.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-muted text-sm">
                        {plan.period}
                      </span>
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

                <button
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-green-primary text-black hover:bg-green-primary/90 hover:shadow-lg hover:shadow-green-primary/25"
                      : "border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-text-muted mt-8">
            Todos os planos incluem 14 dias de teste gratuito. Sem cartão de
            crédito.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Compare os <span className="gradient-text">planos</span>
          </h2>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-sm font-semibold text-white p-5 min-w-[200px]">
                      Recurso
                    </th>
                    <th className="text-center text-sm font-semibold text-white p-5">
                      Starter
                    </th>
                    <th className="text-center text-sm font-semibold text-green-primary p-5">
                      Professional
                    </th>
                    <th className="text-center text-sm font-semibold text-white p-5">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={
                        index < comparisonFeatures.length - 1
                          ? "border-b border-white/5"
                          : ""
                      }
                    >
                      <td className="text-sm text-white/80 p-5">
                        {feature.name}
                      </td>
                      {(["starter", "professional", "enterprise"] as const).map(
                        (plan) => (
                          <td key={plan} className="text-center p-5">
                            {feature[plan] === true ? (
                              <div className="w-5 h-5 rounded-full bg-green-primary/15 flex items-center justify-center mx-auto">
                                <Check className="w-3 h-3 text-green-primary" />
                              </div>
                            ) : feature[plan] === false ? (
                              <X className="w-4 h-4 text-white/20 mx-auto" />
                            ) : (
                              <span className="text-sm text-white/70">
                                {feature[plan]}
                              </span>
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-8 h-8 text-green-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Dúvidas sobre <span className="gradient-text">preços</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="text-sm font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`text-text-muted transition-transform duration-200 ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-text-muted leading-relaxed px-5 pb-5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.04] via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ainda tem <span className="gradient-text">dúvidas</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Fale com nosso time comercial e encontre o plano perfeito para a sua
            empresa.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Falar com Vendas
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
