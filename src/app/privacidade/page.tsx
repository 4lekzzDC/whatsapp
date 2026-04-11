import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacidadeContent from "./content";

export const metadata = {
  title: "Política de Privacidade - WhatsApp Bot",
  description:
    "Política de Privacidade do WhatsApp Bot. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <PrivacidadeContent />
      </main>
      <Footer />
    </>
  );
}
