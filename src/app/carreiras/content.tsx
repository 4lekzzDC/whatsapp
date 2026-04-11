"use client";

import {
  ArrowRight,
  MapPin,
  Briefcase,
  Heart,
  Laptop,
  GraduationCap,
  Coffee,
  Dumbbell,
  Plane,
  DollarSign,
} from "lucide-react";

const benefits = [
  {
    icon: Laptop,
    title: "Trabalho remoto",
    description: "Trabalhe de qualquer lugar do Brasil ou do mundo.",
  },
  {
    icon: DollarSign,
    title: "Salário competitivo",
    description: "Remuneração acima do mercado com revisões semestrais.",
  },
  {
    icon: Heart,
    title: "Plano de saúde",
    description: "Plano de saúde e odontológico para você e dependentes.",
  },
  {
    icon: GraduationCap,
    title: "Educação contínua",
    description: "Budget anual para cursos, conferências e certificações.",
  },
  {
    icon: Coffee,
    title: "Horário flexível",
    description: "Organize sua rotina com autonomia e responsabilidade.",
  },
  {
    icon: Dumbbell,
    title: "Bem-estar",
    description: "Auxílio academia e programas de saúde mental.",
  },
  {
    icon: Plane,
    title: "Férias estendidas",
    description: "30 dias de férias + day off no aniversário.",
  },
  {
    icon: Briefcase,
    title: "Stock options",
    description: "Participe do crescimento da empresa como sócio.",
  },
];

const openPositions = [
  {
    title: "Engenheiro(a) de Software Senior",
    department: "Engenharia",
    location: "Remoto",
    type: "Tempo integral",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remoto",
    type: "Tempo integral",
  },
  {
    title: "Engenheiro(a) de Machine Learning",
    department: "IA & Dados",
    location: "Remoto",
    type: "Tempo integral",
  },
  {
    title: "Customer Success Manager",
    department: "Sucesso do Cliente",
    location: "São Paulo, SP",
    type: "Tempo integral",
  },
  {
    title: "DevOps Engineer",
    department: "Infraestrutura",
    location: "Remoto",
    type: "Tempo integral",
  },
  {
    title: "Analista de Marketing de Conteúdo",
    department: "Marketing",
    location: "Remoto",
    type: "Tempo integral",
  },
];

export default function CarreirasContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-yellow/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Carreiras
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Construa o futuro do{" "}
            <span className="gradient-text">atendimento</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Junte-se a um time apaixonado por tecnologia e inovação. Estamos
            construindo a plataforma que transforma como empresas se comunicam
            com seus clientes.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Benefícios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Por que trabalhar{" "}
              <span className="gradient-text">conosco</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Vagas abertas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Encontre sua{" "}
              <span className="gradient-text">oportunidade</span>
            </h2>
          </div>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="glass-card rounded-xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-green-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                        <Briefcase className="w-3 h-3" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                        <MapPin className="w-3 h-3" />
                        {position.location}
                      </span>
                      <span className="text-xs text-text-muted">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-sm text-green-primary font-semibold group-hover:gap-2.5 transition-all">
                      Candidatar-se
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
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
            Não encontrou sua <span className="gradient-text">vaga</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Envie seu currículo mesmo assim! Estamos sempre em busca de pessoas
            talentosas e apaixonadas por tecnologia.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Enviar Currículo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
