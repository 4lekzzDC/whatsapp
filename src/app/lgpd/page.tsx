import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LgpdContent from "./content";

export const metadata = {
  title: "LGPD - WhatsApp Bot",
  description:
    "Conformidade com a Lei Geral de Proteção de Dados (LGPD). Saiba como o WhatsApp Bot protege seus dados.",
};

export default function LgpdPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <LgpdContent />
      </main>
      <Footer />
    </>
  );
}
