"use client";

import { BookOpen, MessageCircle, Mail, Play, FileText } from "lucide-react";
import Link from "next/link";
import Topbar from "@/components/painel/Topbar";
import PageHeader from "@/components/painel/PageHeader";

const topics = [
  { icon: Play, title: "Primeiros passos", items: ["Conectar o WhatsApp", "Criar setores", "Convidar operadores"] },
  { icon: MessageCircle, title: "Atendimento", items: ["Respostas rápidas", "Transferência de ticket", "Atendimento simultâneo"] },
  { icon: FileText, title: "Automação", items: ["Criar fluxos", "Usar variáveis", "Condições avançadas"] },
  { icon: BookOpen, title: "Integrações", items: ["Webhooks", "API REST", "CRM e ERP"] },
];

export default function AjudaPage() {
  return (
    <>
      <Topbar currentLabel="Central de Ajuda" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <PageHeader
          title="Central de Ajuda"
          description="Tutoriais, documentação e suporte humano quando você precisar."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {topics.map((t) => (
            <div key={t.title} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-primary/15 flex items-center justify-center">
                  <t.icon className="w-5 h-5 text-green-primary" />
                </div>
                <h3 className="font-semibold">{t.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {t.items.map((i) => (
                  <li key={i}>
                    <a className="text-sm text-white/70 hover:text-white" href="#">
                      › {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div>
            <h3 className="font-semibold mb-1">Precisa falar com a gente?</h3>
            <p className="text-sm text-text-muted">
              Nosso time responde em até 15 minutos no horário comercial.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/contato" className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/80 text-sm px-3 py-2 rounded-lg">
              <Mail className="w-4 h-4" /> E-mail
            </Link>
            <button className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-black font-semibold px-4 py-2 rounded-lg text-sm">
              <MessageCircle className="w-4 h-4" /> Abrir chat
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
