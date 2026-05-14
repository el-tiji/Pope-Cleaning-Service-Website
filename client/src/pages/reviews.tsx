import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reviews } from "@/components/home/reviews";
import { Chatbot } from "@/components/chatbot";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Reviews />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}