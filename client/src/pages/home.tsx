import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FAQ } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Hero />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}