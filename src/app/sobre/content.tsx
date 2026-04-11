"use client";

import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Users,
  Zap,
  Shield,
  Globe,
  TrendingUp,
} from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Inovação",
    description:
      "Investimos continuamente em IA e automação para entregar soluções que transformam a experiência do cliente.",
  },
  {
    icon: Users,
    title: "Foco no Cliente",
    description:
      "Cada funcionalidade é pensada para resolver problemas reais de empresas que precisam escalar seu atendimento.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Protegemos os dados dos nossos clientes com criptografia de ponta a ponta e conformidade com a LGPD.",
  },
  {
    icon: Heart,
    title: "Transparência",
    description:
      "Acreditamos em relações honestas com clientes, parceiros e colaboradores. Sem surpresas, sem letras miúdas.",
  },
  {
    icon: Globe,
    title: "Acessibilidade",
    description:
      "Democratizamos o acesso à automação inteligente para empresas de todos os tamanhos e segmentos.",
  },
  {
    icon: TrendingUp,
    title: "Resultados",
    description:
      "Medimos nosso sucesso pelo impacto que geramos nos resultados dos nossos clientes.",
  },
];

const stats = [
  { value: "10.000+", label: "Empresas ativas" },
  { value: "50M+", label: "Mensagens por mês" },
  { value: "99,9%", label: "Uptime garantido" },
  { value: "4.9/5", label: "Avaliação dos clientes" },
];

const timeline = [
  {
    year: "2021",
    title: "O início",
    description:
      "Nascemos com a missão de simplificar o atendimento via WhatsApp para pequenas empresas.",
  },
  {
    year: "2022",
    title: "Crescimento acelerado",
    description:
      "Alcançamos 1.000 clientes e lançamos o motor de NLP próprio para respostas mais inteligentes.",
  },
  {
    year: "2023",
    title: "Expansão de integrações",
    description:
      "Lançamos mais de 50 integrações nativas e a API REST pública para desenvolvedores.",
  },
  {
    year: "2024",
    title: "IA generativa",
    description:
      "Integramos modelos de IA generativa para atendimento ainda mais natural e personalizado.",
  },
  {
    year: "2025",
    title: "Líder de mercado",
    description:
      "Consolidamos nossa posição como a principal plataforma de automação de WhatsApp no Brasil.",
  },
];

export default function SobreContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Sobre nós
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Transformando o atendimento com{" "}
            <span className="gradient-text">inteligência artificial</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Somos uma empresa de tecnologia focada em automatizar e escalar o
            atendimento ao cliente via WhatsApp, usando IA avançada para entregar
            experiências excepcionais.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-green-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Nossa Missão
              </h2>
              <p className="text-text-muted leading-relaxed">
                Democratizar o acesso à automação inteligente de atendimento,
                permitindo que empresas de qualquer tamanho ofereçam suporte
                rápido, personalizado e disponível 24 horas por dia via
                WhatsApp.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-accent-blue" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Nossa Visão
              </h2>
              <p className="text-text-muted leading-relaxed">
                Ser a plataforma de referência global em automação de WhatsApp,
                reconhecida pela inovação em IA, pela confiabilidade do serviço
                e pelo impacto positivo nos resultados dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Nossos valores
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              O que nos <span className="gradient-text">guia</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Nossa história
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Uma jornada de <span className="gradient-text">inovação</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-primary/40 via-green-primary/20 to-transparent" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-green-primary -translate-x-1/2 mt-2" />
                  <div
                    className={`flex-1 ml-10 md:ml-0 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:text-left md:pl-12"
                    }`}
                  >
                    <span className="text-sm text-green-primary font-bold">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="hidden md:block flex-1" />
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
            Quer fazer parte dessa{" "}
            <span className="gradient-text">história</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Junte-se a milhares de empresas que já transformaram seu atendimento
            com o WhatsApp Bot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/precos"
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
            >
              Começar Grátis
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contato"
              className="inline-flex items-center gap-2 border border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Falar com o Time
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
