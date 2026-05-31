import { ASSETS } from "@/lib/assets";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ServicePreviewPopover } from "@/components/ui/service-preview-popover";

const services = [
  {
    id: "residential",
    title: "Residential Cleaning",
    shortDescription: "Regular home cleaning for busy Perth households – kitchens, bathrooms, floors and surfaces kept consistently fresh.",
    image: "/assets/tiltshift/services/residential.png",
    alt: "Miniature living room being cleaned - Residential Cleaning service",
    link: "/book",
    previewImages: [
      { src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80", alt: "Clean living room" },
      { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80", alt: "Clean bathroom" }
    ]
  },
  {
    id: "spring",
    title: "Spring Cleaning",
    shortDescription: "Deep, detail-focused cleaning for neglected areas, bringing back the sparkle to your entire home.",
    image: "/assets/tiltshift/services/spring.png",
    alt: "Deep spring cleaning scene - Spring Cleaning service",
    link: "/book",
    previewImages: []
  },
  {
    id: "vacate",
    title: "Vacate / End of Lease",
    shortDescription: "Detailed move-out cleaning designed to meet real estate inspection standards, ensuring you get your bond back.",
    image: "/assets/tiltshift/services/vacate.png",
    alt: "Clean empty apartment - Vacate / End of Lease cleaning service",
    link: "/book",
    previewImages: [
      { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80", alt: "Empty clean kitchen" },
      { src: "https://images.unsplash.com/photo-1556020685-e631950279c1?auto=format&fit=crop&q=80", alt: "Empty clean living space" }
    ]
  },
  {
    id: "commercial",
    title: "Office / Commercial",
    shortDescription: "Maintain a pristine, professional workspace that leaves a lasting impression on clients and boosts employee morale.",
    image: "/assets/tiltshift/services/office.png",
    alt: "Spotless modern office - Commercial Cleaning service",
    link: "/book",
    previewImages: [
      { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80", alt: "Clean office space" },
      { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80", alt: "Clean meeting room" }
    ]
  },
  {
    id: "carpet",
    title: "Carpet & Upholstery",
    shortDescription: "Deep steam cleaning to refresh fibers, remove stubborn stains, and eliminate hidden allergens.",
    image: "/assets/tiltshift/services/carpet.png",
    alt: "Clean carpet - Carpet & Upholstery cleaning service",
    link: "/book",
    previewImages: [
      { src: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80", alt: "Professional carpet cleaning" },
      { src: "https://images.unsplash.com/photo-1528699633788-424224dc89b5?auto=format&fit=crop&q=80", alt: "Clean sofa upholstery" }
    ]
  },
  {
    id: "pressure",
    title: "Pressure Cleaning",
    shortDescription: "Transform driveways, patios, and outdoor exteriors with high-power, deep-cleaning washing.",
    image: "/assets/tiltshift/services/pressure.png",
    alt: "Outdoor patio pressure washing - Pressure Cleaning service",
    link: "/book",
    previewImages: []
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Expert cleaning for every surface</h3>
            <p className="text-lg text-muted-foreground">
              From cozy apartments to sprawling offices, our comprehensive range of services ensures no speck of dust is left behind.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <RevealOnScroll key={service.id} delay={index * 0.1}>
              <Link href={service.link}>
                <Card className="group relative overflow-hidden border border-border/50 rounded-3xl aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
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
                  <div className="absolute inset-x-0 bottom-0 p-6 h-[50%] md:h-full flex items-end">
                    {service.previewImages?.length > 0 ? (
                      <ServicePreviewPopover serviceName={service.title} images={service.previewImages}>
                        <div className="flex flex-col justify-end w-full h-full transition-transform duration-300 md:translate-y-8 group-hover:translate-y-0 relative z-20">
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
                      </ServicePreviewPopover>
                    ) : (
                      <div className="flex flex-col justify-end w-full h-full transition-transform duration-300 md:translate-y-8 group-hover:translate-y-0 relative z-20">
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
                    )}
                  </div>
                </Card>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}