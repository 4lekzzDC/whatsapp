"use client";

import {
  Shield,
  FileCheck,
  UserCheck,
  Database,
  Lock,
  AlertCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const principles = [
  {
    icon: FileCheck,
    title: "Finalidade",
    description:
      "Tratamos dados pessoais apenas para propósitos legítimos, específicos e informados ao titular.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados.",
  },
  {
    icon: UserCheck,
    title: "Transparência",
    description:
      "Garantimos informações claras e acessíveis sobre o tratamento de dados e os agentes responsáveis.",
  },
  {
    icon: Database,
    title: "Necessidade",
    description:
      "Coletamos apenas os dados estritamente necessários para a prestação do serviço contratado.",
  },
  {
    icon: Lock,
    title: "Prevenção",
    description:
      "Implementamos medidas preventivas contra danos aos titulares dos dados pessoais.",
  },
  {
    icon: AlertCircle,
    title: "Não Discriminação",
    description:
      "Garantimos que nenhum tratamento de dados seja utilizado para fins discriminatórios ilícitos.",
  },
];

const rights = [
  "Confirmação da existência de tratamento de dados pessoais",
  "Acesso aos dados pessoais armazenados",
  "Correção de dados incompletos, inexatos ou desatualizados",
  "Anonimização, bloqueio ou eliminação de dados desnecessários",
  "Portabilidade dos dados para outro fornecedor",
  "Eliminação dos dados tratados com consentimento",
  "Informação sobre compartilhamento de dados com terceiros",
  "Revogação do consentimento a qualquer momento",
];

const measures = [
  {
    title: "Criptografia de Dados",
    description:
      "AES-256 para dados em repouso e TLS 1.3 para dados em trânsito, garantindo proteção em todas as etapas.",
  },
  {
    title: "Data Center no Brasil",
    description:
      "Dados armazenados em servidores localizados no Brasil, em conformidade com as exigências da LGPD.",
  },
  {
    title: "Controle de Acesso",
    description:
      "Autenticação multifator (MFA) e princípio do menor privilégio para acesso aos dados pessoais.",
  },
  {
    title: "Logs de Auditoria",
    description:
      "Registro completo de todas as operações realizadas sobre dados pessoais para rastreabilidade.",
  },
  {
    title: "Resposta a Incidentes",
    description:
      "Plano de resposta a incidentes com comunicação à ANPD e aos titulares em até 72 horas.",
  },
  {
    title: "DPO Dedicado",
    description:
      "Encarregado de Proteção de Dados (DPO) dedicado para atender solicitações e garantir conformidade.",
  },
];

export default function LgpdContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Conformidade
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Conformidade com a{" "}
            <span className="gradient-text">LGPD</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            O WhatsApp Bot está em total conformidade com a Lei Geral de
            Proteção de Dados (Lei nº 13.709/2018). Conheça nossas práticas
            e compromissos.
          </p>
          <p className="text-sm text-text-muted mt-6">
            Última atualização: 1 de abril de 2026
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Fundamentos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Princípios que{" "}
              <span className="gradient-text">seguimos</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rights */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Direitos do Titular
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Seus <span className="gradient-text">direitos</span>
            </h2>
          </div>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Em conformidade com os artigos 17 a 22 da LGPD, garantimos ao
              titular dos dados pessoais os seguintes direitos:
            </p>
            <ul className="space-y-4">
              {rights.map((right, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-text-muted leading-relaxed"
                >
                  <CheckCircle className="w-4 h-4 text-green-primary mt-0.5 shrink-0" />
                  <span>{right}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-muted leading-relaxed mt-6">
              Para exercer qualquer desses direitos, entre em contato com nosso
              DPO pelo e-mail{" "}
              <span className="text-green-primary">lgpd@whatsappbot.com</span>.
              Prazo de resposta: até 15 dias úteis.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Measures */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Medidas Técnicas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Como <span className="gradient-text">protegemos</span> seus dados
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {measures.map((measure) => (
              <div
                key={measure.title}
                className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {measure.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {measure.description}
                </p>
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
            Dúvidas sobre{" "}
            <span className="gradient-text">LGPD</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Nosso Encarregado de Proteção de Dados está disponível para
            esclarecer qualquer questão.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Falar com o DPO
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
