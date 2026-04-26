"use client";

import Link from "next/link";
import { Cookie, Shield, Settings, BarChart3, ArrowRight } from "lucide-react";

const cookieTypes = [
  {
    icon: Shield,
    title: "Cookies Essenciais",
    description:
      "Necessários para o funcionamento básico da plataforma. Não podem ser desativados.",
    cookies: [
      {
        name: "session_id",
        purpose: "Manter sua sessão de login ativa",
        duration: "Sessão",
      },
      {
        name: "csrf_token",
        purpose: "Proteção contra ataques CSRF",
        duration: "Sessão",
      },
      {
        name: "cookie_consent",
        purpose: "Armazenar suas preferências de cookies",
        duration: "1 ano",
      },
    ],
  },
  {
    icon: BarChart3,
    title: "Cookies de Analytics",
    description:
      "Nos ajudam a entender como os usuários interagem com a plataforma para melhorar a experiência.",
    cookies: [
      {
        name: "_analytics_id",
        purpose: "Identificar visitantes únicos anonimamente",
        duration: "2 anos",
      },
      {
        name: "_analytics_session",
        purpose: "Agrupar pageviews em uma sessão",
        duration: "30 min",
      },
      {
        name: "page_views",
        purpose: "Contar visualizações de página para relatórios",
        duration: "1 ano",
      },
    ],
  },
  {
    icon: Settings,
    title: "Cookies de Preferências",
    description:
      "Permitem que a plataforma lembre suas preferências e personalizações.",
    cookies: [
      {
        name: "theme",
        purpose: "Salvar preferência de tema (claro/escuro)",
        duration: "1 ano",
      },
      {
        name: "language",
        purpose: "Salvar preferência de idioma",
        duration: "1 ano",
      },
      {
        name: "dashboard_layout",
        purpose: "Lembrar layout personalizado do painel",
        duration: "1 ano",
      },
    ],
  },
];

export default function CookiesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Política de{" "}
            <span className="gradient-text">Cookies</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Entenda quais cookies utilizamos, por que os usamos e como você
            pode gerenciar suas preferências.
          </p>
          <p className="text-sm text-text-muted mt-6">
            Última atualização: 1 de abril de 2026
          </p>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-green-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                O que são Cookies?
              </h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu
              navegador quando você visita nosso site. Eles nos ajudam a
              fornecer uma experiência melhor, lembrando suas preferências e
              entendendo como você utiliza a plataforma. Não armazenamos
              informações pessoais sensíveis em cookies.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
              Categorias
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Tipos de <span className="gradient-text">cookies</span>
            </h2>
          </div>
          <div className="space-y-6">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-6 ml-14">
                    {type.description}
                  </p>
                  <div className="overflow-x-auto ml-14">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left py-2 pr-4 text-text-muted font-medium">
                            Cookie
                          </th>
                          <th className="text-left py-2 pr-4 text-text-muted font-medium">
                            Finalidade
                          </th>
                          <th className="text-left py-2 text-text-muted font-medium">
                            Duração
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.cookies.map((cookie) => (
                          <tr
                            key={cookie.name}
                            className="border-b border-white/5 last:border-0"
                          >
                            <td className="py-3 pr-4">
                              <code className="text-xs text-green-primary bg-green-primary/10 px-2 py-0.5 rounded font-mono">
                                {cookie.name}
                              </code>
                            </td>
                            <td className="py-3 pr-4 text-text-muted">
                              {cookie.purpose}
                            </td>
                            <td className="py-3 text-text-muted whitespace-nowrap">
                              {cookie.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Manage */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-green-primary/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Como Gerenciar Cookies
              </h2>
            </div>
            <div className="space-y-4 text-sm text-text-muted leading-relaxed">
              <p>
                Você pode controlar e gerenciar cookies de diversas formas.
                Lembre-se de que a remoção ou bloqueio de cookies pode afetar
                sua experiência na plataforma.
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-green-primary mt-1 shrink-0">
                    &bull;
                  </span>
                  <span>
                    <strong className="text-white">Configurações do navegador:</strong>{" "}
                    A maioria dos navegadores permite bloquear ou excluir cookies
                    nas configurações de privacidade.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary mt-1 shrink-0">
                    &bull;
                  </span>
                  <span>
                    <strong className="text-white">Cookies de analytics:</strong>{" "}
                    Você pode desativar cookies de analytics sem afetar a
                    funcionalidade da plataforma.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary mt-1 shrink-0">
                    &bull;
                  </span>
                  <span>
                    <strong className="text-white">Cookies essenciais:</strong>{" "}
                    Estes não podem ser desativados pois são necessários para o
                    funcionamento básico da plataforma.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-primary/[0.04] via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Dúvidas sobre{" "}
            <span className="gradient-text">cookies</span>?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Entre em contato conosco para mais informações sobre como usamos
            cookies.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25 text-sm"
          >
            Falar Conosco
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
