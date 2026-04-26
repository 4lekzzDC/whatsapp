"use client";

import Link from "next/link";
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
  ArrowRight,
  Check,
  Bot,
  Workflow,
  BellRing,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Atendimento Automatizado",
    description:
      "Respostas automáticas inteligentes 24/7 para as perguntas mais frequentes dos seus clientes.",
    details: [
      "Respostas configuráveis por categoria",
      "Menus interativos e botões",
      "Mensagens de boas-vindas personalizadas",
      "Fila de atendimento organizada",
    ],
  },
  {
    icon: Brain,
    title: "NLP Avançado",
    description:
      "Processamento de linguagem natural para compreender a intenção real de cada mensagem recebida.",
    details: [
      "Detecção de intenção com 95% de precisão",
      "Análise de sentimento em tempo real",
      "Compreensão de contexto na conversa",
      "Treinamento contínuo do modelo",
    ],
  },
  {
    icon: Users,
    title: "Transferência Humana",
    description:
      "Encaminhamento inteligente para atendentes humanos quando a complexidade exige intervenção.",
    details: [
      "Roteamento por departamento",
      "Contexto completo para o atendente",
      "Fila com priorização inteligente",
      "Histórico de conversa preservado",
    ],
  },
  {
    icon: BarChart3,
    title: "Relatórios e Métricas",
    description:
      "Dashboard completo com métricas de atendimento, tempo de resposta e satisfação do cliente.",
    details: [
      "Dashboard em tempo real",
      "Relatórios exportáveis (PDF, CSV)",
      "Métricas de SLA e performance",
      "Análise de tendências",
    ],
  },
  {
    icon: Shield,
    title: "Segurança de Dados",
    description:
      "Criptografia ponta a ponta e conformidade com LGPD para proteger dados dos seus clientes.",
    details: [
      "Criptografia AES-256",
      "Conformidade total com LGPD",
      "Backup automático diário",
      "Logs de auditoria completos",
    ],
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description:
      "Tempo médio de resposta de 8 segundos para manter seus clientes sempre satisfeitos.",
    details: [
      "Latência média de 800ms",
      "Cache inteligente de respostas",
      "Infraestrutura distribuída",
      "99.9% de uptime garantido",
    ],
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description:
      "Atendimento ininterrupto sem custos extras com equipe noturna ou finais de semana.",
    details: [
      "Zero downtime com failover",
      "Monitoramento contínuo",
      "Alertas automáticos",
      "Escalação por horário",
    ],
  },
  {
    icon: Settings,
    title: "Personalização Total",
    description:
      "Fluxos de conversa customizáveis e tom de voz alinhado com a identidade da sua marca.",
    details: [
      "Editor visual de fluxos",
      "Templates prontos para usar",
      "Tom de voz configurável",
      "Variáveis dinâmicas",
    ],
  },
  {
    icon: Globe,
    title: "Multi-idiomas",
    description:
      "Suporte a múltiplos idiomas com detecção automática do idioma do cliente.",
    details: [
      "Mais de 50 idiomas suportados",
      "Detecção automática de idioma",
      "Tradução em tempo real",
      "Respostas nativas por idioma",
    ],
  },
  {
    icon: Bot,
    title: "Chatbot com IA",
    description:
      "Inteligência artificial generativa para conversas naturais e resolução de problemas complexos.",
    details: [
      "Respostas contextuais e naturais",
      "Aprendizado com interações",
      "Base de conhecimento integrada",
      "Fallback inteligente",
    ],
  },
  {
    icon: Workflow,
    title: "Automação de Fluxos",
    description:
      "Automatize processos completos como agendamentos, pedidos e consultas de status.",
    details: [
      "Agendamento automático",
      "Consulta de pedidos via API",
      "Envio de boletos e notas",
      "Workflows condicionais",
    ],
  },
  {
    icon: BellRing,
    title: "Notificações Proativas",
    description:
      "Envie mensagens proativas de acompanhamento, promoções e lembretes para seus clientes.",
    details: [
      "Campanhas segmentadas",
      "Agendamento de envios",
      "Templates aprovados pelo WhatsApp",
      "Métricas de abertura e resposta",
    ],
  },
];

export default function FuncionalidadesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Funcionalidades
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Tudo que você precisa para{" "}
            <span className="gradient-text">automatizar</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Ferramentas poderosas e intuitivas para transformar o atendimento ao
            cliente da sua empresa via WhatsApp. Explore cada recurso em
            detalhes.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group glass-card rounded-2xl p-7 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:shadow-lg hover:shadow-green-primary/5 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center mb-5 group-hover:bg-green-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-green-primary/15 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-green-primary" />
                        </div>
                        <span className="text-sm text-white/70">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.04] via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para <span className="gradient-text">começar</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Teste todas as funcionalidades gratuitamente por 14 dias. Sem
            necessidade de cartão de crédito.
          </p>
          <Link
            href="/precos"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Ver Planos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
