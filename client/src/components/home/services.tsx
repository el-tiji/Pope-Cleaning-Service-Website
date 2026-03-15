import { ASSETS } from "@/lib/assets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "residential",
    title: "Residential Cleaning",
    description: "Regular or one-off house cleaning tailored to your lifestyle. We dust, vacuum, mop, and sanitize all high-touch surfaces. Includes kitchens, bathrooms, living areas, and bedrooms for a complete home refresh.",
    icon: ASSETS.services.residential,
    color: "bg-blue-50",
  },
  {
    id: "commercial",
    title: "Commercial & Office",
    description: "Maintain a pristine workspace that leaves a lasting impression on clients.",
    icon: ASSETS.services.commercial,
    color: "bg-indigo-50",
  },
  {
    id: "vacate",
    title: "Vacate / End of Lease",
    description: "Guaranteed bond-back cleaning to ease the stress of moving out.",
    icon: ASSETS.services.vacate,
    color: "bg-orange-50",
  },
  {
    id: "carpet",
    title: "Carpet & Upholstery",
    description: "Deep steam cleaning to refresh fibers and remove stubborn stains.",
    icon: ASSETS.services.carpet,
    color: "bg-sky-50",
  },
  {
    id: "tile",
    title: "Tile & Grout",
    description: "High-pressure interior cleaning that makes your floors look brand new.",
    icon: ASSETS.services.tile,
    color: "bg-slate-50",
  },
  {
    id: "pressure",
    title: "Pressure Cleaning",
    description: "Transform driveways, patios, and exteriors with high-power washing.",
    icon: ASSETS.services.pressure,
    color: "bg-cyan-50",
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Expert cleaning for every surface</h3>
          <p className="text-lg text-muted-foreground">
            From cozy apartments to sprawling offices, our comprehensive range of services ensures no speck of dust is left behind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={service.id} className={`border-none soft-shadow-hover bg-background cursor-pointer group`}>
              <CardHeader className="p-6 pb-2">
                <div className={`w-16 h-16 rounded-2xl ${service.color} mb-4 flex items-center justify-center overflow-hidden p-2 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={service.icon.src} alt={service.icon.alt} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <CardTitle className="text-secondary text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2 text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-none bg-primary text-primary-foreground soft-shadow flex flex-col sm:flex-row justify-between items-center text-left p-8 md:col-span-2 lg:col-span-3 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need something else?</h3>
              <p className="text-primary-foreground/80 mb-0 max-w-xl">We offer custom cleaning packages tailored to your specific requirements. Get in touch to discuss your unique needs.</p>
            </div>
            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-secondary transition-colors shrink-0 whitespace-nowrap shadow-lg">
              Get a Custom Quote
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}