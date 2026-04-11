"use client";

import {
  BookOpen,
  Clock,
  ArrowRight,
  Rocket,
  Bot,
  BarChart3,
  Plug,
  Users,
  ShoppingCart,
  Headphones,
  MessageSquare,
  Palette,
} from "lucide-react";

const featuredGuides = [
  {
    icon: Rocket,
    category: "Início",
    title: "Como configurar seu bot em 5 minutos",
    description:
      "Guia passo a passo para criar sua conta, conectar seu número e enviar a primeira mensagem automatizada.",
    readTime: "5 min",
    level: "Iniciante",
  },
  {
    icon: Bot,
    category: "IA",
    title: "Configurando respostas com IA generativa",
    description:
      "Aprenda a usar modelos de IA para criar respostas naturais e personalizadas para seus clientes.",
    readTime: "12 min",
    level: "Intermediário",
  },
  {
    icon: Plug,
    category: "Integrações",
    title: "Integrando com seu CRM e e-commerce",
    description:
      "Conecte o WhatsApp Bot com Salesforce, HubSpot, Shopify e outras ferramentas essenciais.",
    readTime: "15 min",
    level: "Intermediário",
  },
];

const guides = [
  {
    icon: MessageSquare,
    category: "Chatbot",
    title: "Criando fluxos de conversa avançados",
    description:
      "Domine o editor visual para criar fluxos complexos com condicionais, variáveis e integrações.",
    readTime: "20 min",
    level: "Avançado",
  },
  {
    icon: Users,
    category: "Equipe",
    title: "Gerenciando múltiplos atendentes",
    description:
      "Configure filas, distribuição automática e transferência entre agentes humanos e bot.",
    readTime: "10 min",
    level: "Intermediário",
  },
  {
    icon: BarChart3,
    category: "Analytics",
    title: "Analisando métricas de atendimento",
    description:
      "Entenda os dashboards, relatórios e KPIs para otimizar a performance do seu atendimento.",
    readTime: "8 min",
    level: "Iniciante",
  },
  {
    icon: ShoppingCart,
    category: "Vendas",
    title: "Automatizando vendas pelo WhatsApp",
    description:
      "Catálogo de produtos, carrinho de compras e pagamento integrado direto na conversa.",
    readTime: "15 min",
    level: "Intermediário",
  },
  {
    icon: Headphones,
    category: "Suporte",
    title: "Criando uma base de conhecimento",
    description:
      "Configure respostas automáticas baseadas em FAQ e documentação para resolução instantânea.",
    readTime: "10 min",
    level: "Iniciante",
  },
  {
    icon: Palette,
    category: "Personalização",
    title: "Templates e mensagens interativas",
    description:
      "Crie templates aprovados, botões, listas e mensagens ricas para maior engajamento.",
    readTime: "12 min",
    level: "Intermediário",
  },
];

function getLevelColor(level: string) {
  switch (level) {
    case "Iniciante":
      return "bg-green-primary/10 text-green-primary";
    case "Intermediário":
      return "bg-accent-yellow/10 text-accent-yellow";
    case "Avançado":
      return "bg-accent-purple/10 text-accent-purple";
    default:
      return "bg-white/10 text-white";
  }
}

export default function GuiasContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Guias & Tutoriais
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Aprenda a usar o{" "}
            <span className="gradient-text">WhatsApp Bot</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Tutoriais práticos do básico ao avançado. Aprenda a configurar,
            integrar e escalar seu atendimento automatizado.
          </p>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Destaques
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Guias <span className="gradient-text">essenciais</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a
                  key={guide.title}
                  href="#"
                  className="glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5 group glow-border"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-primary" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${getLevelColor(guide.level)}`}
                    >
                      {guide.level}
                    </span>
                  </div>
                  <span className="text-xs text-green-primary font-semibold uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime} de leitura
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-green-primary transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Biblioteca
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Todos os <span className="gradient-text">guias</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <a
                  key={guide.title}
                  href="#"
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${getLevelColor(guide.level)}`}
                    >
                      {guide.level}
                    </span>
                  </div>
                  <span className="text-xs text-green-primary font-semibold uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <h3 className="text-base font-semibold text-white mt-1 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime}
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-green-primary transition-colors" />
                  </div>
                </a>
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
            Precisa de ajuda{" "}
            <span className="gradient-text">personalizada</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Agende uma sessão de onboarding gratuita com nosso time de
            especialistas.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Agendar Onboarding
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
