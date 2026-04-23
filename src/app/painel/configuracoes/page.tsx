"use client";

import { useState } from "react";
import {
  Building2,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Webhook,
  Bot,
  Clock,
  Save,
} from "lucide-react";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

type Section =
  | "empresa"
  | "atendimento"
  | "horarios"
  | "bot"
  | "notificacoes"
  | "seguranca"
  | "integracoes"
  | "plano";

const menu: { id: Section; label: string; icon: typeof Building2 }[] = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "atendimento", label: "Atendimento", icon: Globe },
  { id: "horarios", label: "Horários", icon: Clock },
  { id: "bot", label: "Bot & IA", icon: Bot },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "integracoes", label: "Integrações / Webhooks", icon: Webhook },
  { id: "plano", label: "Plano & faturamento", icon: CreditCard },
];

export default function ConfiguracoesPage() {
  const [section, setSection] = useState<Section>("empresa");

  return (
    <>
      <Topbar currentLabel="Configurações" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Configurações"
          description="Personalize tudo: da identidade da empresa até regras de atendimento, IA e integrações."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          <nav className="glass-card rounded-xl p-2 h-fit lg:sticky lg:top-20">
            {menu.map((m) => {
              const active = section === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setSection(m.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-green-primary/15 text-green-primary"
                      : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              );
            })}
          </nav>

          <div className="min-w-0">
            {section === "empresa" && <EmpresaForm />}
            {section === "atendimento" && <AtendimentoForm />}
            {section === "horarios" && <HorariosForm />}
            {section === "bot" && <BotForm />}
            {section === "notificacoes" && <NotificacoesForm />}
            {section === "seguranca" && <SegurancaForm />}
            {section === "integracoes" && <IntegracoesForm />}
            {section === "plano" && <PlanoBox />}
          </div>
        </div>
      </main>
    </>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-xl p-6 mb-4">
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-xs text-text-muted mt-1 mb-4">{description}</p>}
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mb-4">
      <span className="text-xs font-medium text-white/80 mb-1.5 block">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-text-muted mt-1 block">{hint}</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40 ${
        props.className ?? ""
      }`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm placeholder:text-text-muted focus:outline-none focus:border-green-primary/40 min-h-24"
    />
  );
}

function Toggle({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ${
          on ? "bg-green-primary" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            on ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="flex justify-end">
      <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
        <Save className="w-4 h-4" /> Salvar alterações
      </button>
    </div>
  );
}

function EmpresaForm() {
  return (
    <>
      <Card title="Identidade da empresa" description="Essas informações aparecem nas mensagens e na marca do painel.">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-primary to-green-dark flex items-center justify-center text-black font-bold text-xl">
            WB
          </div>
          <div>
            <button className="text-sm bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg">
              Enviar logo
            </button>
            <p className="text-[11px] text-text-muted mt-1">PNG ou SVG, até 2MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Razão social"><Input defaultValue="Minha Empresa LTDA" /></Field>
          <Field label="Nome fantasia"><Input defaultValue="Minha Empresa" /></Field>
          <Field label="CNPJ"><Input defaultValue="12.345.678/0001-90" /></Field>
          <Field label="Fuso horário"><Input defaultValue="America/Sao_Paulo (GMT-3)" /></Field>
          <Field label="E-mail de contato"><Input type="email" defaultValue="contato@empresa.com" /></Field>
          <Field label="Site"><Input defaultValue="https://empresa.com" /></Field>
        </div>
      </Card>
      <SaveBar />
    </>
  );
}

function AtendimentoForm() {
  return (
    <>
      <Card title="Regras de atendimento" description="Configure comportamento padrão da fila.">
        <Field label="Distribuição de tickets">
          <select className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40">
            <option>Round-robin (equilibrar entre operadores)</option>
            <option>Manual (supervisor atribui)</option>
            <option>Primeiro disponível</option>
          </select>
        </Field>
        <Field label="Tempo máximo sem resposta do cliente" hint="Após esse tempo o atendimento é encerrado automaticamente.">
          <Input defaultValue="30 minutos" />
        </Field>
        <Field label="Mensagem de encerramento por inatividade">
          <TextArea defaultValue="Encerramos o atendimento por inatividade. Qualquer coisa é só chamar de novo!" />
        </Field>
      </Card>
      <Card title="Ações automáticas">
        <Toggle label="Pesquisa de satisfação" description="Envia um CSAT após resolução do ticket." defaultOn />
        <Toggle label="Tagueamento automático por intenção" description="Usa NLP para marcar o motivo do contato." defaultOn />
        <Toggle label="Encaminhar para humano em caso de dúvida" description="Se o bot não entender duas vezes seguidas." defaultOn />
      </Card>
      <SaveBar />
    </>
  );
}

function HorariosForm() {
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  return (
    <>
      <Card title="Horário de atendimento humano" description="Fora desse horário o bot assume sozinho.">
        <div className="space-y-2">
          {days.map((d, i) => (
            <div key={d} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="w-24 text-sm">{d}</span>
              <Toggle label="" defaultOn={i < 5} />
              <Input className="max-w-28" defaultValue={i < 5 ? "08:00" : "—"} />
              <span className="text-text-muted text-xs">às</span>
              <Input className="max-w-28" defaultValue={i < 5 ? "18:00" : "—"} />
            </div>
          ))}
        </div>
      </Card>
      <Card title="Feriados">
        <p className="text-xs text-text-muted mb-3">Importar calendário brasileiro automático.</p>
        <button className="text-sm bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg">
          Sincronizar feriados nacionais
        </button>
      </Card>
      <SaveBar />
    </>
  );
}

function BotForm() {
  return (
    <>
      <Card title="Bot e inteligência artificial" description="Personalidade, tom e limites do seu assistente.">
        <Field label="Nome do bot"><Input defaultValue="Bia" /></Field>
        <Field label="Personalidade">
          <TextArea defaultValue="Você é a Bia, assistente simpática e objetiva da Minha Empresa. Responda em português do Brasil, com frases curtas. Não invente informações de produto." />
        </Field>
        <Field label="Mensagem de boas-vindas">
          <TextArea defaultValue="Olá! 👋 Sou a Bia, da Minha Empresa. Posso te ajudar com pedidos, suporte ou financeiro. Como posso ajudar hoje?" />
        </Field>
        <Field label="Modelo de IA">
          <select className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-primary/40">
            <option>Claude Opus 4.7 (recomendado)</option>
            <option>Claude Sonnet 4.6</option>
            <option>Claude Haiku 4.5 (econômico)</option>
          </select>
        </Field>
      </Card>
      <Card title="Limites e segurança">
        <Toggle label="Bloquear palavrões e linguagem ofensiva" defaultOn />
        <Toggle label="Pedir confirmação antes de ações críticas" description="Ex.: cancelar pedido, encerrar contrato." defaultOn />
        <Toggle label="Histórico limitado a 30 dias" />
      </Card>
      <SaveBar />
    </>
  );
}

function NotificacoesForm() {
  return (
    <>
      <Card title="Notificações">
        <Toggle label="Novo atendimento atribuído a mim" defaultOn />
        <Toggle label="Cliente respondeu após encerramento" defaultOn />
        <Toggle label="Campanha concluída" defaultOn />
        <Toggle label="Conexão do WhatsApp caiu" defaultOn />
        <Toggle label="Relatório diário por e-mail" />
      </Card>
      <Card title="Canais">
        <Toggle label="Push no navegador" defaultOn />
        <Toggle label="E-mail" defaultOn />
        <Toggle label="Som ao receber nova mensagem" defaultOn />
      </Card>
      <SaveBar />
    </>
  );
}

function SegurancaForm() {
  return (
    <>
      <Card title="Autenticação">
        <Toggle label="Exigir 2FA para admins" defaultOn />
        <Toggle label="Sessão expira após 8h de inatividade" defaultOn />
        <Toggle label="Bloquear login fora do Brasil" />
      </Card>
      <Card title="Permissões">
        <p className="text-xs text-text-muted mb-3">Controle fino por papel.</p>
        <button className="text-sm bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg">
          Gerenciar papéis
        </button>
      </Card>
      <Card title="Logs de auditoria">
        <p className="text-xs text-text-muted mb-3">Últimos 90 dias disponíveis para download.</p>
        <button className="text-sm bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg">
          Exportar CSV
        </button>
      </Card>
    </>
  );
}

function IntegracoesForm() {
  const webhooks = [
    { event: "ticket.created", url: "https://erp.empresa.com/hooks/wa" },
    { event: "message.received", url: "https://crm.empresa.com/inbound" },
  ];
  return (
    <>
      <Card title="Webhooks" description="Receba eventos em tempo real no seu sistema.">
        <div className="space-y-2 mb-4">
          {webhooks.map((w) => (
            <div key={w.event} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-2">
              <div>
                <p className="text-xs font-mono text-green-primary">{w.event}</p>
                <p className="text-xs text-text-muted">{w.url}</p>
              </div>
              <button className="text-xs text-red-400 hover:underline">Remover</button>
            </div>
          ))}
        </div>
        <button className="text-sm bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg">
          Adicionar webhook
        </button>
      </Card>
      <Card title="API Keys">
        <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 font-mono text-xs">
          <span className="text-green-primary">wb_live_</span>
          <span className="text-text-muted">•••••••••••••••••••••••</span>
          <button className="ml-auto text-xs text-green-primary hover:underline">Revelar</button>
        </div>
      </Card>
      <Card title="Integrações nativas">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["HubSpot", "Pipedrive", "RD Station", "Shopify", "Zapier", "Google Sheets"].map((n) => (
            <button key={n} className="text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg py-3 px-2">
              {n}
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}

function PlanoBox() {
  return (
    <>
      <Card title="Plano atual">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold bg-green-primary/15 text-green-primary px-2 py-1 rounded-full">
              Plano Pro
            </p>
            <p className="text-2xl font-bold mt-2">R$ 297<span className="text-sm text-text-muted">/mês</span></p>
            <p className="text-xs text-text-muted">Próxima cobrança em 18/05/2026.</p>
          </div>
          <button className="bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
            Fazer upgrade
          </button>
        </div>
      </Card>
      <Card title="Uso do mês">
        <div className="space-y-4">
          {[
            { label: "Mensagens enviadas", used: 2340, total: 10000 },
            { label: "Contatos", used: 814, total: 5000 },
            { label: "Conexões WhatsApp", used: 3, total: 5 },
          ].map((u) => (
            <div key={u.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{u.label}</span>
                <span className="font-mono text-text-muted">{u.used.toLocaleString("pt-BR")} / {u.total.toLocaleString("pt-BR")}</span>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-green-primary rounded-full" style={{ width: `${(u.used / u.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Faturas">
        <div className="divide-y divide-white/5">
          {["18/04/2026", "18/03/2026", "18/02/2026"].map((d) => (
            <div key={d} className="flex items-center justify-between py-2.5">
              <span className="text-sm">Fatura {d}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/80">R$ 297,00</span>
                <button className="text-xs text-green-primary hover:underline">Baixar PDF</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
