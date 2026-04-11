"use client";

const stats = [
  { value: "10k+", label: "Mensagens processadas por dia" },
  { value: "92%", label: "Taxa de resolução automática" },
  { value: "8s", label: "Tempo médio de resposta" },
  { value: "24/7", label: "Disponibilidade do sistema" },
];

export default function Stats() {
  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl glow-border p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
