import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntegracoesContent from "./content";

export const metadata = {
  title: "Integrações - WhatsApp Bot",
  description:
    "Conecte o WhatsApp Bot com as ferramentas que você já usa: CRMs, ERPs, e-commerce, helpdesks e muito mais.",
};

export default function IntegracoesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <IntegracoesContent />
      </main>
      <Footer />
    </>
  );
}
