import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-[112px] pb-20">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-xl border border-border text-center">
          <p className="text-7xl font-bold text-[#2F7FD1] mb-4">404</p>
          <h1 className="text-2xl font-bold text-[#00275F] mb-2">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-br from-[#2F7FD1] to-[#2E86DE] text-white border-none rounded-full px-8 h-[46px] font-bold shadow-[0_8px_20px_rgba(47,127,209,0.28)] hover:from-[#1F6FC0] hover:to-[#2F7FD1] hover:-translate-y-[1px] transition-all duration-200 ease-out">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
