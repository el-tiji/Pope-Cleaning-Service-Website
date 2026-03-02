import { ASSETS } from "@/lib/assets";
import { Check } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] blur-2xl -z-10"></div>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-white/50 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm z-10 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-secondary">Locally Owned in Perth</span>
              </div>
              <img 
                src={ASSETS.about.hero.src} 
                alt={ASSETS.about.hero.alt} 
                className="w-full h-auto object-cover rounded-[2rem] bg-muted/10 aspect-[4/3]"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-3">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">A cleaner approach to your everyday life.</h3>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded in Perth, Pope Cleaning Services began with a simple mission: to provide a level of cleanliness that feels genuinely refreshing. We don't just wipe surfaces; we restore environments.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team consists of highly trained professionals who treat your space with the same respect and care as their own homes.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Fully insured and police-cleared team members",
                "Eco-friendly, safe cleaning products available",
                "Satisfaction guaranteed on every job",
                "Flexible scheduling to fit your lifestyle"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-secondary font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
              <div>
                <h4 className="text-4xl font-display font-bold text-primary mb-1">5+</h4>
                <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-primary mb-1">2k+</h4>
                <p className="text-sm text-muted-foreground font-medium">Homes Cleaned</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}