"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import { useT } from "./LocaleProvider";

export default function Hero() {
  const t = useT();
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-primary/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.03] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-primary/10 border border-green-primary/20">
              <MessageCircle className="w-4 h-4 text-green-primary" />
              <span className="text-sm text-green-primary font-medium">{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">{t("hero.title.line1")}</span>
              <br />
              <span className="text-white/90">{t("hero.title.line2")}</span>
              <br />
              <span className="text-white/90">{t("hero.title.line3")}</span>
            </h1>

            <p className="text-lg text-text-muted max-w-lg leading-relaxed">
              {t("hero.description")}
            </p>

            <ul className="space-y-3">
              {[
                t("hero.bullet.inbox"),
                t("hero.bullet.anywhere"),
                t("hero.bullet.outbound"),
                t("hero.bullet.quickReplies"),
                t("hero.bullet.ai"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-primary/20 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3 h-3 text-green-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-7 py-3.5 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-green-primary/25 hover:scale-[1.02]"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium px-7 py-3.5 rounded-xl text-base transition-all hover:bg-white/5"
              >
                {t("hero.cta.secondary")}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {[t("hero.tag.inbox"), t("hero.tag.scheduling"), t("hero.tag.ai")].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
