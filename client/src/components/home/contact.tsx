import { ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">Get a Quote</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Need a custom cleaning solution?</h3>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              While we offer standardized pricing for most residential and commercial properties, we know that some jobs require a tailored approach. Whether it's a post-renovation clean, a large warehouse, or a specific combination of services, we're here to help.
            </p>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-border">
              <h4 className="text-2xl font-bold text-secondary mb-4">Request a Custom Quote</h4>
              <p className="text-muted-foreground mb-8">
                Tell us exactly what you need and our team will prepare a personalized estimate based on your specific requirements.
              </p>
              
              <Link href="/services#services-custom-quote">
                <Button className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-xl shadow-md shadow-primary/20 gap-2 hover:translate-y-[-2px] transition-transform">
                  Go to Custom Quote Form <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] transform -rotate-3 scale-105 blur-2xl -z-10 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110"></div>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-white/50 relative transform transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
              
              {/* Centered Service Area Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[85%] sm:w-80">
                <div className="bg-white/95 backdrop-blur-md text-secondary p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/60 animate-in zoom-in-95 duration-1000 delay-500 hover:scale-105 transition-transform cursor-default">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-extrabold text-2xl mb-3 text-center text-primary">Service Area</h4>
                  <p className="text-secondary/80 text-center text-[16px] leading-relaxed font-medium">
                    We proudly serve the entire <span className="text-primary font-bold">Perth</span> metropolitan area, from Joondalup to Mandurah.
                  </p>
                </div>
              </div>
              
              <img 
                src={ASSETS.contact.map.src} 
                alt={ASSETS.contact.map.alt} 
                className="w-full h-auto object-cover rounded-[2rem] bg-blue-50/50 aspect-square opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-auto object-cover rounded-[2rem] bg-blue-50 aspect-square flex-col items-center justify-center text-primary border border-primary/20">
                <span className="font-bold mb-2">Map Placeholder</span>
                <span className="text-sm text-muted-foreground">3D Perth Metro Map</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}