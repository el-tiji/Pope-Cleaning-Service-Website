import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { businessInfo } from "@/config/businessInfo";
import { ENABLE_ADMIN_LOGIN } from "@/config/featureFlags";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing Info", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close the mobile menu on navigation and lock body scroll while open.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.88)] backdrop-blur-[12px] border-b border-[#00275F]/[0.08] shadow-[0_8px_24px_rgba(0,39,95,0.06)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-[88px] flex items-center justify-between">
        <Link href="/">
          <span className="flex items-center gap-2 group cursor-pointer">
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
          </span>
        </Link>
        
        <div className="hidden md:flex items-center">
          {/* Navigation Links */}
          <div className="flex items-center gap-2 mr-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "text-[#00275F] text-[15px] font-bold border px-[20px] py-[10px] rounded-full hover:bg-[#EAF5FF] hover:text-[#00275F] hover:border-[#2F7FD1]/25 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,39,95,0.04)] transition-all duration-200 ease-out cursor-pointer",
                    location === link.href
                      ? "bg-[#EAF5FF] border-[#2F7FD1]/25"
                      : "bg-[rgba(255,255,255,0.75)] border-[#00275F]/[0.08]",
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin login is temporarily hidden for public release.
                Re-enable with VITE_ENABLE_ADMIN_LOGIN=true. */}
            {ENABLE_ADMIN_LOGIN && (
              <Link href="/auth/login">
                <Button 
                  variant="outline"
                  className="bg-[#F5F7FA] text-[#00275F] border-[#00275F]/[0.14] rounded-full px-[22px] h-[42px] font-bold shadow-[0_4px_12px_rgba(0,39,95,0.08)] hover:bg-[#EAF5FF] hover:border-[#2F7FD1] hover:text-[#00275F] hover:-translate-y-[1px] transition-all duration-200 ease-out cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2F7FD1]/50"
                >
                  Log In
                </Button>
              </Link>
            )}
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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[#00275F]"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((v) => !v)}
          data-testid="button-mobile-menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur border-b border-[#00275F]/[0.08] shadow-lg",
          isMobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="px-4 pt-2 pb-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "block px-4 py-3 rounded-xl text-[#00275F] font-bold text-base cursor-pointer transition-colors",
                  location === link.href ? "bg-[#EAF5FF]" : "hover:bg-[#F5F7FA]",
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          {ENABLE_ADMIN_LOGIN && (
            <Link href="/auth/login">
              <span className="block px-4 py-3 rounded-xl text-[#00275F] font-medium text-base cursor-pointer hover:bg-[#F5F7FA] transition-colors">
                Log In
              </span>
            </Link>
          )}
          <Link href="/book">
            <span className="mt-2 block text-center px-4 py-3.5 rounded-full bg-gradient-to-br from-[#2F7FD1] to-[#2E86DE] text-white font-bold text-base cursor-pointer shadow-[0_8px_20px_rgba(47,127,209,0.28)]">
              Book Now
            </span>
          </Link>
          <a
            href={`tel:${businessInfo.phonePrimary.replace(/\s+/g, "")}`}
            className="mt-1 block text-center px-4 py-2 text-sm text-[#2F7FD1] font-medium"
          >
            Call {businessInfo.phonePrimary}
          </a>
        </div>
      </div>
    </nav>
  );
}
