import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground transform group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none tracking-tight text-secondary">Pope</span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Cleaning Services</span>
            </div>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"><a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</a></Link>
          <Link href="/book"><a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Plans & Pricing</a></Link>
          <a href="/#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="/#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</a>
          <a href="/#reviews" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Reviews</a>
          <Link href="/book">
            <Button className="rounded-full px-6 font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer">
              Book Now
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