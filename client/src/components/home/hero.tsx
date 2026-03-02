import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/assets";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-secondary font-medium text-sm mb-6 border border-accent/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Perth's Premium Cleaning Service
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-secondary leading-[1.1]">
              Fresh. <span className="text-gradient">Spotless.</span> <br />
              Perfectly Done.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              We bring the shine back to Perth homes and offices. Professional, reliable, and equipped to handle any mess with our signature 3D-level precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                Book a Clean
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-semibold border-border bg-white hover:bg-muted/30">
                View Our Services
              </Button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=7EC8FF`} alt="User avatar" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400">
                  {/* Stars */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-secondary">500+ Happy Perth Locals</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3 scale-105 blur-xl -z-10"></div>
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-white/50 relative">
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in zoom-in duration-1000 delay-300">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Guarantee</p>
                  <p className="text-sm font-bold text-secondary">100% Satisfaction</p>
                </div>
              </div>
              
              <img 
                src={ASSETS.hero.src} 
                alt={ASSETS.hero.alt} 
                className="w-full h-auto object-cover rounded-[2rem] bg-muted/20"
                loading="eager"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}