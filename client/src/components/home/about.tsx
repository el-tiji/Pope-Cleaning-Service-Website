import { ASSETS } from "@/lib/assets";
import { Check } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { businessInfo } from "@/config/businessInfo";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-30 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <RevealOnScroll className="order-2 lg:order-1 relative" delay={0.2}>
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
          </RevealOnScroll>
          
          <div className="order-1 lg:order-2">
            <RevealOnScroll delay={0.1}>
              <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">A cleaner approach to your everyday life.</h3>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {businessInfo.businessName} is a family-run cleaning business based in {businessInfo.location}. For over 7 years, the team has helped local homes and businesses keep their spaces clean, fresh and professionally maintained.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our team consists of highly trained professionals who treat your space with the same respect and care as their own homes, ensuring satisfaction on every job.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <ul className="space-y-4 mb-10">
                {[
                  "Family-run business in Perth",
                  "Owner-operated service",
                  "Residential and commercial cleaning",
                  "Satisfaction guarantee"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-secondary font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
                <div>
                  <h4 className="text-4xl font-display font-bold text-primary mb-1">7+</h4>
                  <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-primary mb-1">100%</h4>
                  <p className="text-sm text-muted-foreground font-medium">Satisfaction Focus</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}