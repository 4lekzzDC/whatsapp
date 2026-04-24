"use client";

import {
  Inbox,
  Users,
  Smartphone,
  Send,
  Zap,
  Brain,
  BarChart3,
  Shield,
  Tag,
} from "lucide-react";
import { useT } from "./LocaleProvider";

export default function Features() {
  const t = useT();

  // Núcleo: facilitador (incluso em todos os planos)
  const coreFeatures = [
    {
      icon: Inbox,
      title: "Inbox unificado",
      description:
        "Todas as conversas em um só lugar, distribuídas por setor e status, com histórico completo do cliente.",
    },
    {
      icon: Users,
      title: "Atendimento em equipe",
      description:
        "Vários operadores no mesmo número, com atribuição manual ou por rodízio e transferência entre setores.",
    },
    {
      icon: Smartphone,
      title: "Responda de qualquer lugar",
      description:
        "Web, celular e tablet sincronizados. Seu time atende mesmo fora do escritório, sem perder conversa.",
    },
    {
      icon: Send,
      title: "Disparos e lembretes",
      description:
        "Agende mensagens, crie campanhas segmentadas e envie lembretes automáticos (cobrança, retorno, pós-venda).",
    },
    {
      icon: Zap,
      title: "Respostas rápidas",
      description:
        "Salve mensagens prontas com variáveis e atalhos por barra (/boleto, /saudacao) para acelerar o atendimento.",
    },
    {
      icon: Tag,
      title: "Tags e segmentação",
      description:
        "Organize contatos com tags, filtre por status e alimente campanhas com públicos sempre atualizados.",
    },
    {
      icon: BarChart3,
      title: "Relatórios claros",
      description:
        "Volume, tempo de resposta, resolução, CSAT e ranking por operador. Exporte em um clique.",
    },
    {
      icon: Shield,
      title: "LGPD e segurança",
      description:
        "Criptografia, auditoria, papéis e permissões por setor. Seus dados e os do cliente protegidos.",
    },
    {
      icon: Brain,
      title: "IA que responde sozinha",
      description:
        "Ative o add-on opcional para que o bot entenda, responda e resolva conversas 24/7 antes do humano.",
      addon: true,
    },
  ];

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-primary/[0.02] via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            {t("features.eyebrow")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("features.title.prefix")}{" "}
            <span className="gradient-text">{t("features.title.highlight")}</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">{t("features.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 ${
                  feature.addon
                    ? "border-accent-purple/30 hover:border-accent-purple/50 hover:shadow-lg hover:shadow-accent-purple/10"
                    : "hover:border-green-primary/20 hover:shadow-lg hover:shadow-green-primary/5"
                }`}
              >
                {feature.addon && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold bg-accent-purple/15 text-accent-purple px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Add-on
                  </span>
                )}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    feature.addon
                      ? "bg-accent-purple/10 group-hover:bg-accent-purple/20"
                      : "bg-green-primary/10 group-hover:bg-green-primary/20"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${feature.addon ? "text-accent-purple" : "text-green-primary"}`}
                  />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
