"use client";

import {
  CheckCircle,
  Activity,
  Server,
  Globe,
  Database,
  MessageCircle,
  Shield,
  Clock,
} from "lucide-react";

const services = [
  {
    name: "API REST",
    description: "Endpoints de envio e recebimento de mensagens",
    status: "operational",
    uptime: "99.99%",
    icon: Server,
  },
  {
    name: "Webhooks",
    description: "Entrega de eventos e notificações em tempo real",
    status: "operational",
    uptime: "99.98%",
    icon: Globe,
  },
  {
    name: "Painel de Controle",
    description: "Dashboard web para gerenciamento do bot",
    status: "operational",
    uptime: "99.97%",
    icon: Activity,
  },
  {
    name: "Motor de IA",
    description: "Processamento de linguagem natural e respostas inteligentes",
    status: "operational",
    uptime: "99.95%",
    icon: MessageCircle,
  },
  {
    name: "Banco de Dados",
    description: "Armazenamento de conversas, contatos e configurações",
    status: "operational",
    uptime: "99.99%",
    icon: Database,
  },
  {
    name: "Autenticação",
    description: "Login, API keys e gerenciamento de sessões",
    status: "operational",
    uptime: "99.99%",
    icon: Shield,
  },
];

const incidents = [
  {
    date: "08 Abr 2026",
    title: "Manutenção programada — Atualização de infraestrutura",
    description:
      "Atualização dos servidores de banco de dados para melhorar performance. Sem impacto para os usuários.",
    status: "resolved",
    duration: "45 min",
  },
  {
    date: "25 Mar 2026",
    title: "Latência elevada na API REST",
    description:
      "Identificamos um aumento temporário na latência das requisições na região SA-East. Corrigido em 12 minutos.",
    status: "resolved",
    duration: "12 min",
  },
  {
    date: "10 Mar 2026",
    title: "Manutenção programada — Migração de CDN",
    description:
      "Migração para nova CDN com pontos de presença adicionais no Brasil. Melhoria de 30% na latência.",
    status: "resolved",
    duration: "30 min",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "operational":
      return "bg-green-primary";
    case "degraded":
      return "bg-accent-yellow";
    case "outage":
      return "bg-red-500";
    default:
      return "bg-text-muted";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "operational":
      return "Operacional";
    case "degraded":
      return "Degradado";
    case "outage":
      return "Fora do ar";
    default:
      return status;
  }
}

export default function StatusContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-primary/10 border border-green-primary/20 rounded-full px-5 py-2 mb-8">
            <CheckCircle className="w-4 h-4 text-green-primary" />
            <span className="text-sm text-green-primary font-semibold">
              Todos os sistemas operacionais
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Status dos{" "}
            <span className="gradient-text">serviços</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Monitore a disponibilidade e performance de todos os serviços do
            WhatsApp Bot em tempo real.
          </p>
        </div>
      </section>

      {/* Overall Uptime */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                99.98%
              </p>
              <p className="text-sm text-text-muted">Uptime geral</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                &lt;85ms
              </p>
              <p className="text-sm text-text-muted">Latência média</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                0
              </p>
              <p className="text-sm text-text-muted">Incidentes ativos</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                30 dias
              </p>
              <p className="text-sm text-text-muted">Sem interrupções</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Serviços
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Status <span className="gradient-text">detalhado</span>
            </h2>
          </div>
          <div className="space-y-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="glass-card rounded-xl p-5 flex items-center gap-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {service.description}
                    </p>
                  </div>
                  <div className="hidden sm:block text-xs text-text-muted font-mono">
                    {service.uptime}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`}
                    />
                    <span className="text-xs text-green-primary font-medium">
                      {getStatusLabel(service.status)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Histórico
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Incidentes <span className="gradient-text">recentes</span>
            </h2>
          </div>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.title}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-primary shrink-0" />
                    <h3 className="text-sm font-semibold text-white">
                      {incident.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {incident.duration}
                    </span>
                    <span>{incident.date}</span>
                  </div>
                </div>
                <p className="text-sm text-text-muted leading-relaxed ml-7">
                  {incident.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
