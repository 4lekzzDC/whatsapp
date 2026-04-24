"use client";

import {
  BarChart3,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  Calendar,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const cards = [
  { label: "Atendimentos hoje", value: "247", delta: "+12%", icon: MessageSquare, color: "text-green-primary" },
  { label: "Tempo médio de resposta", value: "1m 42s", delta: "-8%", icon: Clock, color: "text-accent-blue" },
  { label: "Taxa de resolução", value: "92%", delta: "+3%", icon: CheckCircle2, color: "text-accent-yellow" },
  { label: "CSAT", value: "4.7", delta: "+0.1", icon: TrendingUp, color: "text-accent-purple" },
];

const intents = [
  { label: "Agendamento", value: 42, color: "bg-green-primary" },
  { label: "Dúvidas / Suporte", value: 30, color: "bg-accent-blue" },
  { label: "Vendas", value: 18, color: "bg-accent-yellow" },
  { label: "Outros", value: 10, color: "bg-accent-purple" },
];

const days = [40, 52, 38, 61, 55, 72, 68, 85, 92, 78, 88, 95, 110, 102];

export default function RelatoriosPage() {
  return (
    <>
      <Topbar currentLabel="Relatórios" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Relatórios"
          description="Acompanhe o desempenho do atendimento em tempo real."
          actions={
            <>
              <button className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/80 text-sm px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4" /> Últimos 14 dias
              </button>
              <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
                <Download className="w-4 h-4" /> Exportar
              </button>
            </>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((c) => (
            <div key={c.label} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <c.icon className={`w-5 h-5 ${c.color}`} />
                <span className="text-xs text-green-primary font-semibold">{c.delta}</span>
              </div>
              <p className="text-xs text-text-muted">{c.label}</p>
              <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Volume de atendimentos</h3>
                <p className="text-xs text-text-muted">Por dia — últimas 2 semanas</p>
              </div>
              <BarChart3 className="w-5 h-5 text-text-muted" />
            </div>
            <div className="flex items-end gap-1.5 h-40">
              {days.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-primary to-green-light rounded-t"
                    style={{ height: `${(d / Math.max(...days)) * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-text-muted">{i + 10}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-1">Intenções detectadas</h3>
            <p className="text-xs text-text-muted mb-5">Distribuição por NLP</p>
            <div className="space-y-3">
              {intents.map((intent) => (
                <div key={intent.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-white/80">{intent.label}</span>
                    <span className="font-mono text-text-muted">{intent.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${intent.color} rounded-full`}
                      style={{ width: `${intent.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 mt-4">
          <h3 className="font-semibold mb-4">Desempenho por operador</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-text-muted uppercase">
                <tr>
                  <th className="text-left font-medium py-2">Operador</th>
                  <th className="text-left font-medium py-2">Atendimentos</th>
                  <th className="text-left font-medium py-2">Tempo médio</th>
                  <th className="text-left font-medium py-2">CSAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { n: "Carla Mendes", a: 142, t: "1m 12s", c: 4.9 },
                  { n: "Lucas Rocha", a: 118, t: "1m 38s", c: 4.7 },
                  { n: "Beatriz Alves", a: 97, t: "2m 04s", c: 4.6 },
                  { n: "Rafael Duarte", a: 84, t: "2m 22s", c: 4.4 },
                ].map((op) => (
                  <tr key={op.n}>
                    <td className="py-2.5 font-medium">{op.n}</td>
                    <td className="py-2.5 text-white/80">{op.a}</td>
                    <td className="py-2.5 text-white/80 font-mono">{op.t}</td>
                    <td className="py-2.5 text-white/80">{op.c} ★</td>
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
