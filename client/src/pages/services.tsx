import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomQuoteForm } from "@/components/services/custom-quote";
import { Chatbot } from "@/components/chatbot";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default function ServicesPage() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash === '#services-custom-quote') {
      const element = document.getElementById('services-custom-quote');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-24">
        <RevealOnScroll variant="rise" delay={0.1}>
          <CustomQuoteForm />
        </RevealOnScroll>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}