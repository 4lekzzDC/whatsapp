import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookiesContent from "./content";

export const metadata = {
  title: "Política de Cookies - WhatsApp Bot",
  description:
    "Política de Cookies do WhatsApp Bot. Saiba quais cookies utilizamos e como gerenciá-los.",
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <CookiesContent />
      </main>
      <Footer />
    </>
  );
}
