"use client";

import { useState } from "react";
import { Plus, Zap, Copy, Edit2, Trash2, Search } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const replies = [
  {
    id: 1,
    shortcut: "/saudacao",
    title: "Saudação inicial",
    body: "Olá, {{nome}}! 👋 Seja bem-vindo(a). Em que posso ajudar hoje?",
    uses: 1240,
  },
  {
    id: 2,
    shortcut: "/horario",
    title: "Horário de atendimento",
    body: "Nosso atendimento humano funciona de segunda a sexta, das 08h às 18h. Fora desse horário respondo por aqui mesmo.",
    uses: 512,
  },
  {
    id: 3,
    shortcut: "/boleto",
    title: "Envio de boleto",
    body: "Segue o link do boleto: {{link_boleto}}. Caso precise de uma nova via, digite /2via.",
    uses: 309,
  },
  {
    id: 4,
    shortcut: "/despedida",
    title: "Despedida",
    body: "Foi um prazer ajudar, {{nome}}! Se precisar, é só chamar por aqui. 👋",
    uses: 889,
  },
];

export default function RespostasRapidasPage() {
  const [q, setQ] = useState("");
  const list = replies.filter(
    (r) =>
      r.title.toLowerCase().includes(q.toLowerCase()) ||
      r.shortcut.includes(q) ||
      r.body.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Topbar currentLabel="Respostas rápidas" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Respostas rápidas"
          description="Mensagens prontas disparadas por atalho (/atalho) com variáveis dinâmicas como {{nome}}."
          actions={
            <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
              <Plus className="w-4 h-4" /> Nova resposta
            </button>
          }
        />

        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por atalho, título ou conteúdo"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {list.map((r) => (
            <div key={r.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono bg-green-primary/15 text-green-primary px-2 py-1 rounded">
                    <Zap className="w-3 h-3" /> {r.shortcut}
                  </div>
                  <h3 className="font-semibold mt-2">{r.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted hover:text-white"><Copy className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted hover:text-white"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded hover:bg-red-500/10 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-sm text-white/75 leading-relaxed whitespace-pre-wrap">{r.body}</p>
              <p className="text-[11px] text-text-muted mt-3">Usada {r.uses.toLocaleString("pt-BR")} vezes</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
