"use client";

import { useState } from "react";
import {
  Smartphone,
  Plus,
  QrCode,
  RefreshCw,
  Trash2,
  Power,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Copy,
  X,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";
import { useToast } from "@/components/painel/ToastProvider";
import { useConfirm } from "@/components/painel/ConfirmProvider";

type ConnStatus = "connected" | "disconnected" | "qr";

const initialConnections: {
  id: number;
  name: string;
  phone: string;
  sector: string;
  status: ConnStatus;
  battery: number;
  messages: number;
  lastSeen: string;
}[] = [
  {
    id: 1,
    name: "itamarathy 1",
    phone: "+55 51 9 9876-5432",
    sector: "Comercial",
    status: "connected",
    battery: 78,
    messages: 1482,
    lastSeen: "agora",
  },
  {
    id: 2,
    name: "itamarathy 2",
    phone: "+55 51 9 1234-0000",
    sector: "Suporte",
    status: "connected",
    battery: 54,
    messages: 923,
    lastSeen: "agora",
  },
  {
    id: 3,
    name: "Financeiro",
    phone: "+55 51 9 7777-1111",
    sector: "Financeiro",
    status: "disconnected",
    battery: 0,
    messages: 210,
    lastSeen: "há 12 min",
  },
];

function statusBadge(status: ConnStatus) {
  switch (status) {
    case "connected":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-primary/15 text-green-primary">
          <CheckCircle2 className="w-3.5 h-3.5" /> Conectado
        </span>
      );
    case "disconnected":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-red-500/15 text-red-400">
          <AlertCircle className="w-3.5 h-3.5" /> Desconectado
        </span>
      );
    case "qr":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent-yellow/15 text-accent-yellow">
          <QrCode className="w-3.5 h-3.5" /> Aguardando QR
        </span>
      );
  }
}

export default function WhatsAppPage() {
  const [connections, setConnections] = useState(initialConnections);
  const [showQr, setShowQr] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  async function removeConnection(id: number) {
    const c = connections.find((x) => x.id === id);
    const ok = await confirm({
      title: "Excluir conexão?",
      description: c
        ? `O número ${c.phone} (${c.name}) será desvinculado. Tickets em andamento não serão afetados.`
        : undefined,
      destructive: true,
      confirmLabel: "Excluir",
    });
    if (!ok) return;
    setConnections((prev) => prev.filter((x) => x.id !== id));
    toast.success("Conexão removida");
  }

  function restart(id: number) {
    const c = connections.find((x) => x.id === id);
    toast.info("Reiniciando…", c ? `Socket de ${c.name} será reconectado.` : undefined);
  }

  return (
    <>
      <Topbar currentLabel="Conexões WhatsApp" />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Conexões WhatsApp"
          description="Conecte seus números do WhatsApp escaneando o QR Code. Cada conexão pode ser vinculada a um setor."
          actions={
            <button
              onClick={() => setShowQr(true)}
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" /> Nova conexão
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Conexões ativas", value: "2", icon: Wifi, color: "text-green-primary" },
            { label: "Mensagens hoje", value: "2.615", icon: Smartphone, color: "text-accent-blue" },
            { label: "Desconectadas", value: "1", icon: WifiOff, color: "text-red-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-card rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-text-muted">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
              <s.icon className={`w-8 h-8 ${s.color} opacity-70`} />
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Suas conexões</h2>
            <p className="text-xs text-text-muted">{connections.length} no total</p>
          </div>
          <div className="divide-y divide-white/5">
            {connections.map((c) => (
              <div
                key={c.id}
                className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    c.status === "connected"
                      ? "bg-green-primary/15 text-green-primary"
                      : "bg-white/5 text-text-muted"
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{c.name}</p>
                    {statusBadge(c.status)}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 font-mono">
                    {c.phone} · Setor: {c.sector}
                  </p>
                </div>
                <div className="hidden md:grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <p className="text-text-muted">Bateria</p>
                    <p className="font-semibold">{c.battery}%</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Mensagens</p>
                    <p className="font-semibold">{c.messages}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Visto</p>
                    <p className="font-semibold">{c.lastSeen}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {c.status === "disconnected" ? (
                    <button
                      onClick={() => setShowQr(true)}
                      className="p-2 rounded-lg hover:bg-white/[0.04] text-green-primary"
                      title="Reconectar"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => restart(c.id)}
                      className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white"
                      title="Reiniciar"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => toast.info("Sessão encerrada", `${c.name} ficará offline.`)}
                    className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white"
                    title="Desligar"
                  >
                    <Power className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeConnection(c.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-3">Como conectar</h3>
          <ol className="space-y-2 text-sm text-white/80 list-decimal pl-5">
            <li>No WhatsApp do celular, abra <strong>Configurações › Aparelhos conectados</strong>.</li>
            <li>Toque em <strong>Conectar um aparelho</strong> e autentique.</li>
            <li>Clique em <em>Nova conexão</em> aqui e aponte a câmera para o QR Code.</li>
            <li>Mantenha o celular online. A sessão fica ativa enquanto o aparelho tiver internet.</li>
          </ol>
        </div>
      </main>

      {showQr && <QrModal onClose={() => setShowQr(false)} />}
    </>
  );
}

function QrModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-white/10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-1">Escaneie o QR Code</h3>
        <p className="text-sm text-text-muted mb-5">
          Abra o WhatsApp › Aparelhos conectados › Conectar aparelho.
        </p>

        <div className="aspect-square bg-white rounded-xl p-4 flex items-center justify-center mb-4 relative">
          <FakeQr />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-green-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.92C22 6.45 17.54 2 12.04 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 text-xs text-text-muted flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
            Aguardando leitura — expira em 00:42
          </div>
          <button className="text-xs text-green-primary hover:underline flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Gerar novo
          </button>
        </div>

        <div className="border-t border-white/5 pt-4">
          <p className="text-xs text-text-muted mb-2">Ou vincule com código:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm font-mono tracking-widest">
              WB23-KP9M-77FX
            </code>
            <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeQr() {
  // Deterministic pseudo-random pattern so it looks like a QR code without being one.
  const cells: boolean[] = [];
  let seed = 9301;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  return (
    <div className="grid grid-cols-21 gap-0 w-full h-full" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
      {cells.map((on, i) => {
        const row = Math.floor(i / 21);
        const col = i % 21;
        const inFinder =
          (row < 7 && col < 7) ||
          (row < 7 && col > 13) ||
          (row > 13 && col < 7);
        const finderBlack =
          inFinder &&
          (row === 0 || row === 6 || col === 0 || col === 6 ||
            (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
            (row >= 14 && row <= 20 && col === 0) || (row >= 14 && row <= 20 && col === 6) ||
            (col >= 14 && col <= 20 && row === 0) || (col >= 14 && col <= 20 && row === 6));
        const fill = inFinder ? finderBlack : on;
        return (
          <div
            key={i}
            className={fill ? "bg-black" : "bg-white"}
            style={{ aspectRatio: "1 / 1" }}
          />
        );
      })}
    </div>
  );
}
