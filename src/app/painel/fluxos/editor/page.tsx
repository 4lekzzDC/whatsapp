"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Split,
  Zap,
  UserCheck,
  PlayCircle,
  Trash2,
  Save,
  Play,
  Plus,
  Move,
  Tag,
  Clock,
  Webhook,
  Keyboard,
} from "lucide-react";
import { useToast } from "@/components/painel/ToastProvider";
import { useConfirm } from "@/components/painel/ConfirmProvider";

type NodeType =
  | "trigger"
  | "message"
  | "question"
  | "condition"
  | "action"
  | "delay"
  | "tag"
  | "webhook"
  | "handoff";

type NodeData = {
  label: string;
  text?: string;
  variable?: string;
  condition?: string;
  delay?: string;
  tag?: string;
  url?: string;
  sector?: string;
};

type FlowNode = {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  data: NodeData;
};

type FlowEdge = {
  id: string;
  from: string; // node id
  to: string; // node id
  label?: string;
};

const NODE_W = 220;
const NODE_H = 92;

const nodeMeta: Record<
  NodeType,
  { label: string; icon: typeof MessageSquare; color: string; description: string }
> = {
  trigger: { label: "Gatilho", icon: PlayCircle, color: "#25D366", description: "Mensagem inicial recebida" },
  message: { label: "Mensagem", icon: MessageSquare, color: "#3b82f6", description: "Enviar mensagem ao contato" },
  question: { label: "Pergunta", icon: Zap, color: "#f59e0b", description: "Fazer pergunta e salvar resposta" },
  condition: { label: "Condição", icon: Split, color: "#8b5cf6", description: "Ramificar por regra" },
  action: { label: "Ação", icon: Zap, color: "#06b6d4", description: "Executar ação interna" },
  delay: { label: "Atraso", icon: Clock, color: "#a855f7", description: "Esperar antes de continuar" },
  tag: { label: "Tag", icon: Tag, color: "#ec4899", description: "Adicionar tag ao contato" },
  webhook: { label: "Webhook", icon: Webhook, color: "#0ea5e9", description: "Chamar URL externa" },
  handoff: { label: "Humano", icon: UserCheck, color: "#22c55e", description: "Encaminhar para operador" },
};

const initialNodes: FlowNode[] = [
  { id: "n1", type: "trigger", x: 80, y: 120, data: { label: "Nova mensagem" } },
  { id: "n2", type: "message", x: 360, y: 80, data: { label: "Boas-vindas", text: "Olá! 👋 Sou a Bia, da Minha Empresa. Como posso ajudar hoje?" } },
  { id: "n3", type: "question", x: 360, y: 220, data: { label: "Qual é seu assunto?", variable: "assunto", text: "Sobre o que você gostaria de falar?" } },
  { id: "n4", type: "condition", x: 640, y: 220, data: { label: "Tipo de assunto", condition: "assunto contém 'boleto' ou 'financeiro'" } },
  { id: "n5", type: "handoff", x: 920, y: 140, data: { label: "Enviar ao financeiro", sector: "Financeiro" } },
  { id: "n6", type: "handoff", x: 920, y: 300, data: { label: "Enviar ao comercial", sector: "Comercial" } },
];

const initialEdges: FlowEdge[] = [
  { id: "e1", from: "n1", to: "n2" },
  { id: "e2", from: "n2", to: "n3" },
  { id: "e3", from: "n3", to: "n4" },
  { id: "e4", from: "n4", to: "n5", label: "sim" },
  { id: "e5", from: "n4", to: "n6", label: "não" },
];

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function FlowEditorPage() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const toast = useToast();
  const confirm = useConfirm();

  const selected = useMemo(
    () => nodes.find((n) => n.id === selectedId) ?? null,
    [nodes, selectedId]
  );

  const onPointerMove = useCallback((e: PointerEvent) => {
    const d = dragging.current;
    if (!d || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - d.dx + canvasRef.current.scrollLeft;
    const y = e.clientY - rect.top - d.dy + canvasRef.current.scrollTop;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === d.id ? { ...n, x: Math.max(0, x), y: Math.max(0, y) } : n
      )
    );
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  function startDrag(e: React.PointerEvent, node: FlowNode) {
    if ((e.target as HTMLElement).closest("[data-port]")) return;
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    dragging.current = {
      id: node.id,
      dx: e.clientX - rect.left + canvasRef.current.scrollLeft - node.x,
      dy: e.clientY - rect.top + canvasRef.current.scrollTop - node.y,
    };
    setSelectedId(node.id);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function addNode(type: NodeType) {
    const base: FlowNode = {
      id: uid("n"),
      type,
      x: 200 + Math.random() * 200,
      y: 400 + Math.random() * 100,
      data: { label: nodeMeta[type].label },
    };
    setNodes((prev) => [...prev, base]);
    setSelectedId(base.id);
    toast.info("Bloco adicionado", `${nodeMeta[type].label} pronto para configurar.`);
  }

  async function deleteNode(id: string) {
    const node = nodes.find((n) => n.id === id);
    const ok = await confirm({
      title: "Excluir bloco?",
      description: node
        ? `"${node.data.label}" e suas conexões serão removidos do fluxo.`
        : "As conexões também serão removidas.",
      destructive: true,
      confirmLabel: "Excluir",
    });
    if (!ok) return;
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.from !== id && e.to !== id));
    setSelectedId(null);
    toast.success("Bloco removido");
  }

  function save() {
    toast.success("Fluxo salvo", `${nodes.length} blocos e ${edges.length} conexões.`);
  }

  function onPortClick(nodeId: string, kind: "out" | "in") {
    if (kind === "out") {
      setConnectingFrom(nodeId);
      return;
    }
    if (connectingFrom && connectingFrom !== nodeId) {
      setEdges((prev) => [
        ...prev.filter((e) => !(e.from === connectingFrom && e.to === nodeId)),
        { id: uid("e"), from: connectingFrom, to: nodeId },
      ]);
      toast.success("Conexão criada");
    }
    setConnectingFrom(null);
  }

  function updateSelected(patch: Partial<NodeData>) {
    if (!selectedId) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedId ? { ...n, data: { ...n.data, ...patch } } : n))
    );
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
        return;
      }
      if (typing) return;
      if (e.key === "Escape") {
        setSelectedId(null);
        setConnectingFrom(null);
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault();
        deleteNode(selectedId);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, nodes, edges]);

  // Dimensões do canvas
  const width = Math.max(1400, ...nodes.map((n) => n.x + NODE_W + 200));
  const height = Math.max(800, ...nodes.map((n) => n.y + NODE_H + 200));

  return (
    <div className="flex flex-col h-screen">
      {/* Header do editor */}
      <div className="h-14 border-b border-white/5 bg-card-bg/70 backdrop-blur-md flex items-center gap-3 px-4">
        <Link
          href="/painel/fluxos"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Fluxos
        </Link>
        <span className="text-text-muted">/</span>
        <input
          defaultValue="Triagem inicial"
          className="bg-transparent text-sm font-semibold focus:outline-none focus:bg-white/[0.04] px-2 py-1 rounded"
        />
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-green-primary/15 text-green-primary px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-primary" /> Publicado
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => toast.info("Modo de teste", "Digite 'oi' para ver o fluxo responder.")}
            className="inline-flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-white/80 text-sm px-3 py-1.5 rounded-lg"
          >
            <Play className="w-3.5 h-3.5" /> Testar
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-1.5 bg-green-primary hover:bg-green-primary/90 text-black font-semibold text-sm px-3 py-1.5 rounded-lg"
            title="Salvar (Ctrl/Cmd + S)"
          >
            <Save className="w-3.5 h-3.5" /> Salvar
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Paleta */}
        <aside className="w-56 shrink-0 border-r border-white/5 bg-card-bg/40 p-3 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold px-2 mb-2">
            Blocos
          </p>
          <div className="space-y-1">
            {(Object.keys(nodeMeta) as NodeType[]).map((t) => {
              const m = nodeMeta[t];
              const Icon = m.icon;
              return (
                <button
                  key={t}
                  onClick={() => addNode(t)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/[0.04] text-left group"
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${m.color}25` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{m.label}</p>
                    <p className="text-[10px] text-text-muted truncate">{m.description}</p>
                  </div>
                  <Plus className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>

          <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-[11px] text-text-muted">
            <p className="text-white/80 font-medium mb-1 flex items-center gap-1">
              <Move className="w-3 h-3" /> Dicas
            </p>
            <ul className="space-y-1 list-disc pl-4">
              <li>Arraste um nó para mover.</li>
              <li>Clique no ponto verde à direita e depois no azul de outro nó para conectar.</li>
              <li>Selecione um nó para editar à direita.</li>
            </ul>
          </div>

          <div className="mt-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-[11px] text-text-muted">
            <p className="text-white/80 font-medium mb-2 flex items-center gap-1">
              <Keyboard className="w-3 h-3" /> Atalhos
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-center justify-between">
                Salvar <kbd className="text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">⌘S</kbd>
              </li>
              <li className="flex items-center justify-between">
                Excluir selecionado <kbd className="text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">Del</kbd>
              </li>
              <li className="flex items-center justify-between">
                Desselecionar <kbd className="text-[10px] font-mono bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">Esc</kbd>
              </li>
            </ul>
          </div>
        </aside>

        {/* Canvas */}
        <div
          ref={canvasRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedId(null);
              setConnectingFrom(null);
            }
          }}
          className="flex-1 relative overflow-auto bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]"
        >
          <div
            className="relative"
            style={{ width, height }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedId(null);
                setConnectingFrom(null);
              }
            }}
          >
            {/* Arestas (SVG) */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={width}
              height={height}
            >
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="#25D366" />
                </marker>
              </defs>
              {edges.map((e) => {
                const from = nodes.find((n) => n.id === e.from);
                const to = nodes.find((n) => n.id === e.to);
                if (!from || !to) return null;
                const x1 = from.x + NODE_W;
                const y1 = from.y + NODE_H / 2;
                const x2 = to.x;
                const y2 = to.y + NODE_H / 2;
                const dx = Math.max(40, (x2 - x1) / 2);
                const d = `M ${x1} ${y1} C ${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
                return (
                  <g key={e.id}>
                    <path d={d} stroke="#25D366" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" opacity={0.75} />
                    {e.label && (
                      <g>
                        <rect
                          x={(x1 + x2) / 2 - 16}
                          y={(y1 + y2) / 2 - 10}
                          width={32}
                          height={18}
                          rx={9}
                          fill="#111"
                          stroke="#25D366"
                          strokeWidth={1}
                          opacity={0.9}
                        />
                        <text
                          x={(x1 + x2) / 2}
                          y={(y1 + y2) / 2 + 4}
                          textAnchor="middle"
                          fontSize={10}
                          fill="#25D366"
                          fontWeight={600}
                        >
                          {e.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nós */}
            {nodes.map((node) => {
              const meta = nodeMeta[node.type];
              const Icon = meta.icon;
              const active = selectedId === node.id;
              const connectingOut = connectingFrom === node.id;
              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => startDrag(e, node)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(node.id);
                  }}
                  className={`absolute select-none rounded-xl border bg-card-bg/90 backdrop-blur-sm shadow-xl transition-shadow cursor-grab active:cursor-grabbing ${
                    active ? "ring-2 ring-green-primary shadow-green-primary/30" : "border-white/10"
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                    width: NODE_W,
                    height: NODE_H,
                  }}
                >
                  <div
                    className="h-2 rounded-t-xl"
                    style={{ backgroundColor: meta.color }}
                  />
                  <div className="p-3 flex items-start gap-2.5">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${meta.color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: meta.color }} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">
                        {meta.label}
                      </p>
                      <p className="text-sm font-semibold truncate">{node.data.label}</p>
                      {node.data.text && (
                        <p className="text-[11px] text-text-muted truncate mt-0.5">
                          {node.data.text}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Input port (esquerda) — trigger não tem */}
                  {node.type !== "trigger" && (
                    <button
                      data-port
                      onClick={(e) => {
                        e.stopPropagation();
                        onPortClick(node.id, "in");
                      }}
                      className={`absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-transform ${
                        connectingFrom && connectingFrom !== node.id
                          ? "bg-accent-blue border-white animate-pulse scale-125"
                          : "bg-accent-blue border-white/80 hover:scale-125"
                      }`}
                      title="Entrada"
                    />
                  )}
                  {/* Output port (direita) */}
                  <button
                    data-port
                    onClick={(e) => {
                      e.stopPropagation();
                      onPortClick(node.id, "out");
                    }}
                    className={`absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-transform ${
                      connectingOut
                        ? "bg-green-primary border-white animate-pulse scale-125"
                        : "bg-green-primary border-white/80 hover:scale-125"
                    }`}
                    title="Saída"
                  />
                </div>
              );
            })}
          </div>

          {connectingFrom && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-primary/20 border border-green-primary text-green-primary text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur">
              Clique no ponto azul de um nó para conectar · <button onClick={() => setConnectingFrom(null)} className="underline ml-1">cancelar</button>
            </div>
          )}
        </div>

        {/* Inspector */}
        <aside className="w-72 shrink-0 border-l border-white/5 bg-card-bg/40 overflow-y-auto">
          {selected ? (
            <Inspector
              node={selected}
              onChange={updateSelected}
              onDelete={() => deleteNode(selected.id)}
            />
          ) : (
            <div className="p-4 text-xs text-text-muted">
              <p className="text-white/80 font-medium text-sm mb-2">Nenhum bloco selecionado</p>
              <p>Clique em um nó no canvas para editar suas propriedades aqui.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Inspector({
  node,
  onChange,
  onDelete,
}: {
  node: FlowNode;
  onChange: (patch: Partial<NodeData>) => void;
  onDelete: () => void;
}) {
  const meta = nodeMeta[node.type];
  const Icon = meta.icon;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${meta.color}25` }}
        >
          <Icon className="w-4 h-4" style={{ color: meta.color }} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-text-muted uppercase tracking-wider">Bloco</p>
          <p className="text-sm font-semibold">{meta.label}</p>
        </div>
        <button
          onClick={onDelete}
          className="p-1.5 rounded hover:bg-red-500/10 text-red-400"
          title="Excluir"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <Field label="Rótulo">
        <input
          value={node.data.label}
          onChange={(e) => onChange({ label: e.target.value })}
          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40"
        />
      </Field>

      {(node.type === "message" || node.type === "question") && (
        <Field label={node.type === "question" ? "Pergunta" : "Mensagem"}>
          <textarea
            value={node.data.text ?? ""}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Use {{nome}}, {{empresa}}..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm min-h-24 focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "question" && (
        <Field label="Salvar resposta em" hint="A resposta ficará acessível nos próximos blocos como {{variável}}.">
          <input
            value={node.data.variable ?? ""}
            onChange={(e) => onChange({ variable: e.target.value })}
            placeholder="assunto"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "condition" && (
        <Field label="Condição">
          <textarea
            value={node.data.condition ?? ""}
            onChange={(e) => onChange({ condition: e.target.value })}
            placeholder="assunto contém 'boleto'"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm min-h-16 font-mono focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "delay" && (
        <Field label="Esperar">
          <input
            value={node.data.delay ?? ""}
            onChange={(e) => onChange({ delay: e.target.value })}
            placeholder="5 minutos"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "tag" && (
        <Field label="Tag a adicionar">
          <input
            value={node.data.tag ?? ""}
            onChange={(e) => onChange({ tag: e.target.value })}
            placeholder="Cliente VIP"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "webhook" && (
        <Field label="URL">
          <input
            value={node.data.url ?? ""}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://api.seusistema.com/hook"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-green-primary/40"
          />
        </Field>
      )}

      {node.type === "handoff" && (
        <Field label="Setor de destino">
          <select
            value={node.data.sector ?? "Comercial"}
            onChange={(e) => onChange({ sector: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40"
          >
            <option>Comercial</option>
            <option>Financeiro</option>
            <option>Suporte</option>
            <option>Contábil</option>
          </select>
        </Field>
      )}

      {node.type === "trigger" && (
        <Field label="Disparado quando">
          <select
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40"
            defaultValue="Mensagem recebida"
          >
            <option>Mensagem recebida</option>
            <option>Novo contato</option>
            <option>Palavra-chave detectada</option>
            <option>Ticket resolvido</option>
          </select>
        </Field>
      )}

      <div className="pt-3 border-t border-white/5 text-[11px] text-text-muted">
        <p>
          ID: <code className="font-mono text-white/70">{node.id}</code>
        </p>
        <p>
          Posição:{" "}
          <code className="font-mono text-white/70">
            {Math.round(node.x)}, {Math.round(node.y)}
          </code>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-white/80 mb-1.5 block">{label}</span>
      {children}
      {hint && <span className="text-[10px] text-text-muted mt-1 block">{hint}</span>}
    </label>
  );
}
