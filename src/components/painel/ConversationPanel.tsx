"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Search,
  Paperclip,
  Smile,
  Mic,
  Send,
  Tag,
  CheckCheck,
  Check,
  UserPlus,
  CircleDot,
} from "lucide-react";
import { useToast } from "./ToastProvider";
import { useConfirm } from "./ConfirmProvider";

export type Message = {
  id: number;
  from: "contact" | "operator" | "bot";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: number;
  contact: { name: string; initials: string; color: string; phone: string };
  tag: string;
  sector: string;
  assigned: string;
  messages: Message[];
};

export default function ConversationPanel({
  conv,
  onBack,
}: {
  conv: Conversation;
  onBack?: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>(conv.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const confirm = useConfirm();

  async function resolve() {
    const ok = await confirm({
      title: "Resolver atendimento?",
      description: `O ticket de ${conv.contact.name} será movido para "Resolvidos" e o cliente receberá a pesquisa de satisfação.`,
      confirmLabel: "Resolver",
    });
    if (ok) toast.success("Atendimento resolvido", "CSAT enviado ao cliente.");
  }

  useEffect(() => {
    setMessages(conv.messages);
  }, [conv]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "operator", text, time, status: "sent" },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col h-full bg-background min-w-0">
      {/* Cabeçalho */}
      <div className="h-16 border-b border-white/5 flex items-center gap-3 px-4 bg-card-bg/40">
        {onBack && (
          <button
            onClick={onBack}
            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.04] text-text-muted"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div
          className={`w-10 h-10 rounded-full ${conv.contact.color}/80 flex items-center justify-center text-black font-bold text-sm`}
        >
          {conv.contact.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{conv.contact.name}</p>
          <p className="text-[11px] text-text-muted flex items-center gap-1.5">
            <CircleDot className="w-2.5 h-2.5 text-green-primary" />
            online · {conv.contact.phone}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <span className="text-[10px] font-semibold bg-yellow-400 text-black px-2 py-0.5 rounded">
            {conv.tag}
          </span>
          <span className="text-[10px] text-text-muted px-2">{conv.sector}</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white" title="Buscar na conversa">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white" title="Ligar">
          <Phone className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white" title="Transferir">
          <UserPlus className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white" title="Mais ações">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Mensagens */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-2"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(37,211,102,0.04), transparent 60%)",
        }}
      >
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase tracking-wider bg-white/[0.04] text-text-muted px-3 py-1 rounded-full">
            Hoje
          </span>
        </div>
        {messages.map((m, i) => {
          const mine = m.from === "operator";
          const bot = m.from === "bot";
          const prev = messages[i - 1];
          const grouped = prev && prev.from === m.from;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"} ${grouped ? "mt-0.5" : "mt-2"}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                  mine
                    ? "bg-green-primary/85 text-black rounded-br-md"
                    : bot
                      ? "bg-accent-purple/15 border border-accent-purple/20 text-white/90 rounded-bl-md"
                      : "bg-white/[0.06] text-white/90 rounded-bl-md"
                }`}
              >
                {bot && !grouped && (
                  <p className="text-[10px] font-semibold text-accent-purple mb-0.5">
                    🤖 Bia (bot)
                  </p>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-[10px] ${
                    mine ? "text-black/55 justify-end" : "text-text-muted"
                  }`}
                >
                  <span>{m.time}</span>
                  {mine && (
                    m.status === "read" ? (
                      <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                    ) : m.status === "delivered" ? (
                      <CheckCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Atribuição / tags rápidas */}
      <div className="border-t border-white/5 px-4 py-2 flex items-center gap-2 text-xs text-text-muted bg-card-bg/30 overflow-x-auto">
        <span>Atribuído:</span>
        <span className="bg-white/[0.05] px-2 py-0.5 rounded">{conv.assigned}</span>
        <span className="ml-2">Tags:</span>
        <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded">
          <Tag className="w-3 h-3" /> {conv.tag}
        </span>
        <button
          onClick={resolve}
          className="ml-auto text-green-primary hover:underline whitespace-nowrap"
        >
          Resolver atendimento
        </button>
      </div>

      {/* Composer */}
      <div className="border-t border-white/5 p-3 flex items-center gap-2 bg-card-bg/40">
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white">
          <Smile className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-white">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Digite uma mensagem ou /atalho"
          className="flex-1 bg-white/[0.05] border border-white/[0.06] rounded-full px-4 py-2.5 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40"
        />
        {draft.trim() ? (
          <button
            onClick={send}
            className="p-2.5 rounded-full bg-green-primary text-black hover:bg-green-primary/90"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button className="p-2.5 rounded-full bg-green-primary text-black hover:bg-green-primary/90">
            <Mic className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
