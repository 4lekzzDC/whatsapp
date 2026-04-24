import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";

export const metadata: Metadata = {
  title: "WhatsApp Bot - Organize seu atendimento via WhatsApp",
  description:
    "Centralize conversas do WhatsApp, atenda em equipe de qualquer lugar e dispare mensagens automáticas. IA que responde sozinha como add-on opcional.",
  keywords: ["WhatsApp", "atendimento", "CRM", "inbox", "automação", "chatbot", "IA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
