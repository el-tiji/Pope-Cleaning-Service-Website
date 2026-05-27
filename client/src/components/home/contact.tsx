import { ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

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
                <Button className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-xl shadow-md shadow-primary/20 gap-2">
                  Go to Custom Quote Form <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-[3rem] transform -rotate-3 scale-105 blur-2xl -z-10"></div>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-white/50 relative">
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-2xl shadow-xl max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <h4 className="font-bold text-lg mb-2">Service Area</h4>
                <p className="text-white/80 text-center text-[16px]">We proudly serve the entire Perth metropolitan area, from Joondalup to Mandurah.</p>
              </div>
              
              <img 
                src={ASSETS.contact.map.src} 
                alt={ASSETS.contact.map.alt} 
                className="w-full h-auto object-cover rounded-[2rem] bg-blue-50/50 aspect-square"
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