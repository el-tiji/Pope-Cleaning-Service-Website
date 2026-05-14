import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Services } from "@/components/home/services";
import { Chatbot } from "@/components/chatbot";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Services />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}