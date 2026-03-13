import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { About } from "@/components/home/about";
import { Reviews } from "@/components/home/reviews";
import { FAQ } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";
import { Team } from "@/components/home/team";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Reviews />
        <FAQ />
        <Contact />
        <Team />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}