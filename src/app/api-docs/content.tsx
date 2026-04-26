"use client";

import Link from "next/link";
import {
  Code,
  Key,
  Send,
  Webhook,
  Gauge,
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const endpoints = [
  {
    method: "POST",
    path: "/v1/messages/send",
    description: "Enviar mensagem de texto, imagem, documento ou template.",
  },
  {
    method: "GET",
    path: "/v1/messages/{id}",
    description: "Consultar status e detalhes de uma mensagem enviada.",
  },
  {
    method: "POST",
    path: "/v1/contacts/create",
    description: "Criar ou atualizar um contato na sua base.",
  },
  {
    method: "GET",
    path: "/v1/conversations",
    description: "Listar conversas ativas com filtros e paginação.",
  },
  {
    method: "POST",
    path: "/v1/webhooks/register",
    description: "Registrar URL de webhook para receber eventos em tempo real.",
  },
  {
    method: "GET",
    path: "/v1/analytics/overview",
    description: "Obter métricas de desempenho e relatórios consolidados.",
  },
];

const features = [
  {
    icon: Key,
    title: "Autenticação Segura",
    description:
      "API Keys com escopos granulares e tokens JWT para autenticação segura em todas as requisições.",
  },
  {
    icon: Webhook,
    title: "Webhooks em Tempo Real",
    description:
      "Receba notificações instantâneas sobre mensagens, status de entrega e eventos do chat.",
  },
  {
    icon: Gauge,
    title: "Rate Limits Generosos",
    description:
      "Até 1.000 requisições por minuto no plano Business. Limite escalável conforme sua necessidade.",
  },
  {
    icon: Shield,
    title: "Criptografia End-to-End",
    description:
      "Todos os dados trafegam com TLS 1.3 e são armazenados com criptografia AES-256.",
  },
  {
    icon: Zap,
    title: "Latência Ultra Baixa",
    description:
      "Infraestrutura global com CDN e servidores edge para resposta em menos de 100ms.",
  },
  {
    icon: Globe,
    title: "SDKs Oficiais",
    description:
      "Bibliotecas prontas para Node.js, Python, PHP, Java e Ruby com tipagem completa.",
  },
];

const codeExample = `// Enviar mensagem via API
const response = await fetch('https://api.whatsappbot.com/v1/messages/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+5511999999999',
    type: 'text',
    content: {
      body: 'Olá! Como posso ajudar?'
    }
  })
});

const data = await response.json();
console.log('Mensagem enviada:', data.messageId);`;

export default function ApiContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            API Reference
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            API REST{" "}
            <span className="gradient-text">poderosa e simples</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed mb-10">
            Integre o WhatsApp Bot em qualquer aplicação com nossa API RESTful
            completa. Envie mensagens, gerencie contatos e automatize fluxos
            programaticamente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
            >
              <Terminal className="w-4 h-4" />
              Obter API Key
            </a>
            <Link
              href="/documentacao"
              className="inline-flex items-center gap-2 border border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Ver Documentação
            </Link>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-text-muted ml-2 font-mono">
                send-message.js
              </span>
            </div>
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
              <code className="text-text-muted font-mono">{codeExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Endpoints
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Principais <span className="gradient-text">rotas</span>
            </h2>
          </div>
          <div className="space-y-3">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span
                  className={`text-xs font-bold font-mono px-2.5 py-1 rounded-md w-fit ${
                    endpoint.method === "POST"
                      ? "bg-green-primary/10 text-green-primary"
                      : "bg-accent-blue/10 text-accent-blue"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm text-white font-mono">
                  {endpoint.path}
                </code>
                <span className="text-sm text-text-muted sm:ml-auto">
                  {endpoint.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Recursos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Feita para <span className="gradient-text">desenvolvedores</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
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
            Pronto para{" "}
            <span className="gradient-text">integrar</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Crie sua conta gratuita e comece a usar a API em minutos. Sem
            cartão de crédito.
          </p>
          <Link
            href="/precos"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Começar Grátis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
