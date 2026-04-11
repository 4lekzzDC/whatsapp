"use client";

import {
  FileText,
  CheckSquare,
  AlertTriangle,
  CreditCard,
  Ban,
  Scale,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Aceitação dos Termos",
    content: [
      "Ao acessar ou utilizar o WhatsApp Bot, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis.",
      "Se você está utilizando o serviço em nome de uma empresa, declara ter autoridade para vincular essa organização a estes termos.",
      "Caso não concorde com qualquer parte destes termos, não utilize nossos serviços.",
      "Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por e-mail com 30 dias de antecedência.",
    ],
  },
  {
    icon: CheckSquare,
    title: "2. Uso Permitido",
    content: [
      "O WhatsApp Bot deve ser utilizado exclusivamente para fins legítimos de atendimento ao cliente e comunicação comercial.",
      "Você é responsável por obter o consentimento prévio dos destinatários antes de enviar mensagens automatizadas.",
      "Todo conteúdo enviado deve estar em conformidade com as políticas do WhatsApp Business e legislação brasileira.",
      "É sua responsabilidade manter a segurança das credenciais de acesso e API keys da sua conta.",
    ],
  },
  {
    icon: Ban,
    title: "3. Restrições de Uso",
    content: [
      "É proibido utilizar a plataforma para envio de spam, mensagens não solicitadas ou conteúdo abusivo.",
      "Não é permitido tentar acessar sistemas ou dados de outros usuários da plataforma.",
      "É vedada a engenharia reversa, descompilação ou tentativa de extrair o código-fonte do serviço.",
      "O uso da plataforma para atividades ilegais, fraudulentas ou que violem direitos de terceiros resultará em suspensão imediata.",
      "Não é permitido revender ou redistribuir o acesso ao serviço sem autorização expressa.",
    ],
  },
  {
    icon: CreditCard,
    title: "4. Pagamento e Assinatura",
    content: [
      "Os planos pagos são cobrados mensalmente ou anualmente, conforme a opção escolhida no momento da contratação.",
      "Preços podem ser reajustados com aviso prévio de 30 dias. Reajustes não se aplicam ao período já contratado.",
      "O cancelamento pode ser feito a qualquer momento pelo painel de controle. O acesso permanece ativo até o fim do período pago.",
      "Reembolsos são concedidos proporcionalmente para cancelamentos nos primeiros 7 dias de contratação.",
      "Em caso de inadimplência, o acesso será suspenso após 15 dias do vencimento.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "5. Limitação de Responsabilidade",
    content: [
      "O WhatsApp Bot é fornecido \"como está\", sem garantias expressas ou implícitas de disponibilidade ininterrupta.",
      "Não nos responsabilizamos por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso do serviço.",
      "Nossa responsabilidade total é limitada ao valor pago pelo cliente nos 12 meses anteriores ao evento.",
      "Não somos responsáveis por ações de terceiros, incluindo a Meta/WhatsApp, que possam afetar o funcionamento do serviço.",
    ],
  },
  {
    icon: Scale,
    title: "6. Disposições Gerais",
    content: [
      "Estes termos são regidos pelas leis da República Federativa do Brasil.",
      "Qualquer disputa será submetida ao foro da comarca de São Paulo, SP, com exclusão de qualquer outro.",
      "A invalidade de qualquer cláusula não afeta a validade das demais disposições destes termos.",
      "A tolerância quanto ao descumprimento de qualquer obrigação não implica em renúncia ao direito de exigi-la posteriormente.",
    ],
  },
];

export default function TermosContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-primary/[0.05] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm text-green-primary font-semibold tracking-wider uppercase">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
            Termos de{" "}
            <span className="gradient-text">Uso</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Condições gerais para utilização da plataforma WhatsApp Bot. Leia
            atentamente antes de usar nossos serviços.
          </p>
          <p className="text-sm text-text-muted mt-6">
            Última atualização: 1 de abril de 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-green-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3 ml-14">
                    {section.content.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-text-muted leading-relaxed flex gap-3"
                      >
                        <span className="text-green-primary mt-1 shrink-0">
                          &bull;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
