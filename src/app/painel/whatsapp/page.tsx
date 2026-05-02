"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  X,
  Loader2,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

type ConnStatus = "connected" | "connecting" | "disconnected" | "qr";

type Connection = {
  id: string;
  name: string;
  instance_name: string;
  sector_id: string | null;
  phone: string | null;
  status: ConnStatus;
  last_seen_at: string | null;
  messages_count: number;
  battery: number | null;
  created_at: string;
};

type Sector = { id: string; name: string; color: string | null };

function statusBadge(status: ConnStatus) {
  switch (status) {
    case "connected":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-primary/15 text-green-primary">
          <CheckCircle2 className="w-3.5 h-3.5" /> Conectado
        </span>
      );
    case "connecting":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent-blue/15 text-accent-blue">
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Conectando
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

function relTime(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "agora";
  const min = Math.floor(diff / 60_000);
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function WhatsAppPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [qrFor, setQrFor] = useState<Connection | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/whatsapp/instances", { cache: "no-store" }),
        fetch("/api/whatsapp/sectors", { cache: "no-store" }),
      ]);
      if (!r1.ok) throw new Error((await r1.json()).error || "Erro ao listar conexões");
      const d1 = await r1.json();
      setConnections(d1.connections ?? []);
      if (r2.ok) {
        const d2 = await r2.json();
        setSectors(d2.sectors ?? []);
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 15_000);
    return () => clearInterval(t);
  }, [refresh]);

  async function handleDelete(c: Connection) {
    if (!confirm(`Excluir a conexão "${c.name}"? Essa ação desconecta o WhatsApp.`)) return;
    const r = await fetch(`/api/whatsapp/instances/${c.id}`, { method: "DELETE" });
    if (!r.ok) {
      alert("Falha ao excluir.");
      return;
    }
    refresh();
  }

  async function handleLogout(c: Connection) {
    const r = await fetch(`/api/whatsapp/instances/${c.id}/logout`, { method: "POST" });
    if (!r.ok) alert("Falha ao desconectar.");
    refresh();
  }

  async function handleRestart(c: Connection) {
    const r = await fetch(`/api/whatsapp/instances/${c.id}/restart`, { method: "POST" });
    if (!r.ok) alert("Falha ao reiniciar.");
    refresh();
  }

  const active = connections.filter((c) => c.status === "connected").length;
  const offline = connections.filter((c) => c.status === "disconnected").length;
  const totalMsgs = connections.reduce((s, c) => s + (c.messages_count || 0), 0);

  return (
    <>
      <Topbar currentLabel="Conexões WhatsApp" />

      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Conexões WhatsApp"
          description="Conecte seus números do WhatsApp escaneando o QR Code. Cada conexão pode ser vinculada a um setor."
          actions={
            <button
              onClick={() => setShowNew(true)}
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" /> Nova conexão
            </button>
          }
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Conexões ativas", value: String(active), icon: Wifi, color: "text-green-primary" },
            { label: "Mensagens", value: totalMsgs.toLocaleString("pt-BR"), icon: Smartphone, color: "text-accent-blue" },
            { label: "Desconectadas", value: String(offline), icon: WifiOff, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5 flex items-center justify-between">
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
            <p className="text-xs text-text-muted">
              {loading ? "Carregando…" : `${connections.length} no total`}
            </p>
          </div>

          {connections.length === 0 && !loading && (
            <div className="px-5 py-10 text-center text-sm text-text-muted">
              Nenhuma conexão ainda. Clique em <strong>Nova conexão</strong> para criar a primeira.
            </div>
          )}

          <div className="divide-y divide-white/5">
            {connections.map((c) => {
              const sectorName = sectors.find((s) => s.id === c.sector_id)?.name ?? "—";
              return (
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
                      {c.phone || "número não vinculado"} · Setor: {sectorName}
                    </p>
                  </div>
                  <div className="hidden md:grid grid-cols-2 gap-4 text-center text-xs">
                    <div>
                      <p className="text-text-muted">Mensagens</p>
                      <p className="font-semibold">{c.messages_count.toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Visto</p>
                      <p className="font-semibold">{relTime(c.last_seen_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {c.status !== "connected" ? (
                      <button
                        onClick={() => setQrFor(c)}
                        className="p-2 rounded-lg hover:bg-white/[0.04] text-green-primary"
                        title="Conectar / ver QR"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRestart(c)}
                        className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white"
                        title="Reiniciar"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleLogout(c)}
                      className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white"
                      title="Desconectar"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
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

      {showNew && (
        <NewConnectionModal
          sectors={sectors}
          onClose={() => setShowNew(false)}
          onCreated={(conn) => {
            setShowNew(false);
            refresh();
            setQrFor(conn);
          }}
        />
      )}

      {qrFor && (
        <QrModal
          connection={qrFor}
          onClose={() => {
            setQrFor(null);
            refresh();
          }}
          onConnected={() => {
            refresh();
          }}
        />
      )}
    </>
  );
}

function NewConnectionModal({
  sectors,
  onClose,
  onCreated,
}: {
  sectors: Sector[];
  onClose: () => void;
  onCreated: (c: Connection) => void;
}) {
  const [name, setName] = useState("");
  const [sectorId, setSectorId] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/whatsapp/instances", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: name.trim(), sector_id: sectorId || null }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Falha ao criar conexão");
      onCreated(d.connection as Connection);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro inesperado");
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <form onSubmit={submit} className="glass-card rounded-2xl max-w-md w-full p-6 border border-white/10 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-1">Nova conexão</h3>
        <p className="text-sm text-text-muted mb-5">Dê um nome e (opcional) vincule a um setor.</p>

        <label className="text-xs text-text-muted">Nome</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Atendimento Comercial"
          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm mb-3"
        />

        <label className="text-xs text-text-muted">Setor</label>
        <select
          value={sectorId}
          onChange={(e) => setSectorId(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm mb-4"
        >
          <option value="">— Sem setor —</option>
          {sectors.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        {err && <p className="text-sm text-red-400 mb-3">{err}</p>}

        <button
          type="submit"
          disabled={busy || !name.trim()}
          className="w-full bg-green-primary hover:bg-green-primary/90 disabled:opacity-50 text-black font-semibold px-4 py-2 rounded-lg text-sm inline-flex items-center justify-center gap-2"
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />} Criar e gerar QR
        </button>
      </form>
    </div>
  );
}

function QrModal({
  connection,
  onClose,
  onConnected,
}: {
  connection: Connection;
  onClose: () => void;
  onConnected: () => void;
}) {
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<ConnStatus>(connection.status);
  const [err, setErr] = useState<string | null>(null);
  const stop = useRef(false);

  useEffect(() => {
    stop.current = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    async function tick() {
      if (stop.current) return;
      try {
        const r = await fetch(`/api/whatsapp/instances/${connection.id}/qr`, { cache: "no-store" });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Falha ao obter QR");
        setQr(d.qr ?? null);
        setStatus(d.status as ConnStatus);
        if (d.status === "connected") {
          onConnected();
          return;
        }
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Erro inesperado");
      }
      timer = setTimeout(tick, 3000);
    }
    tick();
    return () => {
      stop.current = true;
      if (timer) clearTimeout(timer);
    };
  }, [connection.id, onConnected]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-white/10 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-1">{connection.name}</h3>
        <p className="text-sm text-text-muted mb-5">
          Abra o WhatsApp › Aparelhos conectados › Conectar aparelho.
        </p>

        <div className="aspect-square bg-white rounded-xl p-4 flex items-center justify-center mb-4 relative overflow-hidden">
          {status === "connected" ? (
            <div className="text-center text-green-primary">
              <CheckCircle2 className="w-16 h-16 mx-auto" />
              <p className="font-semibold mt-2 text-black">Conectado!</p>
            </div>
          ) : qr ? (
            // Evolution returns a data URL or raw base64; normalize
            <img
              src={qr.startsWith("data:") ? qr : `data:image/png;base64,${qr}`}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs">Gerando QR…</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <div className="flex-1 text-xs text-text-muted flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                status === "connected" ? "bg-green-primary" : "bg-accent-yellow animate-pulse"
              }`}
            />
            {status === "connected"
              ? "Sessão ativa."
              : status === "connecting"
              ? "Conectando…"
              : "Aguardando leitura — QR atualiza automaticamente."}
          </div>
        </div>

        {err && <p className="text-xs text-red-400 mt-2">{err}</p>}

        {status === "connected" && (
          <button
            onClick={onClose}
            className="mt-4 w-full bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}
