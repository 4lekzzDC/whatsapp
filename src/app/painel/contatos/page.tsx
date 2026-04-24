"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Upload,
  Filter,
  Tag,
  Phone,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const contacts = [
  { id: 1, name: "Maria Silva", phone: "+55 51 9 9876-5432", email: "maria@empresa.com", tag: "Cliente", tagColor: "bg-green-primary/20 text-green-primary", last: "há 2h" },
  { id: 2, name: "João Pereira", phone: "+55 11 9 1111-2222", email: "joao@email.com", tag: "Lead", tagColor: "bg-accent-blue/20 text-accent-blue", last: "há 6h" },
  { id: 3, name: "Kenji Tanaka", phone: "+55 51 9 8888-0000", email: "kenji@omy.com", tag: "Contábil", tagColor: "bg-accent-yellow/20 text-accent-yellow", last: "ontem" },
  { id: 4, name: "Ana Costa", phone: "+55 21 9 5555-3333", email: "ana@costa.com", tag: "VIP", tagColor: "bg-accent-purple/20 text-accent-purple", last: "2 dias" },
  { id: 5, name: "Carlos Ribeiro", phone: "+55 31 9 4444-7777", email: "carlos.r@email.com", tag: "Cliente", tagColor: "bg-green-primary/20 text-green-primary", last: "3 dias" },
];

export default function ContatosPage() {
  const [query, setQuery] = useState("");
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Topbar currentLabel="Contatos" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Contatos"
          description="Base unificada com histórico de atendimentos, tags e dados dos clientes."
          actions={
            <>
              <button className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/80 text-sm px-3 py-2 rounded-lg">
                <Upload className="w-4 h-4" /> Importar
              </button>
              <button className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/80 text-sm px-3 py-2 rounded-lg">
                <Download className="w-4 h-4" /> Exportar
              </button>
              <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
                <Plus className="w-4 h-4" /> Novo contato
              </button>
            </>
          }
        />

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-white/5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, telefone ou e-mail"
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
              />
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.04]">
              <Filter className="w-4 h-4" /> Filtros
            </button>
            <button className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.04]">
              <Tag className="w-4 h-4" /> Tags
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs text-text-muted uppercase">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Nome</th>
                  <th className="text-left font-medium px-5 py-3">Contato</th>
                  <th className="text-left font-medium px-5 py-3">Tag</th>
                  <th className="text-left font-medium px-5 py-3">Última interação</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary/80 to-green-dark flex items-center justify-center text-black text-xs font-bold shrink-0">
                          {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="w-3 h-3" /> {c.phone}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-0.5">
                        <Mail className="w-3 h-3" /> {c.email}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.tagColor}`}>
                        {c.tag}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-muted text-xs">{c.last}</td>
                    <td className="px-5 py-3">
                      <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-white/5 text-xs text-text-muted flex items-center justify-between">
            <span>Mostrando {filtered.length} de {contacts.length} contatos</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded hover:bg-white/[0.04]">Anterior</button>
              <button className="px-2 py-1 rounded bg-white/[0.06] text-white">1</button>
              <button className="px-2 py-1 rounded hover:bg-white/[0.04]">Próxima</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
