import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Services } from "@/components/home/services";
import { Chatbot } from "@/components/chatbot";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Services />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}