import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusContent from "./content";

export const metadata = {
  title: "Status - WhatsApp Bot",
  description:
    "Verifique o status em tempo real de todos os serviços do WhatsApp Bot. Uptime, incidentes e manutenções programadas.",
};

export default function StatusPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <StatusContent />
      </main>
      <Footer />
    </>
  );
}
