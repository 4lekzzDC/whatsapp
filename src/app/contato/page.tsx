import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContatoContent from "./content";

export const metadata = {
  title: "Contato - WhatsApp Bot",
  description:
    "Entre em contato com o time do WhatsApp Bot. Estamos prontos para ajudar com vendas, suporte e parcerias.",
};

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ContatoContent />
      </main>
      <Footer />
    </>
  );
}
