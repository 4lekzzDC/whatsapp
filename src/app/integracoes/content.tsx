"use client";

import {
  ArrowRight,
  ShoppingCart,
  Headphones,
  Database,
  CreditCard,
  Mail,
  Calendar,
  BarChart3,
  Code,
  Plug,
} from "lucide-react";

const categories = [
  {
    title: "CRM & Vendas",
    description: "Sincronize contatos, leads e oportunidades automaticamente.",
    integrations: [
      {
        name: "Salesforce",
        description: "Sincronize leads e oportunidades em tempo real.",
      },
      {
        name: "HubSpot",
        description: "Gerencie contatos e pipelines de vendas.",
      },
      {
        name: "Pipedrive",
        description: "Automatize a criação de deals e atividades.",
      },
      {
        name: "RD Station",
        description: "Integre marketing e vendas em um só lugar.",
      },
    ],
    icon: Database,
  },
  {
    title: "E-commerce",
    description: "Conecte sua loja online e automatize atendimento de pedidos.",
    integrations: [
      {
        name: "Shopify",
        description: "Consulta de pedidos e status de entrega.",
      },
      {
        name: "WooCommerce",
        description: "Integração completa com sua loja WordPress.",
      },
      {
        name: "Nuvemshop",
        description: "Atendimento automatizado para sua loja.",
      },
      {
        name: "VTEX",
        description: "Integração enterprise para grandes operações.",
      },
    ],
    icon: ShoppingCart,
  },
  {
    title: "Helpdesk & Suporte",
    description: "Centralize tickets e melhore o tempo de resolução.",
    integrations: [
      {
        name: "Zendesk",
        description: "Crie e gerencie tickets automaticamente.",
      },
      {
        name: "Freshdesk",
        description: "Sincronize conversas e tickets de suporte.",
      },
      {
        name: "Intercom",
        description: "Integre chat e base de conhecimento.",
      },
      {
        name: "Jira Service",
        description: "Gerencie chamados técnicos e SLAs.",
      },
    ],
    icon: Headphones,
  },
  {
    title: "Pagamentos",
    description: "Envie cobranças e confirme pagamentos via WhatsApp.",
    integrations: [
      {
        name: "Stripe",
        description: "Links de pagamento e confirmações automáticas.",
      },
      {
        name: "PagSeguro",
        description: "Boletos e PIX direto no WhatsApp.",
      },
      {
        name: "Mercado Pago",
        description: "Integração com QR Code e checkout.",
      },
      {
        name: "Asaas",
        description: "Cobranças recorrentes e gestão financeira.",
      },
    ],
    icon: CreditCard,
  },
  {
    title: "Marketing & Email",
    description: "Amplifique suas campanhas com WhatsApp marketing.",
    integrations: [
      {
        name: "Mailchimp",
        description: "Sincronize listas e automatize campanhas.",
      },
      {
        name: "ActiveCampaign",
        description: "Automações avançadas com triggers WhatsApp.",
      },
      {
        name: "SendGrid",
        description: "Notificações transacionais multicanal.",
      },
      {
        name: "Brevo",
        description: "Marketing multicanal com WhatsApp integrado.",
      },
    ],
    icon: Mail,
  },
  {
    title: "Agendamento",
    description: "Automatize marcações e lembretes de compromissos.",
    integrations: [
      {
        name: "Google Calendar",
        description: "Agendamentos sincronizados automaticamente.",
      },
      {
        name: "Calendly",
        description: "Links de agendamento via WhatsApp.",
      },
      {
        name: "Cal.com",
        description: "Agendamento open source com confirmação.",
      },
      {
        name: "Microsoft Outlook",
        description: "Integração com calendário corporativo.",
      },
    ],
    icon: Calendar,
  },
];

export default function IntegracoesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Integrações
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Conecte com as ferramentas que{" "}
            <span className="gradient-text">você já usa</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Mais de 50 integrações nativas com CRMs, e-commerces, ERPs,
            helpdesks e outras ferramentas do seu dia a dia.
          </p>
        </div>
      </section>

      {/* API Highlight */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card glow-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-green-primary/10 flex items-center justify-center shrink-0">
              <Code className="w-8 h-8 text-green-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white mb-2">
                API REST completa
              </h2>
              <p className="text-text-muted">
                Não encontrou a integração que precisa? Use nossa API REST
                documentada para conectar qualquer sistema. Webhooks, SDKs em
                Python, Node.js e PHP disponíveis.
              </p>
            </div>
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 border border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-semibold px-6 py-3 rounded-xl transition-all text-sm cursor-pointer">
                <Plug className="w-4 h-4" />
                Ver Documentação
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.integrations.map((integration) => (
                      <div
                        key={integration.name}
                        className="glass-card rounded-xl p-5 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3">
                          <span className="text-sm font-bold text-white/60">
                            {integration.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {integration.name}
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {integration.description}
                        </p>
                      </div>
                    ))}
                  </div>
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
            Não encontrou sua{" "}
            <span className="gradient-text">integração</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Fale com nosso time e vamos construir a integração que você precisa.
            Nossa API aberta permite conectar qualquer sistema.
          </p>
          <a
            href="/precos"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Falar com Vendas
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
