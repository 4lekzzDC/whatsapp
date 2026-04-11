"use client";

import { Shield, Eye, Lock, Server, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "1. Informações que Coletamos",
    content: [
      "Dados de cadastro: nome, e-mail, telefone e informações da empresa fornecidos no momento do registro.",
      "Dados de uso: informações sobre como você interage com nossa plataforma, incluindo páginas acessadas, funcionalidades utilizadas e horários de acesso.",
      "Dados de comunicação: conteúdo das mensagens processadas pelo bot para fins de funcionamento do serviço, armazenadas de forma criptografada.",
      "Dados técnicos: endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo para fins de segurança e melhoria do serviço.",
    ],
  },
  {
    icon: UserCheck,
    title: "2. Como Usamos seus Dados",
    content: [
      "Fornecer, manter e melhorar nossos serviços de automação de WhatsApp.",
      "Processar e entregar mensagens automatizadas conforme configurado pelo cliente.",
      "Gerar relatórios e analytics de performance do atendimento.",
      "Enviar comunicações sobre atualizações, manutenções e novidades relevantes do serviço.",
      "Garantir a segurança da plataforma e prevenir fraudes ou uso indevido.",
    ],
  },
  {
    icon: Lock,
    title: "3. Proteção dos Dados",
    content: [
      "Utilizamos criptografia AES-256 para dados em repouso e TLS 1.3 para dados em trânsito.",
      "Acesso aos dados é restrito a funcionários autorizados com autenticação multifator (MFA).",
      "Realizamos auditorias de segurança regulares e testes de penetração trimestrais.",
      "Mantemos backups criptografados em data centers certificados ISO 27001 localizados no Brasil.",
    ],
  },
  {
    icon: Server,
    title: "4. Compartilhamento de Dados",
    content: [
      "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.",
      "Podemos compartilhar dados com prestadores de serviço essenciais (hospedagem, CDN) sob acordos de confidencialidade.",
      "Dados podem ser divulgados quando exigido por lei, ordem judicial ou para proteger nossos direitos legais.",
      "Em caso de fusão ou aquisição, os dados serão transferidos com as mesmas proteções desta política.",
    ],
  },
  {
    icon: UserCheck,
    title: "5. Seus Direitos",
    content: [
      "Acessar e obter cópia dos seus dados pessoais armazenados em nossa plataforma.",
      "Solicitar a correção de dados incompletos, inexatos ou desatualizados.",
      "Solicitar a exclusão dos seus dados pessoais, respeitando obrigações legais de retenção.",
      "Revogar o consentimento para o processamento de dados a qualquer momento.",
      "Solicitar a portabilidade dos seus dados para outro fornecedor de serviço.",
    ],
  },
  {
    icon: Mail,
    title: "6. Contato e DPO",
    content: [
      "Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados (DPO).",
      "E-mail: privacidade@whatsappbot.com",
      "Prazo de resposta: até 15 dias úteis conforme legislação vigente.",
      "Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.",
    ],
  },
];

export default function PrivacidadeContent() {
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
            Política de{" "}
            <span className="gradient-text">Privacidade</span>
          </h1>
          <p className="text-text-muted max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Transparência sobre como coletamos, usamos e protegemos seus dados.
            Sua privacidade é nossa prioridade.
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
