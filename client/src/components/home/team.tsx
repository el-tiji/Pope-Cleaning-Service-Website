import { ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/button";

export function Team() {
  return (
    <section id="careers" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-secondary text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">Work With Us</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Join the Pope Cleaning Family</h3>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                We're always looking for dedicated, detail-oriented individuals to join our growing team in Perth. We offer competitive rates, flexible hours, and a supportive environment where your hard work is truly valued.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Competitive hourly rates & bonuses",
                  "Flexible scheduling (part-time & full-time)",
                  "All equipment & eco-friendly supplies provided",
                  "Comprehensive training program"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                    <span className="font-medium text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="bg-white text-secondary hover:bg-accent hover:text-secondary rounded-full h-14 px-8 text-base font-bold shadow-lg shadow-black/20 transition-all">
                View Open Positions
              </Button>
            </div>
            
            <div className="relative group">
              <img 
                src={ASSETS.team.hero.src} 
                alt={ASSETS.team.hero.alt} 
                className="w-full h-auto object-cover rounded-[2rem] shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}