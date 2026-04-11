"use client";

import {
  Sparkles,
  Bug,
  Wrench,
  Rocket,
  ArrowRight,
} from "lucide-react";

type ChangeType = "feature" | "improvement" | "fix" | "breaking";

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  changes: Change[];
}

const typeConfig: Record<ChangeType, { label: string; color: string; icon: typeof Sparkles }> = {
  feature: { label: "Novo", color: "bg-green-primary/15 text-green-primary", icon: Sparkles },
  improvement: { label: "Melhoria", color: "bg-accent-blue/15 text-accent-blue", icon: Wrench },
  fix: { label: "Correção", color: "bg-accent-yellow/15 text-accent-yellow", icon: Bug },
  breaking: { label: "Breaking", color: "bg-red-500/15 text-red-400", icon: Rocket },
};

const releases: Release[] = [
  {
    version: "2.4.0",
    date: "08 de Abril, 2026",
    title: "Chatbot com IA Generativa",
    changes: [
      { type: "feature", text: "Chatbot com IA generativa para respostas mais naturais e contextuais." },
      { type: "feature", text: "Base de conhecimento integrada com upload de documentos." },
      { type: "improvement", text: "Tempo de resposta reduzido em 40% com novo sistema de cache." },
      { type: "fix", text: "Corrigido erro ao processar mensagens com caracteres especiais." },
    ],
  },
  {
    version: "2.3.0",
    date: "15 de Março, 2026",
    title: "Integrações com E-commerce",
    changes: [
      { type: "feature", text: "Integração nativa com Shopify, WooCommerce e Nuvemshop." },
      { type: "feature", text: "Consulta de status de pedido via WhatsApp." },
      { type: "improvement", text: "Novo editor visual de fluxos de conversa com drag-and-drop." },
      { type: "improvement", text: "Dashboard de métricas redesenhado com novos gráficos." },
      { type: "fix", text: "Corrigido bug na transferência para atendentes em horários específicos." },
    ],
  },
  {
    version: "2.2.0",
    date: "20 de Fevereiro, 2026",
    title: "Multi-idiomas e NLP Aprimorado",
    changes: [
      { type: "feature", text: "Suporte a mais de 50 idiomas com detecção automática." },
      { type: "feature", text: "Análise de sentimento em tempo real nas conversas." },
      { type: "improvement", text: "Precisão do NLP melhorada para 95% na detecção de intenções." },
      { type: "improvement", text: "Novo sistema de templates de mensagens aprovados pelo WhatsApp." },
      { type: "fix", text: "Corrigido problema de sincronização em contas com múltiplos números." },
      { type: "fix", text: "Corrigido erro no relatório de métricas ao filtrar por data." },
    ],
  },
  {
    version: "2.1.0",
    date: "10 de Janeiro, 2026",
    title: "Webhooks e API v2",
    changes: [
      { type: "feature", text: "Nova API v2 com documentação interativa e SDKs." },
      { type: "feature", text: "Sistema de webhooks para eventos em tempo real." },
      { type: "improvement", text: "Painel administrativo com novo design e navegação simplificada." },
      { type: "fix", text: "Corrigido timeout em conversas com mais de 100 mensagens." },
      { type: "breaking", text: "API v1 será descontinuada em 6 meses. Migre para a v2." },
    ],
  },
  {
    version: "2.0.0",
    date: "01 de Dezembro, 2025",
    title: "Plataforma 2.0",
    changes: [
      { type: "feature", text: "Plataforma completamente redesenhada com nova arquitetura." },
      { type: "feature", text: "Sistema de filas com priorização inteligente." },
      { type: "feature", text: "Notificações proativas com campanhas segmentadas." },
      { type: "improvement", text: "Performance geral melhorada em 60%." },
      { type: "improvement", text: "Novo sistema de permissões por equipe e departamento." },
      { type: "breaking", text: "Estrutura de endpoints alterada. Consulte o guia de migração." },
    ],
  },
  {
    version: "1.5.0",
    date: "15 de Outubro, 2025",
    title: "Relatórios Avançados",
    changes: [
      { type: "feature", text: "Relatórios avançados com exportação em PDF e CSV." },
      { type: "feature", text: "Integração com Google Calendar para agendamentos." },
      { type: "improvement", text: "Melhoria na detecção de spam e mensagens indesejadas." },
      { type: "fix", text: "Corrigido problema de encoding em mensagens com emojis." },
    ],
  },
];

export default function ChangelogContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Changelog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            O que há de{" "}
            <span className="gradient-text">novo</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Acompanhe todas as atualizações, novos recursos e melhorias que
            estamos construindo para você.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-primary/40 via-green-primary/20 to-transparent" />

            <div className="space-y-12">
              {releases.map((release) => (
                <div key={release.version} className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-[22px] top-7 w-3.5 h-3.5 rounded-full bg-green-primary border-4 border-background" />

                  <div className="glass-card rounded-2xl p-7">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-bold bg-green-primary/15 text-green-primary px-3 py-1 rounded-full">
                        v{release.version}
                      </span>
                      <span className="text-xs text-text-muted">
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-5">
                      {release.title}
                    </h3>
                    <ul className="space-y-3">
                      {release.changes.map((change, index) => {
                        const config = typeConfig[change.type];
                        return (
                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${config.color}`}
                            >
                              {config.label}
                            </span>
                            <span className="text-sm text-white/80 leading-relaxed">
                              {change.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.04] via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Quer experimentar os{" "}
            <span className="gradient-text">novos recursos</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Comece agora e aproveite todas as novidades com 14 dias gratuitos.
          </p>
          <a
            href="/precos"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Começar Grátis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
