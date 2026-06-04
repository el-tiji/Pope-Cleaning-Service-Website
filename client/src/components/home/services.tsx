import { ASSETS } from "@/lib/assets";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

const services = [
  {
    id: "residential",
    title: "Residential Cleaning",
    shortDescription: "Regular home cleaning for busy Perth households – kitchens, bathrooms, floors and surfaces kept consistently fresh.",
    image: "/assets/tiltshift/services/residential.png",
    alt: "Miniature living room being cleaned - Residential Cleaning service",
    link: "/services#service-residential",
  },
  {
    id: "spring",
    title: "Spring Cleaning",
    shortDescription: "Deep, detail-focused cleaning for neglected areas, bringing back the sparkle to your entire home.",
    image: "/assets/tiltshift/services/spring.png",
    alt: "Deep spring cleaning scene - Spring Cleaning service",
    link: "/services#service-spring",
  },
  {
    id: "vacate",
    title: "Vacate / End of Lease",
    shortDescription: "Detailed move-out cleaning designed to meet real estate inspection standards, ensuring you get your bond back.",
    image: "/assets/tiltshift/services/vacate.png",
    alt: "Clean empty apartment - Vacate / End of Lease cleaning service",
    link: "/services#service-vacate",
  },
  {
    id: "commercial",
    title: "Office / Commercial",
    shortDescription: "Maintain a pristine, professional workspace that leaves a lasting impression on clients and boosts employee morale.",
    image: "/assets/tiltshift/services/office.png",
    alt: "Spotless modern office - Commercial Cleaning service",
    link: "/services#service-office",
  },
  {
    id: "carpet",
    title: "Carpet & Upholstery",
    shortDescription: "Deep steam cleaning to refresh fibers, remove stubborn stains, and eliminate hidden allergens.",
    image: "/assets/tiltshift/services/carpet.png",
    alt: "Clean carpet - Carpet & Upholstery cleaning service",
    link: "/services#service-carpet",
  },
  {
    id: "pressure",
    title: "Pressure Cleaning",
    shortDescription: "Transform driveways, patios, and outdoor exteriors with high-power, deep-cleaning washing.",
    image: "/assets/tiltshift/services/pressure.png",
    alt: "Outdoor patio pressure washing - Pressure Cleaning service",
    link: "/services#service-pressure",
  }
];

export function ServicesBlock() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <RevealOnScroll key={service.id} delay={index * 0.1} variant="zoom">
            <Link href={service.link}>
              <Card className="group relative overflow-hidden border border-border/50 rounded-3xl aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary/40 transition-all duration-500">
                {/* Background Image (Top 70%) */}
                <div className="absolute inset-0 h-[70%] md:h-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle dark overlay for text readability on mobile/base state */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-50 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 h-[50%] md:h-full transition-transform duration-300 md:translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  
                  {/* Short description (visible on hover for desktop, always visible on mobile) */}
                  <p className="text-white/90 text-sm leading-relaxed mb-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {service.shortDescription}
                  </p>
                  
                  {/* Learn More CTA */}
                  <div className="flex items-center text-accent font-semibold text-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 delay-100">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesBlock />
      </div>
    </section>
  );
}