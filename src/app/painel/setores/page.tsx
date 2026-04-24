"use client";

import { Plus, Users, MessageSquare, Edit2, Trash2, Clock } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";
import { useToast } from "@/components/painel/ToastProvider";
import { useConfirm } from "@/components/painel/ConfirmProvider";

const sectors = [
  {
    id: 1,
    name: "Comercial",
    color: "#25D366",
    operators: 5,
    openTickets: 12,
    avgResponse: "1m 24s",
    greeting: "Olá! Sou do setor comercial, como posso ajudar?",
  },
  {
    id: 2,
    name: "Suporte Técnico",
    color: "#3b82f6",
    operators: 8,
    openTickets: 27,
    avgResponse: "2m 10s",
    greeting: "Suporte técnico à sua disposição. Descreva o problema que você está enfrentando.",
  },
  {
    id: 3,
    name: "Financeiro",
    color: "#f59e0b",
    operators: 3,
    openTickets: 6,
    avgResponse: "4m 02s",
    greeting: "Financeiro. Tenha em mãos seu CPF ou CNPJ para agilizar o atendimento.",
  },
  {
    id: 4,
    name: "Contábil",
    color: "#8b5cf6",
    operators: 2,
    openTickets: 3,
    avgResponse: "6m 40s",
    greeting: "Olá, aqui é o time contábil. Como podemos ajudar?",
  },
];

export default function SetoresPage() {
  const toast = useToast();
  const confirm = useConfirm();

  async function del(name: string, tickets: number) {
    const ok = await confirm({
      title: `Excluir setor "${name}"?`,
      description:
        tickets > 0
          ? `Há ${tickets} atendimento(s) aberto(s). Serão reatribuídos automaticamente.`
          : "Esta ação não pode ser desfeita.",
      destructive: true,
      confirmLabel: "Excluir",
    });
    if (ok) toast.success("Setor removido", `"${name}" foi excluído.`);
  }

  return (
    <>
      <Topbar currentLabel="Setores" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Setores"
          description="Crie filas de atendimento por área. Cada setor pode ter saudação, operadores e conexões próprias."
          actions={
            <button
              onClick={() => toast.info("Em breve", "Criação de setor abre um modal com formulário.")}
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" /> Novo setor
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectors.map((s) => (
            <div key={s.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}25` }}
                  >
                    <MessageSquare className="w-5 h-5" style={{ color: s.color }} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="text-xs text-text-muted">Fila #{s.id.toString().padStart(4, "0")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => del(s.name, s.openTickets)}
                    className="p-1.5 rounded hover:bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-white/70 italic mb-4 line-clamp-2">
                &ldquo;{s.greeting}&rdquo;
              </p>

              <div className="grid grid-cols-3 gap-3 text-center pt-3 border-t border-white/5">
                <div>
                  <div className="flex items-center justify-center gap-1 text-text-muted text-[11px]">
                    <Users className="w-3 h-3" /> Operadores
                  </div>
                  <p className="text-base font-bold mt-0.5">{s.operators}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-text-muted text-[11px]">
                    <MessageSquare className="w-3 h-3" /> Abertos
                  </div>
                  <p className="text-base font-bold mt-0.5">{s.openTickets}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-text-muted text-[11px]">
                    <Clock className="w-3 h-3" /> Resposta
                  </div>
                  <p className="text-base font-bold mt-0.5 font-mono">{s.avgResponse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
