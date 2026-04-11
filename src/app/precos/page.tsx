import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrecosContent from "./content";

export const metadata = {
  title: "Preços - WhatsApp Bot",
  description:
    "Planos flexíveis para empresas de todos os tamanhos. Comece grátis e escale conforme sua necessidade.",
};

export default function PrecosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <PrecosContent />
      </main>
      <Footer />
    </>
  );
}
