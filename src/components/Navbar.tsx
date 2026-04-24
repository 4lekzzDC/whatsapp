"use client";

import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "./LocaleProvider";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();

  const navLinks = [
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-green-primary/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-primary" />
            </div>
            <span className="text-lg font-bold">WhatsApp Bot</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="/entrar"
              className="text-sm text-text-muted hover:text-white transition-colors px-3 py-2"
            >
              {t("nav.signIn")}
            </a>
            <a
              href="/cadastro"
              className="text-sm bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-primary/25"
            >
              {t("nav.startFree")}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-muted"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-text-muted hover:text-white transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/entrar"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-text-muted hover:text-white transition-colors py-2 text-center"
          >
            {t("nav.signIn")}
          </a>
          <a
            href="/cadastro"
            onClick={() => setMobileOpen(false)}
            className="block text-sm bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-5 py-2.5 rounded-xl text-center transition-all mt-3"
          >
            {t("nav.startFree")}
          </a>
        </div>
      )}
    </nav>
  );
}
