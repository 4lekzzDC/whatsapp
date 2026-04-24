"use client";

import Link from "next/link";
import { Plus, Workflow, Play, Pause, Edit2, Copy, Trash2, ArrowRight } from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";
import { useToast } from "@/components/painel/ToastProvider";
import { useConfirm } from "@/components/painel/ConfirmProvider";

const flows = [
  {
    id: 1,
    name: "Triagem inicial",
    description: "Identifica a intenção e encaminha para o setor correto.",
    active: true,
    steps: 6,
    runs: 4123,
  },
  {
    id: 2,
    name: "Pós-venda",
    description: "Envia pesquisa de satisfação após atendimento resolvido.",
    active: true,
    steps: 3,
    runs: 812,
  },
  {
    id: 3,
    name: "Recuperação de carrinho",
    description: "Disparado quando o cliente inicia uma compra e não conclui.",
    active: false,
    steps: 5,
    runs: 145,
  },
];

export default function FluxosPage() {
  const toast = useToast();
  const confirm = useConfirm();

  async function remove(name: string) {
    const ok = await confirm({
      title: `Excluir fluxo "${name}"?`,
      description: "Ao excluir, mensagens que dependiam dele deixam de ser respondidas automaticamente.",
      destructive: true,
      confirmLabel: "Excluir",
    });
    if (ok) toast.success("Fluxo excluído");
  }

  function togglePause(name: string, active: boolean) {
    toast.info(active ? "Fluxo pausado" : "Fluxo ativado", name);
  }

  function duplicate(name: string) {
    toast.success("Fluxo duplicado", `"${name} (cópia)" está como rascunho.`);
  }

  return (
    <>
      <Topbar currentLabel="Fluxos" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Fluxos automáticos"
          description="Desenhe conversas com gatilhos, condições e respostas dinâmicas. Publique em poucos cliques."
          actions={
            <Link
              href="/painel/fluxos/editor"
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" /> Novo fluxo
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {flows.map((f) => (
            <div key={f.id} className="glass-card rounded-xl p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/15 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-accent-purple" />
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full ${
                    f.active
                      ? "bg-green-primary/15 text-green-primary"
                      : "bg-white/[0.05] text-text-muted"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${f.active ? "bg-green-primary" : "bg-text-muted"}`} />
                  {f.active ? "Ativo" : "Pausado"}
                </span>
              </div>

              <h3 className="font-semibold mb-1">{f.name}</h3>
              <p className="text-sm text-text-muted flex-1">{f.description}</p>

              <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/5 text-xs text-text-muted">
                <span>{f.steps} etapas</span>
                <span>•</span>
                <span>{f.runs.toLocaleString("pt-BR")} execuções</span>
              </div>

              <div className="flex items-center gap-1 mt-3">
                <Link
                  href="/painel/fluxos/editor"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs bg-white/[0.04] hover:bg-white/[0.06] py-1.5 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Editar
                </Link>
                <button
                  onClick={() => togglePause(f.name, f.active)}
                  className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted hover:text-white"
                  title={f.active ? "Pausar" : "Ativar"}
                >
                  {f.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => duplicate(f.name)}
                  className="p-1.5 rounded hover:bg-white/[0.04] text-text-muted hover:text-white"
                  title="Duplicar"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(f.name)}
                  className="p-1.5 rounded hover:bg-red-500/10 text-red-400"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold mb-1">Pré-visualização do editor visual</h3>
          <p className="text-xs text-text-muted mb-5">Monte conversas arrastando blocos. Conecte gatilhos às ações.</p>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {[
              { label: "Mensagem recebida", color: "bg-green-primary/20 text-green-primary" },
              { label: "Detectar intenção", color: "bg-accent-blue/20 text-accent-blue" },
              { label: "Pergunta", color: "bg-accent-yellow/20 text-accent-yellow" },
              { label: "Condição", color: "bg-accent-purple/20 text-accent-purple" },
              { label: "Encaminhar para humano", color: "bg-green-primary/20 text-green-primary" },
            ].map((b, i, arr) => (
              <div key={b.label} className="flex items-center gap-2">
                <div className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${b.color}`}>
                  {b.label}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
