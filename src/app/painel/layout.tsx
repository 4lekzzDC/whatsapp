import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Sidebar from "@/components/painel/Sidebar";
import { UserProvider } from "@/components/painel/UserProvider";
import { ToastProvider } from "@/components/painel/ToastProvider";
import { ConfirmProvider } from "@/components/painel/ConfirmProvider";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Painel — WhatsApp Bot",
  description:
    "Conecte seu WhatsApp, gerencie atendimentos, setores e configurações.",
};

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("") || "U";
}

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/entrar");

  const user = {
    name: session.name,
    email: session.email,
    initials: initialsFromName(session.name),
  };

  return (
    <UserProvider user={user}>
      <ToastProvider>
        <ConfirmProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">{children}</div>
          </div>
        </ConfirmProvider>
      </ToastProvider>
    </UserProvider>
  );
}
