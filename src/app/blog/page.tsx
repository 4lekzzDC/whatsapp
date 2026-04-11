import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "./content";

export const metadata = {
  title: "Blog - WhatsApp Bot",
  description:
    "Artigos, tutoriais e novidades sobre automação de atendimento, WhatsApp Business e inteligência artificial.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
