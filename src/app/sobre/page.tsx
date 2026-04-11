import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SobreContent from "./content";

export const metadata = {
  title: "Sobre - WhatsApp Bot",
  description:
    "Conheça a história, missão e o time por trás do WhatsApp Bot. Automatizamos o atendimento via WhatsApp com inteligência artificial.",
};

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <SobreContent />
      </main>
      <Footer />
    </>
  );
}
