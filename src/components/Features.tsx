"use client";

import {
  MessageSquare,
  Brain,
  Users,
  BarChart3,
  Shield,
  Zap,
  Clock,
  Settings,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Atendimento Automatizado",
    description:
      "Respostas automáticas inteligentes 24/7 para as perguntas mais frequentes dos seus clientes.",
  },
  {
    icon: Brain,
    title: "NLP Avançado",
    description:
      "Processamento de linguagem natural para compreender a intenção real de cada mensagem recebida.",
  },
  {
    icon: Users,
    title: "Transferência Humana",
    description:
      "Encaminhamento inteligente para atendentes humanos quando a complexidade exige intervenção.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Métricas",
    description:
      "Dashboard completo com métricas de atendimento, tempo de resposta e satisfação do cliente.",
  },
  {
    icon: Shield,
    title: "Segurança de Dados",
    description:
      "Criptografia ponta a ponta e conformidade com LGPD para proteger dados dos seus clientes.",
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description:
      "Tempo médio de resposta de 8 segundos para manter seus clientes sempre satisfeitos.",
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description:
      "Atendimento ininterrupto sem custos extras com equipe noturna ou finais de semana.",
  },
  {
    icon: Settings,
    title: "Personalização Total",
    description:
      "Fluxos de conversa customizáveis e tom de voz alinhado com a identidade da sua marca.",
  },
  {
    icon: Globe,
    title: "Multi-idiomas",
    description:
      "Suporte a múltiplos idiomas com detecção automática do idioma do cliente.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-primary/[0.02] via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Funcionalidades
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Tudo que você precisa para{" "}
            <span className="gradient-text">automatizar</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Ferramentas poderosas para transformar o atendimento ao cliente da sua
            empresa via WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:shadow-lg hover:shadow-green-primary/5 hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4 group-hover:bg-green-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-green-primary" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
