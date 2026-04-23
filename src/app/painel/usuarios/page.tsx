"use client";

import { Plus, Shield, MoreHorizontal, Circle } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const users = [
  { id: 1, name: "Alexandre Marin", email: "alexandre@empresa.com", role: "Admin", sectors: ["Todos"], status: "online", inits: "AM" },
  { id: 2, name: "Carla Mendes", email: "carla@empresa.com", role: "Supervisor", sectors: ["Suporte"], status: "online", inits: "CM" },
  { id: 3, name: "Lucas Rocha", email: "lucas@empresa.com", role: "Operador", sectors: ["Comercial"], status: "online", inits: "LR" },
  { id: 4, name: "Beatriz Alves", email: "beatriz@empresa.com", role: "Operador", sectors: ["Financeiro", "Contábil"], status: "ausente", inits: "BA" },
  { id: 5, name: "Rafael Duarte", email: "rafael@empresa.com", role: "Operador", sectors: ["Suporte"], status: "offline", inits: "RD" },
];

function roleBadge(role: string) {
  const colors: Record<string, string> = {
    Admin: "bg-red-500/15 text-red-400",
    Supervisor: "bg-accent-purple/15 text-accent-purple",
    Operador: "bg-accent-blue/15 text-accent-blue",
  };
  return colors[role] ?? "bg-white/[0.05] text-white/70";
}

function statusColor(status: string) {
  if (status === "online") return "text-green-primary";
  if (status === "ausente") return "text-accent-yellow";
  return "text-text-muted";
}

export default function UsuariosPage() {
  return (
    <>
      <Topbar currentLabel="Usuários" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Usuários & Operadores"
          description="Convide sua equipe, defina papéis e distribua acessos por setor."
          actions={
            <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
              <Plus className="w-4 h-4" /> Convidar usuário
            </button>
          }
        />

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs text-text-muted uppercase">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Usuário</th>
                  <th className="text-left font-medium px-5 py-3">Papel</th>
                  <th className="text-left font-medium px-5 py-3">Setores</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-primary to-green-dark flex items-center justify-center text-black text-xs font-bold shrink-0">
                          {u.inits}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-text-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${roleBadge(u.role)}`}>
                        <Shield className="w-3 h-3" /> {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {u.sectors.map((s) => (
                          <span key={s} className="text-[11px] bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${statusColor(u.status)}`}>
                        <Circle className="w-2 h-2 fill-current" /> {u.status}
                      </span>
                    </td>
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
        </div>
      </main>
    </>
  );
}
