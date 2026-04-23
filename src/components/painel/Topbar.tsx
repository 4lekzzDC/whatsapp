"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sun,
  Moon,
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

const sections = [
  { href: "/painel/atendimentos", label: "Atendimentos" },
  { href: "/painel/contatos", label: "Contatos" },
  { href: "/painel/relatorios", label: "Relatórios" },
  { href: "/painel/configuracoes", label: "Configurações" },
];

export default function Topbar({ currentLabel = "Atendimentos" }: { currentLabel?: string }) {
  const [openSections, setOpenSections] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [dark, setDark] = useState(true);

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
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar contatos, atendimentos..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={() => setDark((v) => !v)}
          className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]"
          title="Alternar tema"
        >
          {dark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        <button
          className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]"
          title="Idioma"
        >
          <span className="text-lg leading-none">🇧🇷</span>
        </button>

        <button className="relative p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/[0.04]">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-green-primary" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpenProfile((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.04]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-primary to-green-dark flex items-center justify-center text-black text-xs font-bold">
              AM
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
          </button>
          {openProfile && (
            <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl border border-white/10 shadow-2xl p-1.5 z-50">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-sm font-medium">Alexandre Marin</p>
                <p className="text-xs text-text-muted">admin@empresa.com</p>
              </div>
              <Link
                href="/painel/perfil"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <User className="w-4 h-4" /> Meu perfil
              </Link>
              <Link
                href="/painel/configuracoes"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <Settings className="w-4 h-4" /> Configurações
              </Link>
              <Link
                href="/painel/ajuda"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white rounded-lg"
              >
                <HelpCircle className="w-4 h-4" /> Ajuda
              </Link>
              <div className="my-1 border-t border-white/5" />
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
              >
                <LogOut className="w-4 h-4" /> Sair
              </Link>
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
