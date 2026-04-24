"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Search,
  MessageSquare,
  Smartphone,
  Users,
  Building2,
  UserCog,
  Workflow,
  Zap,
  BarChart3,
  Settings,
  Megaphone,
  BookOpen,
  LogOut,
  User,
  Plus,
  ArrowRight,
  Command as CmdIcon,
  CornerDownLeft,
} from "lucide-react";
import { sair } from "@/app/entrar/actions";

type Cmd = {
  id: string;
  label: string;
  description?: string;
  group: "Navegar" | "Criar" | "Contatos" | "Atendimentos" | "Conta";
  icon: typeof MessageSquare;
  href?: string;
  keywords?: string;
  action?: "logout";
};

const commands: Cmd[] = [
  { id: "nav-atd", group: "Navegar", label: "Atendimentos", icon: MessageSquare, href: "/painel/atendimentos", keywords: "tickets inbox conversas" },
  { id: "nav-wa", group: "Navegar", label: "Conexões WhatsApp", icon: Smartphone, href: "/painel/whatsapp", keywords: "qr code numeros" },
  { id: "nav-ctt", group: "Navegar", label: "Contatos", icon: Users, href: "/painel/contatos" },
  { id: "nav-set", group: "Navegar", label: "Setores", icon: Building2, href: "/painel/setores", keywords: "filas departamentos" },
  { id: "nav-usr", group: "Navegar", label: "Usuários", icon: UserCog, href: "/painel/usuarios", keywords: "operadores equipe" },
  { id: "nav-flx", group: "Navegar", label: "Fluxos", icon: Workflow, href: "/painel/fluxos", keywords: "automacao bot" },
  { id: "nav-rr", group: "Navegar", label: "Respostas rápidas", icon: Zap, href: "/painel/respostas-rapidas", keywords: "atalhos shortcuts" },
  { id: "nav-cmp", group: "Navegar", label: "Campanhas", icon: Megaphone, href: "/painel/campanhas", keywords: "disparo marketing" },
  { id: "nav-rel", group: "Navegar", label: "Relatórios", icon: BarChart3, href: "/painel/relatorios", keywords: "dashboard metricas" },
  { id: "nav-cfg", group: "Navegar", label: "Configurações", icon: Settings, href: "/painel/configuracoes", keywords: "empresa bot ia plano" },
  { id: "nav-aj", group: "Navegar", label: "Central de Ajuda", icon: BookOpen, href: "/painel/ajuda" },

  { id: "new-flow", group: "Criar", label: "Novo fluxo", description: "Abrir editor visual em branco", icon: Plus, href: "/painel/fluxos/editor" },
  { id: "new-wa", group: "Criar", label: "Nova conexão WhatsApp", description: "Escanear QR Code", icon: Plus, href: "/painel/whatsapp?nova=1" },
  { id: "new-ctt", group: "Criar", label: "Novo contato", icon: Plus, href: "/painel/contatos?novo=1" },
  { id: "new-cmp", group: "Criar", label: "Nova campanha", icon: Plus, href: "/painel/campanhas?nova=1" },
  { id: "new-rr", group: "Criar", label: "Nova resposta rápida", icon: Plus, href: "/painel/respostas-rapidas?nova=1" },

  { id: "acc-perfil", group: "Conta", label: "Meu perfil", icon: User, href: "/painel/perfil" },
  { id: "acc-sair", group: "Conta", label: "Sair", icon: LogOut, action: "logout" },
];

type PaletteApi = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const Ctx = createContext<PaletteApi | null>(null);

export function useCommandPalette(): PaletteApi {
  const api = useContext(Ctx);
  if (!api) throw new Error("useCommandPalette fora do CommandPaletteProvider");
  return api;
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const api = useMemo<PaletteApi>(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
    }),
    []
  );

  // ⌘K / Ctrl+K global
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset state ao abrir
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Filtrar
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    for (const c of filtered) {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    }
    return [...map.entries()];
  }, [filtered]);

  async function run(cmd: Cmd) {
    setOpen(false);
    if (cmd.action === "logout") {
      await sair();
      return;
    }
    if (cmd.href) router.push(cmd.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[cursor];
      if (cmd) run(cmd);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Ctx.Provider value={api}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="w-full max-w-xl glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-slide-up"
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b border-white/5">
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder="Busque uma página ou digite uma ação…"
                className="flex-1 bg-transparent text-sm placeholder:text-text-muted focus:outline-none"
              />
              <kbd className="text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5 text-text-muted">
                Esc
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-text-muted">
                  Nada encontrado para &ldquo;{query}&rdquo;.
                </div>
              ) : (
                grouped.map(([group, cmds]) => (
                  <div key={group} className="mb-2 last:mb-0">
                    <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold px-3 pb-1 pt-2">
                      {group}
                    </p>
                    {cmds.map((c) => {
                      const idx = filtered.indexOf(c);
                      const active = idx === cursor;
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.id}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => run(c)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            active
                              ? "bg-green-primary/15 text-white"
                              : "text-white/85 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              active ? "bg-green-primary/25 text-green-primary" : "bg-white/[0.05] text-text-muted"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{c.label}</p>
                            {c.description && (
                              <p className="text-xs text-text-muted truncate">{c.description}</p>
                            )}
                          </div>
                          {active && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-green-primary shrink-0" />
                          )}
                          {!active && c.href && (
                            <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/5 bg-white/[0.02] px-4 py-2 flex items-center justify-between text-[11px] text-text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-white/[0.06] border border-white/10 rounded px-1 py-0.5">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-white/[0.06] border border-white/10 rounded px-1 py-0.5">↵</kbd>
                  abrir
                </span>
              </div>
              <span className="flex items-center gap-1">
                <CmdIcon className="w-3 h-3" /> K para abrir de qualquer lugar
              </span>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
