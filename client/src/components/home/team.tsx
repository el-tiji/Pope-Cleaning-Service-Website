import { businessInfo } from "@/config/businessInfo";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Phone } from "lucide-react";

export function Team() {
  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="font-bold tracking-wider uppercase mb-3 text-primary text-[18px]">Our Team</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">Meet the People Behind Pope Cleaning Services</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {businessInfo.businessName} is a family-run cleaning business based in {businessInfo.location}. 
              Kevin and Genny Pope coordinate the business with a focus on reliable service, detailed cleaning and customer satisfaction.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {businessInfo.people.map((person, index) => (
            <RevealOnScroll key={person.id} delay={0.1 * (index + 1)} variant={index % 2 === 0 ? "slide-right" : "slide-left"}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-border flex flex-col h-full hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6 border-b border-border/50 pb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                    <span className="text-2xl font-display font-bold text-primary">{person.initials}</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-secondary mb-1">{person.name}</h4>
                    <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-2">{person.role}</p>
                    <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{person.phone}</span>
                    </a>
                  </div>
                </div>
                
                <p className="text-secondary/80 leading-relaxed mb-8 flex-grow">
                  {person.description}
                </p>
                
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Focus Areas</h5>
                  <div className="flex flex-wrap gap-2">
                    {person.focusAreas.map((area, i) => (
                      <span key={i} className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/10">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}