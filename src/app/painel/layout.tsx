import type { Metadata } from "next";
import Sidebar from "@/components/painel/Sidebar";

export const metadata: Metadata = {
  title: "Painel — WhatsApp Bot",
  description:
    "Conecte seu WhatsApp, gerencie atendimentos, setores e configurações.",
};

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
