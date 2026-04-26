"use client";

import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

const featuredPost = {
  tag: "Novidade",
  title: "Como a IA generativa está revolucionando o atendimento via WhatsApp",
  excerpt:
    "Descubra como modelos de linguagem avançados estão permitindo conversas mais naturais, resoluções mais rápidas e clientes mais satisfeitos.",
  date: "8 Abr 2026",
  readTime: "8 min de leitura",
  image: null,
};

const posts = [
  {
    tag: "Tutorial",
    title: "Guia completo: configurando seu primeiro chatbot em 10 minutos",
    excerpt:
      "Passo a passo para criar e configurar um chatbot inteligente no WhatsApp usando nossa plataforma.",
    date: "2 Abr 2026",
    readTime: "6 min de leitura",
  },
  {
    tag: "Produto",
    title: "Novas integrações: Salesforce, HubSpot e RD Station",
    excerpt:
      "Conecte seu CRM diretamente ao WhatsApp Bot e sincronize leads, contatos e oportunidades automaticamente.",
    date: "25 Mar 2026",
    readTime: "4 min de leitura",
  },
  {
    tag: "Estratégia",
    title: "5 métricas essenciais para medir o sucesso do seu atendimento",
    excerpt:
      "Tempo de resposta, taxa de resolução, NPS e mais: aprenda a medir o que realmente importa.",
    date: "18 Mar 2026",
    readTime: "5 min de leitura",
  },
  {
    tag: "Case",
    title: "Como a Loja XYZ reduziu 70% do tempo de atendimento",
    excerpt:
      "Estudo de caso detalhado de como um e-commerce automatizou o suporte e aumentou a satisfação dos clientes.",
    date: "10 Mar 2026",
    readTime: "7 min de leitura",
  },
  {
    tag: "Tutorial",
    title: "Automatizando cobranças e pagamentos via WhatsApp",
    excerpt:
      "Aprenda a enviar boletos, links de pagamento PIX e confirmações automáticas para seus clientes.",
    date: "3 Mar 2026",
    readTime: "5 min de leitura",
  },
  {
    tag: "Produto",
    title: "Relatórios avançados: tome decisões baseadas em dados",
    excerpt:
      "Conheça os novos dashboards e relatórios que ajudam a entender o comportamento dos seus clientes.",
    date: "24 Fev 2026",
    readTime: "4 min de leitura",
  },
];

function getTagColor(tag: string) {
  const colors: Record<string, string> = {
    Novidade: "bg-green-primary/10 text-green-primary",
    Tutorial: "bg-accent-blue/10 text-accent-blue",
    Produto: "bg-accent-purple/10 text-accent-purple",
    Estratégia: "bg-accent-yellow/10 text-accent-yellow",
    Case: "bg-green-primary/10 text-green-light",
  };
  return colors[tag] || "bg-white/10 text-white";
}

export default function BlogContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Artigos, tutoriais e{" "}
            <span className="gradient-text">novidades</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Tudo sobre automação de atendimento, WhatsApp Business, inteligência
            artificial e estratégias para escalar seu suporte.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card glow-border rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${getTagColor(featuredPost.tag)}`}
                >
                  <Tag className="w-3 h-3" />
                  {featuredPost.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-80 h-48 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-text-muted text-sm">Destaque</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="glass-card rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-300 hover:border-green-primary/20 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="h-40 bg-white/[0.02] flex items-center justify-center">
                  <span className="text-text-muted text-xs">Imagem</span>
                </div>
                <div className="p-6">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${getTagColor(post.tag)}`}
                  >
                    {post.tag}
                  </span>
                  <h3 className="text-base font-bold text-white mt-3 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.04] via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para{" "}
            <span className="gradient-text">automatizar</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Comece hoje mesmo a transformar o atendimento da sua empresa com
            inteligência artificial.
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
