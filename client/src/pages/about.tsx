import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/home/about";
import { Team } from "@/components/home/team";
import { Chatbot } from "@/components/chatbot";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <About />
        <Team />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}