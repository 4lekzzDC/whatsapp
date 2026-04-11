import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocumentacaoContent from "./content";

export const metadata = {
  title: "Documentação - WhatsApp Bot",
  description:
    "Acesse a documentação completa do WhatsApp Bot. Guias de integração, referência de API e tutoriais para configurar seu bot.",
};

export default function DocumentacaoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <DocumentacaoContent />
      </main>
      <Footer />
    </>
  );
}
