"use client";

import {
  BookOpen,
  Code,
  Rocket,
  Settings,
  MessageCircle,
  Zap,
  ArrowRight,
  Search,
  FileText,
  Database,
} from "lucide-react";

const gettingStarted = [
  {
    icon: Rocket,
    title: "Início Rápido",
    description:
      "Configure seu primeiro bot em menos de 5 minutos com nosso guia passo a passo.",
    link: "#",
  },
  {
    icon: Settings,
    title: "Configuração",
    description:
      "Personalize seu bot com mensagens automáticas, horários de atendimento e respostas padrão.",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Primeiro Fluxo",
    description:
      "Crie seu primeiro fluxo de conversa automatizado com o editor visual drag-and-drop.",
    link: "#",
  },
  {
    icon: Zap,
    title: "Integrações",
    description:
      "Conecte seu bot com CRM, e-commerce, ERP e outras ferramentas do seu negócio.",
    link: "#",
  },
];

const sections = [
  {
    icon: BookOpen,
    title: "Guias & Tutoriais",
    description:
      "Tutoriais detalhados para cada funcionalidade, do básico ao avançado.",
    items: [
      "Configuração de chatbot",
      "Fluxos de atendimento",
      "Respostas com IA",
      "Relatórios e métricas",
    ],
  },
  {
    icon: Code,
    title: "Referência da API",
    description:
      "Documentação completa da API REST com exemplos em múltiplas linguagens.",
    items: [
      "Autenticação & Tokens",
      "Envio de mensagens",
      "Webhooks",
      "Rate limits",
    ],
  },
  {
    icon: Database,
    title: "SDKs & Bibliotecas",
    description:
      "Bibliotecas oficiais para as principais linguagens de programação.",
    items: ["Node.js / TypeScript", "Python", "PHP", "Java / Kotlin"],
  },
  {
    icon: FileText,
    title: "Changelog & Releases",
    description:
      "Acompanhe todas as atualizações, novas funcionalidades e correções.",
    items: [
      "Notas de versão",
      "Migrações",
      "Funcionalidades beta",
      "Roadmap público",
    ],
  },
];

export default function DocumentacaoContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Documentação
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Tudo o que você precisa para{" "}
            <span className="gradient-text">construir</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed mb-10">
            Documentação completa, tutoriais e referências para integrar e
            configurar seu WhatsApp Bot de forma rápida e eficiente.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar na documentação..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-text-muted focus:outline-none focus:border-green-primary/50 transition-colors text-sm"
            />
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Primeiros passos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Comece em <span className="gradient-text">minutos</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gettingStarted.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.link}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <span className="text-xs text-text-muted font-mono">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-green-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                    {section.description}
                  </p>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors group"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-green-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{item}</span>
                        </a>
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
            Não encontrou o que{" "}
            <span className="gradient-text">procurava</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Nossa equipe de suporte está pronta para ajudar com qualquer dúvida
            técnica.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Falar com Suporte
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
