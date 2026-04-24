"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  Maximize2,
  HelpCircle,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { sair } from "@/app/entrar/actions";
import { useUser } from "./UserProvider";
import { useCommandPalette } from "./CommandPalette";
import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";
import { useT } from "../LocaleProvider";

export default function Topbar({ currentLabel = "Atendimentos" }: { currentLabel?: string }) {
  const [openSections, setOpenSections] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const user = useUser();
  const palette = useCommandPalette();
  const t = useT();

  const sections = [
    { href: "/painel/atendimentos", label: t("panel.tickets") },
    { href: "/painel/contatos", label: t("panel.contacts") },
    { href: "/painel/relatorios", label: t("panel.reports") },
    { href: "/painel/configuracoes", label: t("panel.settings") },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-white/5 bg-card-bg/70 backdrop-blur-md flex items-center px-4 lg:px-6 gap-3">
      <button className="lg:hidden p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]">
        <Menu className="w-5 h-5" />
      </button>

      <div className="relative">
        <button
          onClick={() => setOpenSections((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.04] text-sm font-medium"
        >
          <span>{currentLabel}</span>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </button>
        {openSections && (
          <div className="absolute left-0 mt-2 w-56 glass-card rounded-xl border border-white/10 shadow-2xl p-1.5 z-50">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpenSections(false)}
                className="block px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-auto">
        <button
          onClick={palette.open}
          className="group relative w-full flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-left"
        >
          <Search className="w-4 h-4 text-text-muted" />
          <span className="text-text-muted flex-1">{t("panel.search")}</span>
          <kbd className="text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 text-text-muted">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <ThemeToggle />
        <LanguageSwitcher />

        <button className="relative p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-primary" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpenProfile((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.04]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-primary to-green-dark flex items-center justify-center text-black text-xs font-bold">
              {user.initials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
          {openProfile && (
            <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl border border-white/10 shadow-2xl p-1.5 z-50">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-text-muted truncate">{user.email}</p>
              </div>
              <Link
                href="/painel/perfil"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <User className="w-4 h-4" /> {t("panel.myProfile")}
              </Link>
              <Link
                href="/painel/configuracoes"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <Settings className="w-4 h-4" /> {t("panel.settings")}
              </Link>
              <Link
                href="/painel/ajuda"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <HelpCircle className="w-4 h-4" /> {t("panel.help")}
              </Link>
              <div className="my-1 border-t border-white/5" />
              <form action={sair}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <LogOut className="w-4 h-4" /> {t("panel.logout")}
                </button>
              </form>
            </div>
          )}
        </div>

        <button
          className="hidden md:flex p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]"
          title="Tela cheia"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
