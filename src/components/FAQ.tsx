"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Como funciona a integração com o WhatsApp?",
    answer:
      "Utilizamos a API oficial do WhatsApp Business para garantir estabilidade e conformidade. A integração é feita em poucos minutos, basta conectar seu número comercial à nossa plataforma.",
  },
  {
    question: "Preciso de conhecimento técnico para configurar?",
    answer:
      "Não! Nossa plataforma foi desenvolvida para ser intuitiva. Você configura os fluxos de atendimento via interface visual, sem necessidade de programação. Oferecemos também templates prontos para começar rapidamente.",
  },
  {
    question: "Qual a precisão do NLP na classificação de intenções?",
    answer:
      "Nosso modelo de NLP alcança uma precisão média de 92% na detecção de intenções. O sistema aprende continuamente com as interações, melhorando sua acurácia ao longo do tempo.",
  },
  {
    question: "É possível transferir o atendimento para um humano?",
    answer:
      "Sim! O bot identifica automaticamente quando uma conversa precisa de intervenção humana e transfere com todo o histórico e contexto para o atendente, garantindo continuidade no atendimento.",
  },
  {
    question: "Os dados dos clientes estão seguros?",
    answer:
      "Absolutamente. Utilizamos criptografia ponta a ponta, servidores com certificação ISO 27001 e estamos em total conformidade com a LGPD. Seus dados e os dos seus clientes estão protegidos.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, não há fidelidade ou multa contratual. Você pode cancelar, fazer upgrade ou downgrade do seu plano a qualquer momento diretamente pelo painel.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
          <p className="text-text-muted text-lg">
            Tire suas dúvidas sobre o WhatsApp Bot.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden transition-all hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-white/90 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-sm text-text-muted leading-relaxed px-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
