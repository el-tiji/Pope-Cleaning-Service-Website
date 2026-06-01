import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomQuoteForm } from "@/components/services/custom-quote";
import { ServiceCollage } from "@/components/services/service-collage";
import { Chatbot } from "@/components/chatbot";
import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { Home, Sparkles, Key, Droplets, Grid, Building2, Wind, CheckCircle2, ArrowRight } from "lucide-react";

const servicesData = [
  {
    id: "residential",
    title: "Residential Cleaning",
    icon: <Home className="w-6 h-6" />,
    description: "Keep your Perth home sparkling with our regular domestic cleaning services. We focus on the details so you can enjoy your free time.",
    features: ["Weekly, fortnightly or monthly", "Dusting & wiping surfaces", "Vacuuming & mopping", "Kitchen & bathroom sanitation"]
  },
  {
    id: "spring",
    title: "Spring Cleaning",
    icon: <Sparkles className="w-6 h-6" />,
    description: "A comprehensive deep clean to refresh your entire home. Perfect for changing seasons, before events, or just hitting the reset button.",
    features: ["Inside appliances (oven, fridge)", "Interior window washing", "Deep dusting & cobweb removal", "Skirting boards & door frames"]
  },
  {
    id: "vacate",
    title: "Vacate / End of Lease Cleaning",
    icon: <Key className="w-6 h-6" />,
    description: "Secure your bond back with our meticulous end-of-lease cleaning. We follow strict real estate agent checklists.",
    features: ["100% Bond Back Guarantee", "Full property deep clean", "Inside all cupboards", "Wall spot cleaning"]
  },
  {
    id: "carpet",
    title: "Carpet & Upholstery",
    icon: <Wind className="w-6 h-6" />,
    description: "Revive your carpets and furniture with professional hot water extraction, removing deep-seated dirt, stains, and allergens.",
    features: ["Steam cleaning", "Stain pre-treatment", "Odour removal", "Fast drying times"]
  },
  {
    id: "tile",
    title: "Tile & Grout Cleaning",
    icon: <Grid className="w-6 h-6" />,
    description: "Restore the original colour of your grout lines and tiles with our high-pressure heated scrubbing systems.",
    features: ["High-pressure heated washing", "Mould & mildew removal", "Grout colour restoration", "Kitchen & bathroom floors"]
  },
  {
    id: "office",
    title: "Office / Commercial Cleaning",
    icon: <Building2 className="w-6 h-6" />,
    description: "Maintain a professional, hygienic workplace for your staff and clients in Perth. Tailored schedules for your business needs.",
    features: ["After-hours cleaning", "Desk & workstation sanitation", "Communal area cleaning", "Bathroom & kitchen maintenance"]
  },
  {
    id: "pressure",
    title: "Pressure Cleaning",
    icon: <Droplets className="w-6 h-6" />,
    description: "Blast away years of grime, moss, and dirt from your exterior surfaces, instantly boosting your property's curb appeal.",
    features: ["Driveways & pathways", "Patios & decks", "Exterior walls", "Concrete rejuvenation"]
  }
];

export default function ServicesPage() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Calculate offset to prevent fixed navbar from hiding the title
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 overflow-x-hidden">

        {/* Services List with Collages */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="space-y-32 md:space-y-48">
              {servicesData.map((service, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div id={`service-${service.id}`} key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 scroll-mt-24`}>
                    
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                      <RevealOnScroll variant={isEven ? "slideRight" : "slideLeft"}>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-inner">
                          {service.icon}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{service.title}</h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-secondary font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Link href={`/book?service=${service.id}`}>
                          <Button className="rounded-full px-8 h-12 shadow-md hover:shadow-lg transition-all group bg-secondary text-primary-foreground hover:bg-secondary/90">
                            Book {service.title}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </RevealOnScroll>
                    </div>

                    {/* Collage Component */}
                    <div className="w-full lg:w-1/2 relative">
                      <ServiceCollage serviceId={service.id} />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <RevealOnScroll variant="rise" delay={0.1}>
          <CustomQuoteForm />
        </RevealOnScroll>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}