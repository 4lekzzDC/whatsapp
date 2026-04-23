"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUpDown,
  Users,
  Inbox,
  CheckCircle2,
  Search,
  MessageSquare,
  Timer,
  UsersRound,
  ChevronDown,
  X,
  Maximize2,
  HelpCircle,
  Eye,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";

type Tab = "inbox" | "resolvidos" | "busca";

const tickets = [
  {
    id: 1,
    initials: "K",
    color: "bg-yellow-500",
    name: "Kenji — Omy Matriz",
    assigned: "Alexandre Marin (Dpto. Contábil)",
    tag: "Contábil",
    connection: "itamarathy 2",
    time: "14:39",
    seen: true,
  },
  {
    id: 2,
    initials: "MS",
    color: "bg-blue-500",
    name: "Maria Silva",
    assigned: "Aguardando atribuição",
    tag: "Financeiro",
    connection: "itamarathy 1",
    time: "14:12",
    seen: false,
  },
  {
    id: 3,
    initials: "JP",
    color: "bg-pink-500",
    name: "João Pereira",
    assigned: "Carla Mendes (Suporte)",
    tag: "Suporte",
    connection: "itamarathy 2",
    time: "13:55",
    seen: true,
  },
];

export default function AtendimentosPage() {
  const [tab, setTab] = useState<Tab>("inbox");
  const [subTab, setSubTab] = useState<"chat" | "timer" | "group">("chat");
  const [groupByContact, setGroupByContact] = useState(false);
  const [sortDesc, setSortDesc] = useState(false);

  return (
    <>
      <Topbar currentLabel="Atendimentos" />

      <div className="flex-1 flex overflow-hidden">
        {/* Lista lateral de tickets */}
        <div className="w-full max-w-sm shrink-0 border-r border-white/5 bg-card-bg/30 flex flex-col">
          {/* Abas principais */}
          <div className="grid grid-cols-3 border-b border-white/5">
            {(
              [
                { id: "inbox", icon: Inbox, label: "Inbox" },
                { id: "resolvidos", icon: CheckCircle2, label: "Resolvidos" },
                { id: "busca", icon: Search, label: "Busca" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-col items-center gap-1 py-3 text-xs font-medium border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-accent-purple text-white"
                    : "border-transparent text-text-muted hover:text-white"
                }`}
              >
                <t.icon className="w-5 h-5" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Barra de filtros */}
          <div className="flex items-center gap-2 p-3 border-b border-white/5">
            <button className="inline-flex items-center gap-1.5 bg-green-primary hover:bg-green-primary/90 text-black text-xs font-bold px-3 py-1.5 rounded-md">
              <Plus className="w-3.5 h-3.5" /> NOVO
            </button>

            <button
              onClick={() => setGroupByContact((v) => !v)}
              className="flex items-center gap-1.5 text-text-muted hover:text-white"
              title="Agrupar por contato"
            >
              <Users className="w-4 h-4" />
              <span
                className={`w-7 h-4 rounded-full relative transition-colors ${
                  groupByContact ? "bg-green-primary" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                    groupByContact ? "left-3.5" : "left-0.5"
                  }`}
                />
              </span>
            </button>

            <button
              onClick={() => setSortDesc((v) => !v)}
              className="flex items-center gap-1.5 text-text-muted hover:text-white"
              title="Ordenação"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span
                className={`w-7 h-4 rounded-full relative transition-colors ${
                  sortDesc ? "bg-green-primary" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                    sortDesc ? "left-3.5" : "left-0.5"
                  }`}
                />
              </span>
            </button>

            <button className="ml-auto inline-flex items-center gap-1 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] text-xs px-2.5 py-1.5 rounded-md">
              Setores <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Sub-abas */}
          <div className="grid grid-cols-3 border-b border-white/5">
            {(
              [
                { id: "chat", icon: MessageSquare, count: 1 },
                { id: "timer", icon: Timer, count: 0 },
                { id: "group", icon: UsersRound, count: 0 },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setSubTab(s.id)}
                className={`relative flex items-center justify-center py-3 transition-colors ${
                  subTab === s.id
                    ? "bg-accent-purple/10 text-accent-purple border-b-2 border-accent-purple"
                    : "text-text-muted hover:text-white border-b-2 border-transparent"
                }`}
              >
                <s.icon className="w-5 h-5" />
                {s.count > 0 && (
                  <span className="absolute top-1 right-1/2 translate-x-5 -translate-y-1 w-4 h-4 rounded-full bg-accent-purple text-[10px] font-bold text-white flex items-center justify-center">
                    {s.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Lista de tickets */}
          <div className="flex-1 overflow-y-auto">
            {tickets.map((t) => (
              <button
                key={t.id}
                className="w-full text-left p-3 border-b border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.color}/80 flex items-center justify-center text-black font-bold text-sm shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold truncate">{t.name}</p>
                      <span className="text-[11px] text-text-muted shrink-0 ml-2">
                        {t.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-text-muted">
                      {t.seen && <Eye className="w-3 h-3 shrink-0" />}
                      <p className="truncate">{t.assigned}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] font-semibold bg-yellow-400 text-black px-1.5 py-0.5 rounded">
                        {t.tag}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-text-muted">
                        <MessageSquare className="w-3 h-3 text-green-primary" />
                        {t.connection}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Área de conversa (vazio por padrão) */}
        <div className="flex-1 flex flex-col bg-background min-w-0">
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-36 h-36 rounded-3xl border-4 border-white/10 flex items-center justify-center mb-5">
              <X className="w-16 h-16 text-white/20" strokeWidth={2.5} />
            </div>
            <p className="text-sm text-text-muted">
              Selecione um atendimento para começar a conversar.
            </p>
          </div>

          <div className="h-12 border-t border-white/5 flex items-center justify-between px-4 text-xs text-text-muted bg-card-bg/30">
            <div className="flex items-center gap-3">
              <span>Modo:</span>
              <button className="p-1 hover:text-white rounded">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <button className="flex items-center gap-1 hover:text-white">
              <HelpCircle className="w-3.5 h-3.5" /> Ajuda
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
