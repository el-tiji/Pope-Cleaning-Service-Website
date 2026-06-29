import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { businessInfo } from "@/config/businessInfo";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="h-12 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/assets/brand/pope-cleaning-logo.png" 
                alt="Pope Cleaning Services logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden h-full aspect-square bg-primary flex items-center justify-center text-primary-foreground rounded-xl">
                <span className="font-display font-bold text-xl">P</span>
              </div>
            </div>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/"><a className="text-sm font-bold text-secondary/80 bg-white/40 backdrop-blur-md border border-white/60 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:text-primary hover:scale-105 hover:border-primary/20 transition-all cursor-pointer">Home</a></Link>
          <Link href="/services"><a className="text-sm font-bold text-secondary/80 bg-white/40 backdrop-blur-md border border-white/60 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:text-primary hover:scale-105 hover:border-primary/20 transition-all cursor-pointer">Services</a></Link>
          <Link href="/pricing"><a className="text-sm font-bold text-secondary/80 bg-white/40 backdrop-blur-md border border-white/60 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:text-primary hover:scale-105 hover:border-primary/20 transition-all cursor-pointer">Pricing Info</a></Link>
          <Link href="/about"><a className="text-sm font-bold text-secondary/80 bg-white/40 backdrop-blur-md border border-white/60 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white hover:text-primary hover:scale-105 hover:border-primary/20 transition-all cursor-pointer">About Us</a></Link>
          <Link href="/book">
            <Button className="rounded-full px-6 py-2 h-auto font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer ml-2">
              Book Now
            </Button>
          </Link>
          <div className="hidden lg:block w-px h-6 bg-border/60 mx-2"></div>
          <Link href="/auth/login">
            <Button variant="outline" className="hidden lg:flex rounded-full px-5 py-2 h-auto font-semibold border-primary/20 text-primary hover:bg-primary/5 transition-all cursor-pointer">
              Log In
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6 text-secondary" />
        </Button>
      </div>
    </nav>
  );
}