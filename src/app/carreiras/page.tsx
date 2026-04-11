import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarreirasContent from "./content";

export const metadata = {
  title: "Carreiras - WhatsApp Bot",
  description:
    "Junte-se ao time do WhatsApp Bot. Confira nossas vagas abertas e faça parte da revolução no atendimento ao cliente.",
};

export default function CarreirasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CarreirasContent />
      </main>
      <Footer />
    </>
  );
}
