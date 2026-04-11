import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FuncionalidadesContent from "./content";

export const metadata = {
  title: "Funcionalidades - WhatsApp Bot",
  description:
    "Conheça todas as funcionalidades do WhatsApp Bot: atendimento automatizado, NLP avançado, relatórios, segurança e muito mais.",
};

export default function FuncionalidadesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <FuncionalidadesContent />
      </main>
      <Footer />
    </>
  );
}
