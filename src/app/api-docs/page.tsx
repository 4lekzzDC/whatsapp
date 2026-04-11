import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApiContent from "./content";

export const metadata = {
  title: "API - WhatsApp Bot",
  description:
    "Referência completa da API REST do WhatsApp Bot. Endpoints, autenticação, webhooks e exemplos de código.",
};

export default function ApiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ApiContent />
      </main>
      <Footer />
    </>
  );
}
