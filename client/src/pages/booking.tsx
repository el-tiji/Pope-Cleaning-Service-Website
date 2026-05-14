import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Calendar, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "regular",
    title: "Regular Cleaning",
    description: "Keep your home consistently fresh and tidy. Ideal for busy professionals and families.",
    basePrice: 120,
    icon: Calendar,
    benefits: ["Dusting & wiping surfaces", "Vacuuming & mopping floors", "Kitchen & bathroom sanitation", "Trash removal"]
  },
  {
    id: "spring",
    title: "Spring Cleaning",
    description: "A thorough top-to-bottom deep clean to refresh your space completely.",
    basePrice: 250,
    icon: Sparkles,
    benefits: ["Inside cabinets & drawers", "Skirting boards & doors", "Deep bathroom scrubbing", "Oven & fridge interior"]
  },
  {
    id: "vacate",
    title: "Vacate Cleaning",
    description: "Bond-back guarantee cleaning for end of lease. Meets all real estate standards.",
    basePrice: 350,
    icon: ShieldCheck,
    benefits: ["100% Bond Back Guarantee", "Full kitchen & oven deep clean", "Inside all windows & tracks", "Spot spot cleaning walls"]
  }
];

const frequencies = [
  { id: "daily", label: "Daily", discount: 0.25, badge: "Save 25%" },
  { id: "weekly", label: "Weekly", discount: 0.15, badge: "Save 15%" },
  { id: "fortnightly", label: "Fortnightly", discount: 0.10, badge: "Save 10%" },
  { id: "monthly", label: "Monthly", discount: 0.05, badge: "Save 5%" },
  { id: "occasional", label: "Occasional", discount: 0, badge: "Standard Rate" }
];

export default function Booking() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[1]);

  const calculatePrice = () => {
    return Math.round(selectedService.basePrice * (1 - selectedFrequency.discount));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-sm font-bold tracking-wider text-primary uppercase mb-3">Custom Plans</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Design your perfect clean</h2>
            <p className="text-lg text-muted-foreground">
              Select your service type and how often you'd like us to visit. The more frequent we clean, the more you save!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            <div className="lg:col-span-2 space-y-12">
              {/* Step 1: Select Service */}
              <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg">1</div>
                  <h3 className="text-2xl font-bold text-secondary">Choose a Service</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedService.id === service.id;
                    
                    return (
                      <Card 
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={cn(
                          "cursor-pointer transition-all duration-300 border-2 overflow-hidden relative",
                          isSelected 
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 transform scale-[1.02]" 
                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                            isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                          )}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className="font-bold text-lg text-secondary mb-2">{service.title}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* Step 2: Select Frequency */}
              <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg">2</div>
                  <h3 className="text-2xl font-bold text-secondary">How Often?</h3>
                </div>
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {frequencies.map((freq) => {
                      const isSelected = selectedFrequency.id === freq.id;
                      return (
                        <button
                          key={freq.id}
                          onClick={() => setSelectedFrequency(freq)}
                          className={cn(
                            "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300",
                            isSelected 
                              ? "border-primary bg-primary text-white shadow-md transform scale-105" 
                              : "border-border bg-background text-secondary hover:border-primary/40 hover:bg-muted/30"
                          )}
                        >
                          {freq.discount > 0 && (
                            <span className={cn(
                              "absolute -top-3 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap",
                              isSelected ? "bg-accent text-secondary" : "bg-green-100 text-green-700"
                            )}>
                              {freq.badge}
                            </span>
                          )}
                          <Clock className={cn("w-6 h-6 mb-2", isSelected ? "text-white" : "text-primary")} />
                          <span className="font-semibold text-sm">{freq.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-secondary text-white rounded-[2rem] p-8 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <h3 className="font-display font-bold text-2xl mb-6 relative z-10">Your Plan Summary</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start border-b border-white/10 pb-6">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">Service Type</p>
                      <p className="font-bold text-lg text-accent">{selectedService.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start border-b border-white/10 pb-6">
                    <div>
                      <p className="text-white/60 text-sm font-medium mb-1">Frequency</p>
                      <p className="font-bold text-lg text-white">{selectedFrequency.label}</p>
                      {selectedFrequency.discount > 0 && (
                        <p className="text-green-400 text-xs font-bold mt-1 uppercase tracking-wider">{selectedFrequency.badge} Applied</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm font-medium mb-3">What's included:</p>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-white/80 font-medium">Estimated Total</span>
                    <div className="text-right">
                      {selectedFrequency.discount > 0 && (
                        <span className="text-white/40 line-through text-sm mr-2">${selectedService.basePrice}</span>
                      )}
                      <span className="text-4xl font-display font-bold text-white">${calculatePrice()}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full h-14 rounded-xl text-base font-bold bg-accent text-secondary hover:bg-white transition-colors shadow-lg flex justify-between px-6 group">
                    <span>Book this Plan</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-center text-xs text-white/40 mt-4">
                    * Final price may vary based on exact property size and condition.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}