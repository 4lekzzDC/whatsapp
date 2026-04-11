"use client";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Headphones,
  Building,
  Users,
} from "lucide-react";

const contactChannels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Fale conosco pelo WhatsApp e receba atendimento instantâneo.",
    info: "+55 (11) 99999-0000",
    cta: "Iniciar conversa",
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Envie uma mensagem e responderemos em até 24 horas.",
    info: "contato@whatsappbot.com.br",
    cta: "Enviar e-mail",
  },
  {
    icon: Phone,
    title: "Telefone",
    description: "Ligue para nosso time de segunda a sexta, das 9h às 18h.",
    info: "+55 (11) 3000-0000",
    cta: "Ligar agora",
  },
];

const departments = [
  {
    icon: Headphones,
    title: "Suporte Técnico",
    description:
      "Precisa de ajuda com a plataforma? Nosso time técnico está pronto para resolver.",
    email: "suporte@whatsappbot.com.br",
  },
  {
    icon: Building,
    title: "Vendas",
    description:
      "Quer conhecer nossos planos ou precisa de uma proposta personalizada?",
    email: "vendas@whatsappbot.com.br",
  },
  {
    icon: Users,
    title: "Parcerias",
    description:
      "Interessado em ser parceiro ou integrador? Vamos conversar sobre oportunidades.",
    email: "parcerias@whatsappbot.com.br",
  },
];

export default function ContatoContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Contato
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Fale com nosso{" "}
            <span className="gradient-text">time</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Estamos prontos para ajudar. Escolha o canal que preferir e entre em
            contato com a gente.
          </p>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="glass-card rounded-2xl p-8 text-center hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {channel.description}
                  </p>
                  <p className="text-sm text-white font-medium mb-5">
                    {channel.info}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-green-primary font-semibold cursor-pointer hover:gap-3 transition-all">
                    {channel.cta}
                    <Send className="w-4 h-4" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Formulário
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Envie uma <span className="gradient-text">mensagem</span>
            </h2>
          </div>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-green-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-green-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Assunto
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-muted focus:outline-none focus:border-green-primary/50 transition-colors appearance-none">
                  <option value="">Selecione um assunto</option>
                  <option value="vendas">Vendas</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="parcerias">Parcerias</option>
                  <option value="imprensa">Imprensa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mensagem
                </label>
                <textarea
                  rows={5}
                  placeholder="Como podemos ajudar?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-green-primary/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
              >
                Enviar Mensagem
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Departamentos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Fale diretamente com o{" "}
              <span className="gradient-text">time certo</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.title}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    {dept.description}
                  </p>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-sm text-green-primary hover:underline"
                  >
                    {dept.email}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-primary shrink-0" />
              <span className="text-sm text-text-muted">
                São Paulo, SP - Brasil
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-primary shrink-0" />
              <span className="text-sm text-text-muted">
                Seg - Sex, 9h às 18h (BRT)
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
