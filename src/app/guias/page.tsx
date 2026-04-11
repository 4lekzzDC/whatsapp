import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuiasContent from "./content";

export const metadata = {
  title: "Guias - WhatsApp Bot",
  description:
    "Guias práticos e tutoriais para aproveitar ao máximo o WhatsApp Bot. Aprenda do básico ao avançado.",
};

export default function GuiasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <GuiasContent />
      </main>
      <Footer />
    </>
  );
}
