import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FAQ } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";
import { Chatbot } from "@/components/chatbot";
import { HowWeWork } from "@/components/home/how-we-work";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <RevealOnScroll variant="fade" delay={0.1}>
          <Hero />
        </RevealOnScroll>
        <RevealOnScroll variant="rise" delay={0.2}>
          <HowWeWork />
        </RevealOnScroll>
        <RevealOnScroll variant="slide-left" delay={0.2}>
          <Contact />
        </RevealOnScroll>
        <RevealOnScroll variant="slide-right" delay={0.2}>
          <FAQ />
        </RevealOnScroll>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}