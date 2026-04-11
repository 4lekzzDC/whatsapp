import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermosContent from "./content";

export const metadata = {
  title: "Termos de Uso - WhatsApp Bot",
  description:
    "Termos de Uso do WhatsApp Bot. Condições gerais para utilização da plataforma de automação de WhatsApp.",
};

export default function TermosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <TermosContent />
      </main>
      <Footer />
    </>
  );
}
