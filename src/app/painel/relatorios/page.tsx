"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";
import { useToast } from "@/components/painel/ToastProvider";

type Range = "today" | "7d" | "14d" | "30d" | "90d";

const ranges: { id: Range; label: string; days: number }[] = [
  { id: "today", label: "Hoje", days: 1 },
  { id: "7d", label: "7 dias", days: 7 },
  { id: "14d", label: "14 dias", days: 14 },
  { id: "30d", label: "30 dias", days: 30 },
  { id: "90d", label: "90 dias", days: 90 },
];

const intents = [
  { label: "Agendamento", value: 42, color: "bg-green-primary" },
  { label: "Dúvidas / Suporte", value: 30, color: "bg-accent-blue" },
  { label: "Vendas", value: 18, color: "bg-accent-yellow" },
  { label: "Outros", value: 10, color: "bg-accent-purple" },
];

// Gerador determinístico por seed para dar a impressão de dados diferentes
// conforme o período selecionado.
function seriesFor(days: number, seed: number): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < days; i++) {
    s = (s * 9301 + 49297) % 233280;
    const base = 30 + (s / 233280) * 80;
    const trend = i * (0.5 + (seed % 3) * 0.3);
    out.push(Math.round(base + trend));
  }
  return out;
}

function metrics(days: number) {
  // Valores fictícios que variam com o período.
  const total = Math.round(247 * Math.min(days, 30) * 0.9 + 120);
  const avg = 90 + (days * 2) % 60;
  const res = Math.max(78, 95 - Math.floor(days / 20));
  const csat = Math.round((47 - Math.floor(days / 40)) ) / 10;
  return {
    total: total.toLocaleString("pt-BR"),
    avg: `${Math.floor(avg / 60)}m ${String(avg % 60).padStart(2, "0")}s`,
    res: `${res}%`,
    csat: csat.toFixed(1),
    delta: days <= 7 ? "+12%" : days <= 30 ? "+6%" : "+2%",
  };
}

export default function RelatoriosPage() {
  const [range, setRange] = useState<Range>("14d");
  const toast = useToast();

  const current = ranges.find((r) => r.id === range)!;
  const days = useMemo(() => seriesFor(current.days, current.days + 7), [current]);
  const m = useMemo(() => metrics(current.days), [current]);
  const maxBar = Math.max(...days);
  const axis = useMemo(() => {
    const total = days.length;
    const step = Math.max(1, Math.floor(total / 8));
    return days.map((_, i) => (i % step === 0 || i === total - 1 ? String(i + 1) : ""));
  }, [days]);

  const cards = [
    { label: "Atendimentos no período", value: m.total, delta: m.delta, icon: MessageSquare, color: "text-green-primary" },
    { label: "Tempo médio de resposta", value: m.avg, delta: "-8%", icon: Clock, color: "text-accent-blue" },
    { label: "Taxa de resolução", value: m.res, delta: "+3%", icon: CheckCircle2, color: "text-accent-yellow" },
    { label: "CSAT", value: m.csat, delta: "+0.1", icon: TrendingUp, color: "text-accent-purple" },
  ];

  return (
    <>
      <Topbar currentLabel="Relatórios" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Relatórios"
          description="Acompanhe o desempenho do atendimento em tempo real."
          actions={
            <>
              <div className="inline-flex items-center bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5 overflow-hidden">
                {ranges.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRange(r.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      range === r.id
                        ? "bg-green-primary text-black"
                        : "text-text-muted hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  toast.success("Relatório exportado", `Período: ${current.label}. CSV enviado por e-mail.`)
                }
                className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
              >
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
                <p className="text-xs text-text-muted">
                  Por dia — {current.label.toLowerCase()}
                </p>
              </div>
              <BarChart3 className="w-5 h-5 text-text-muted" />
            </div>
            <div className="flex items-end gap-1 h-40">
              {days.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0 group relative">
                  <div
                    className="w-full bg-gradient-to-t from-green-primary to-green-light rounded-t hover:from-green-light hover:to-white transition-colors"
                    style={{ height: `${(d / maxBar) * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-text-muted">{axis[i]}</span>
                  <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 pointer-events-none bg-background border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono whitespace-nowrap">
                    dia {i + 1}: {d}
                  </div>
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
                ].map((op) => {
                  const scale = current.days / 14;
                  return (
                    <tr key={op.n}>
                      <td className="py-2.5 font-medium">{op.n}</td>
                      <td className="py-2.5 text-white/80">{Math.round(op.a * scale)}</td>
                      <td className="py-2.5 text-white/80 font-mono">{op.t}</td>
                      <td className="py-2.5 text-white/80">{op.c} ★</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
