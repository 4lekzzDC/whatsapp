import type { Metadata } from "next";
import Sidebar from "@/components/painel/Sidebar";
import { UserProvider } from "@/components/painel/UserProvider";
import { requireFalahubAccess } from "@/lib/session";

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
  const session = await requireFalahubAccess("/painel/atendimentos");

  const user = {
    name: session.name,
    email: session.email,
    initials: initialsFromName(session.name),
  };

  return (
    <UserProvider user={user}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
    </UserProvider>
  );
}
