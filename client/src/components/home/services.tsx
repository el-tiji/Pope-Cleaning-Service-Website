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
  },
  {
    id: "car",
    title: "Car Detailing",
    description: "Interior deep cleaning to make your daily commute feel luxurious.",
    icon: ASSETS.services.car,
    color: "bg-gray-50",
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-3">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Expert cleaning for every surface</h3>
          <p className="text-lg text-muted-foreground">
            From cozy apartments to sprawling offices, our comprehensive range of services ensures no speck of dust is left behind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={service.id} className={`border-none soft-shadow-hover bg-background cursor-pointer group ${index === 0 ? 'lg:col-span-2 lg:row-span-2 flex flex-col justify-between' : ''}`}>
              <CardHeader className={`${index === 0 ? 'p-8 pb-4' : 'p-6 pb-2'}`}>
                <div className={`w-16 h-16 rounded-2xl ${service.color} mb-4 flex items-center justify-center overflow-hidden p-2 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={service.icon.src} alt={service.icon.alt} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <CardTitle className={`text-secondary ${index === 0 ? 'text-3xl' : 'text-xl'}`}>{service.title}</CardTitle>
                <CardDescription className={`text-muted-foreground mt-2 ${index === 0 ? 'text-lg' : 'text-base'}`}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className={`${index === 0 ? 'p-8 pt-0' : 'p-6 pt-2'}`}>
                <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-none bg-primary text-primary-foreground soft-shadow flex flex-col justify-center items-center text-center p-8">
            <h3 className="text-2xl font-bold mb-4">Need something else?</h3>
            <p className="text-primary-foreground/80 mb-6">We offer custom cleaning packages tailored to your specific requirements.</p>
            <button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-secondary transition-colors w-full">
              Get a Custom Quote
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}