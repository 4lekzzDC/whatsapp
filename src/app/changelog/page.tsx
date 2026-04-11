import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChangelogContent from "./content";

export const metadata = {
  title: "Changelog - WhatsApp Bot",
  description:
    "Acompanhe todas as atualizações, melhorias e novos recursos do WhatsApp Bot.",
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ChangelogContent />
      </main>
      <Footer />
    </>
  );
}
