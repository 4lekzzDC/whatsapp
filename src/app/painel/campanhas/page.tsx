"use client";

import { Plus, Megaphone, Users, CheckCircle2, Clock } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const campaigns = [
  { id: 1, name: "Black Friday 2026", status: "Em andamento", sent: 2340, total: 5000, opened: 72, conv: 9.4, date: "23/04 14:00", statusColor: "bg-green-primary/15 text-green-primary" },
  { id: 2, name: "Reativação inativos", status: "Agendada", sent: 0, total: 1200, opened: 0, conv: 0, date: "25/04 09:00", statusColor: "bg-accent-yellow/15 text-accent-yellow" },
  { id: 3, name: "Pesquisa NPS", status: "Concluída", sent: 890, total: 890, opened: 68, conv: 0, date: "19/04 10:00", statusColor: "bg-white/[0.05] text-text-muted" },
];

export default function CampanhasPage() {
  return (
    <>
      <Topbar currentLabel="Campanhas" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Campanhas"
          description="Envios em massa segmentados com acompanhamento de entrega, leitura e conversão."
          actions={
            <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
              <Plus className="w-4 h-4" /> Nova campanha
            </button>
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Em andamento", value: "1", icon: Megaphone, color: "text-green-primary" },
            { label: "Enviadas hoje", value: "2.340", icon: Users, color: "text-accent-blue" },
            { label: "Lidas", value: "72%", icon: CheckCircle2, color: "text-accent-yellow" },
            { label: "Agendadas", value: "1", icon: Clock, color: "text-accent-purple" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-text-muted">{s.label}</p>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs text-text-muted uppercase">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Campanha</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                  <th className="text-left font-medium px-5 py-3">Progresso</th>
                  <th className="text-left font-medium px-5 py-3">Leitura</th>
                  <th className="text-left font-medium px-5 py-3">Conversão</th>
                  <th className="text-left font-medium px-5 py-3">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium">{c.name}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.statusColor}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 min-w-[180px]">
                        <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-primary rounded-full"
                            style={{ width: `${(c.sent / c.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-muted font-mono w-20 text-right">
                          {c.sent.toLocaleString("pt-BR")}/{c.total.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm">{c.opened ? `${c.opened}%` : "—"}</td>
                    <td className="px-5 py-3 text-sm">{c.conv ? `${c.conv}%` : "—"}</td>
                    <td className="px-5 py-3 text-xs text-text-muted font-mono">{c.date}</td>
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
