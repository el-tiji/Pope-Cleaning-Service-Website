import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { businessInfo } from "@/config/businessInfo";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.88)] backdrop-blur-[12px] border-b border-[#00275F]/[0.08] shadow-[0_8px_24px_rgba(0,39,95,0.06)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[88px] flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="h-14 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 ease-out">
              <img 
                src="/assets/brand/pope-cleaning-logo-transparent.png" 
                alt="Pope Cleaning Services logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden h-full aspect-square bg-[#2F7FD1] flex items-center justify-center text-white rounded-xl">
                <span className="font-display font-bold text-xl">P</span>
              </div>
            </div>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center">
          {/* Navigation Links */}
          <div className="flex items-center gap-2 mr-6">
            <Link href="/"><span className="text-[#00275F] text-[15px] font-bold bg-[rgba(255,255,255,0.75)] border border-[#00275F]/[0.08] px-[20px] py-[10px] rounded-full hover:bg-[#EAF5FF] hover:text-[#00275F] hover:border-[#2F7FD1]/25 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,39,95,0.04)] transition-all duration-200 ease-out cursor-pointer">Home</span></Link>
            <Link href="/services"><span className="text-[#00275F] text-[15px] font-bold bg-[rgba(255,255,255,0.75)] border border-[#00275F]/[0.08] px-[20px] py-[10px] rounded-full hover:bg-[#EAF5FF] hover:text-[#00275F] hover:border-[#2F7FD1]/25 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,39,95,0.04)] transition-all duration-200 ease-out cursor-pointer">Services</span></Link>
            <Link href="/pricing"><span className="text-[#00275F] text-[15px] font-bold bg-[rgba(255,255,255,0.75)] border border-[#00275F]/[0.08] px-[20px] py-[10px] rounded-full hover:bg-[#EAF5FF] hover:text-[#00275F] hover:border-[#2F7FD1]/25 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,39,95,0.04)] transition-all duration-200 ease-out cursor-pointer">Pricing Info</span></Link>
            <Link href="/about"><span className="text-[#00275F] text-[15px] font-bold bg-[rgba(255,255,255,0.75)] border border-[#00275F]/[0.08] px-[20px] py-[10px] rounded-full hover:bg-[#EAF5FF] hover:text-[#00275F] hover:border-[#2F7FD1]/25 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,39,95,0.04)] transition-all duration-200 ease-out cursor-pointer">About Us</span></Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button 
                variant="outline"
                className="bg-[#F5F7FA] text-[#00275F] border-[#00275F]/[0.14] rounded-full px-[22px] h-[42px] font-bold shadow-[0_4px_12px_rgba(0,39,95,0.08)] hover:bg-[#EAF5FF] hover:border-[#2F7FD1] hover:text-[#00275F] hover:-translate-y-[1px] transition-all duration-200 ease-out cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2F7FD1]/50"
              >
                Log In
              </Button>
            </Link>
            <Link href="/book">
              <Button 
                className="bg-gradient-to-br from-[#2F7FD1] to-[#2E86DE] text-white border-none rounded-full px-[26px] h-[42px] font-bold shadow-[0_8px_20px_rgba(47,127,209,0.28)] hover:from-[#1F6FC0] hover:to-[#2F7FD1] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(47,127,209,0.34)] active:translate-y-0 active:shadow-[0_4px_12px_rgba(47,127,209,0.2)] transition-all duration-200 ease-out cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2F7FD1]/50"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden text-[#00275F]">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
}