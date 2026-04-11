import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Bot - Atendimento Inteligente via WhatsApp",
  description:
    "Sistema de atendimento via WhatsApp que categoriza conversas, realiza o pré-atendimento e organiza o fluxo antes da interação humana.",
  keywords: ["WhatsApp", "chatbot", "atendimento", "NLP", "automação"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
