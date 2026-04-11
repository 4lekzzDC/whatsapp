"use client";

export default function DashboardMockup() {
  const conversations = [
    {
      name: "Maria Silva",
      message: "Agendamento confirmado automaticamente",
      status: "Resolvido",
      statusColor: "bg-green-primary",
    },
    {
      name: "João Santos",
      message: "Coletando informações do cliente...",
      status: "Pré-atendimento",
      statusColor: "bg-accent-yellow",
    },
    {
      name: "Ana Costa",
      message: "Transferido para atendente humano",
      status: "Encaminhado",
      statusColor: "bg-accent-blue",
    },
  ];

  const intents = [
    { label: "Agendamento", value: 42, color: "bg-green-primary" },
    { label: "Dúvidas / Suporte", value: 30, color: "bg-accent-blue" },
    { label: "Vendas", value: 18, color: "bg-accent-yellow" },
    { label: "Outros", value: 10, color: "bg-accent-purple" },
  ];

  const stats = [
    { label: "Filtradas", value: "70%", color: "text-green-primary" },
    { label: "Resolução", value: "92%", color: "text-accent-blue" },
    { label: "Hoje", value: "247", color: "text-green-light" },
    { label: "Tempo", value: "8s", color: "text-accent-purple" },
  ];

  return (
    <div className="relative animate-float">
      <div className="absolute -inset-4 bg-green-primary/5 rounded-3xl blur-xl" />
      <div className="relative glass-card rounded-2xl p-5 space-y-4 glow-border max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white/90">Conversas recentes</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
            <span className="text-xs text-green-primary font-mono">Online 24/7</span>
          </div>
        </div>

        {/* Conversations */}
        <div className="space-y-2.5">
          {conversations.map((conv) => (
            <div
              key={conv.name}
              className="bg-white/[0.03] rounded-xl p-3 flex items-center justify-between hover:bg-white/[0.06] transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-white/90">{conv.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{conv.message}</p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${conv.statusColor} text-black`}
              >
                {conv.status}
              </span>
            </div>
          ))}
        </div>

        {/* NLP Intents */}
        <div className="bg-white/[0.03] rounded-xl p-3.5">
          <h4 className="text-xs font-semibold text-white/80 mb-3">
            Intenções detectadas (NLP)
          </h4>
          <div className="space-y-2.5">
            {intents.map((intent) => (
              <div key={intent.label} className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-28 shrink-0">
                  {intent.label}
                </span>
                <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${intent.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${intent.value}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-white/70 w-8 text-right">
                  {intent.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] rounded-xl p-2.5 text-center"
            >
              <p className="text-xs text-text-muted mb-1">{stat.label}</p>
              <p className={`text-lg font-bold font-mono ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
