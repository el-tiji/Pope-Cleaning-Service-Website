import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

interface CollageImage {
  src: string;
  alt: string;
  initialRotation: number;
  initialX: number;
  initialY: number;
  detailText: string;
}

export const SERVICE_COLLAGES: Record<string, CollageImage[]> = {
  residential: [
    { src: "/assets/collage/residential-1.jpg", alt: "Living room being cleaned", initialRotation: -4, initialX: -20, initialY: -20, detailText: "General tidy of all rooms, dusting of surfaces, vacuum and mop of floors, kitchen benches and stovetop." },
    { src: "/assets/collage/residential-2.jpg", alt: "Clean kitchen", initialRotation: 3, initialX: 40, initialY: 10, detailText: "Bathroom and toilet sanitising, mirrors cleaned, and all accessible surfaces wiped down." },
    { src: "/assets/collage/residential-3.jpg", alt: "Bedroom setup", initialRotation: -2, initialX: 0, initialY: 50, detailText: "Cobweb removal, skirting boards dusted, and general living spaces refreshed." },
    { src: "/assets/collage/residential-4.jpg", alt: "Fresh laundry", initialRotation: 5, initialX: -40, initialY: 30, detailText: "Optional add-ons for changing bed linens and folding laundry available." }
  ],
  spring: [
    { src: "/assets/collage/spring-1.jpg", alt: "Deep cleaning kitchen", initialRotation: -5, initialX: -10, initialY: -30, detailText: "Inside oven and microwave cleaning, rangehood degreasing." },
    { src: "/assets/collage/spring-2.jpg", alt: "Window washing", initialRotation: 2, initialX: 30, initialY: -10, detailText: "Interior window washing, tracks, and sill cleaning." },
    { src: "/assets/collage/spring-3.jpg", alt: "Behind furniture", initialRotation: -3, initialX: -30, initialY: 40, detailText: "Moving light furniture to vacuum/mop behind and underneath." },
    { src: "/assets/collage/spring-4.jpg", alt: "Cupboard detailing", initialRotation: 4, initialX: 20, initialY: 50, detailText: "Wiping down the front of all cupboards, doors, and door frames." },
    { src: "/assets/collage/spring-5.jpg", alt: "Wall washing", initialRotation: -1, initialX: 50, initialY: 20, detailText: "Spot cleaning of walls and detailed skirting board washing." }
  ],
  vacate: [
    { src: "/assets/collage/vacate-1.jpg", alt: "Empty living room", initialRotation: -3, initialX: -40, initialY: -20, detailText: "Full bond-focused clean guaranteed to meet real estate agent standards." },
    { src: "/assets/collage/vacate-2.jpg", alt: "Sparkling bathroom", initialRotation: 4, initialX: 10, initialY: -40, detailText: "Deep scrubbing of showers, baths, toilets, removing soap scum and build-up." },
    { src: "/assets/collage/vacate-3.jpg", alt: "Kitchen cupboards", initialRotation: -2, initialX: 40, initialY: 10, detailText: "Inside and outside of all kitchen cupboards, drawers, and pantry." },
    { src: "/assets/collage/vacate-4.jpg", alt: "Oven deep clean", initialRotation: 5, initialX: -20, initialY: 40, detailText: "Comprehensive oven, stovetop, and exhaust fan degreasing." },
    { src: "/assets/collage/vacate-5.jpg", alt: "Clean floors", initialRotation: -4, initialX: 30, initialY: 50, detailText: "Intensive vacuuming and mopping of all hard floors." }
  ],
  carpet: [
    { src: "/assets/collage/carpet-1.jpg", alt: "Carpet steam cleaning", initialRotation: 2, initialX: -30, initialY: -10, detailText: "Hot water extraction (steam cleaning) to remove deep-seated dirt and allergens." },
    { src: "/assets/collage/carpet-2.jpg", alt: "Stain treatment", initialRotation: -5, initialX: 30, initialY: -20, detailText: "Targeted pre-treatment for stubborn stains and heavy traffic areas." },
    { src: "/assets/collage/carpet-3.jpg", alt: "Upholstery cleaning", initialRotation: 3, initialX: -10, initialY: 40, detailText: "Professional fabric sofa and armchair cleaning and deodorising." },
    { src: "/assets/collage/carpet-4.jpg", alt: "Rug cleaning", initialRotation: -2, initialX: 40, initialY: 30, detailText: "Careful cleaning of delicate rugs, including Persian and synthetic blends." }
  ],
  tile: [
    { src: "/assets/collage/tile-1.jpg", alt: "Tile scrubbing", initialRotation: -4, initialX: -20, initialY: -20, detailText: "High-pressure, heated scrubbing to lift dirt from textured tiles." },
    { src: "/assets/collage/tile-2.jpg", alt: "Grout restoration", initialRotation: 3, initialX: 30, initialY: -10, detailText: "Specialized solutions to brighten and restore discoloured grout lines." },
    { src: "/assets/collage/tile-3.jpg", alt: "Bathroom tiles", initialRotation: -2, initialX: -30, initialY: 40, detailText: "Removal of mold, mildew, and soap scum from bathroom wall and floor tiles." },
    { src: "/assets/collage/tile-4.jpg", alt: "Kitchen floors", initialRotation: 5, initialX: 20, initialY: 50, detailText: "Deep degreasing for kitchen floors to remove sticky residues." }
  ],
  office: [
    { src: "/assets/collage/office-1.jpg", alt: "Clean desks", initialRotation: 2, initialX: -30, initialY: -20, detailText: "Dusting and wiping down of all desks, monitors, and workstation areas." },
    { src: "/assets/collage/office-2.jpg", alt: "Office kitchen", initialRotation: -4, initialX: 30, initialY: -10, detailText: "Sanitising communal kitchens, break rooms, microwaves, and fridges." },
    { src: "/assets/collage/office-3.jpg", alt: "Meeting room", initialRotation: 3, initialX: -10, initialY: 40, detailText: "Preparation of meeting rooms, arranging chairs, and cleaning glass partitions." },
    { src: "/assets/collage/office-4.jpg", alt: "Office floors", initialRotation: -2, initialX: 40, initialY: 30, detailText: "Thorough vacuuming of office carpets and mopping of hard floors." }
  ],
  pressure: [
    { src: "/assets/collage/pressure-1.jpg", alt: "Driveway cleaning", initialRotation: -3, initialX: -20, initialY: -30, detailText: "High-pressure washing of concrete and paved driveways to remove oil and dirt." },
    { src: "/assets/collage/pressure-2.jpg", alt: "Patio washing", initialRotation: 4, initialX: 30, initialY: -10, detailText: "Revitalising outdoor entertainment areas, patios, and deckings." },
    { src: "/assets/collage/pressure-3.jpg", alt: "Pathway cleaning", initialRotation: -2, initialX: -30, initialY: 40, detailText: "Clearing moss, algae, and grime from garden paths and walkways." },
    { src: "/assets/collage/pressure-4.jpg", alt: "Exterior walls", initialRotation: 5, initialX: 20, initialY: 40, detailText: "Soft washing for exterior house walls and eaves to remove dust and cobwebs." }
  ]
};

interface ServiceCollageProps {
  serviceId: string;
  className?: string;
}

export function ServiceCollage({ serviceId, className = "" }: ServiceCollageProps) {
  const images = SERVICE_COLLAGES[serviceId];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Responsive check for mobile (stacked view instead of complex collage)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <RevealOnScroll className={`relative w-full ${className}`}>
      {/* Detail Text Overlay/Popover */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-primary/20 pointer-events-none
              ${isMobile ? 'bottom-0 left-4 right-4 translate-y-full mt-4' : 'bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-sm'}
            `}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-l border-t border-primary/20 rotate-45" />
            <p className="text-sm font-medium text-secondary text-center relative z-10">
              {images[activeIndex].detailText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={containerRef}
        className={`relative w-full aspect-square max-w-[800px] xl:max-w-[900px] mx-auto ${isMobile ? 'h-[450px] mb-24' : 'h-[600px] md:h-[750px]'}`}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {images.map((img, idx) => {
          const isActive = activeIndex === idx;
          const isOtherActive = activeIndex !== null && activeIndex !== idx;
          
          return (
            <motion.div
              key={idx}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(isActive ? null : idx)}
              onBlur={() => setActiveIndex(null)}
              className="absolute left-1/2 top-1/2 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 rounded-xl"
              animate={isActive ? {
                x: "-50%",
                y: "-50%",
                rotate: 0,
                scale: isMobile ? 1.05 : 1.1,
                zIndex: 40,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              } : {
                x: `calc(-50% + ${isMobile ? img.initialX * 1.2 : img.initialX * 1.8}px)`,
                y: `calc(-50% + ${isMobile ? img.initialY * 1.2 : img.initialY * 1.8}px)`,
                rotate: img.initialRotation,
                scale: isOtherActive ? 0.95 : 1,
                zIndex: idx,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                opacity: isOtherActive ? 0.6 : 1,
                filter: isOtherActive ? "brightness(0.9) grayscale(20%) blur(1px)" : "brightness(1) grayscale(0%) blur(0px)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 1.5
              }}
              style={{
                width: isMobile ? "85%" : "80%",
                maxWidth: isMobile ? "320px" : "480px",
                aspectRatio: "4/3",
              }}
            >
              {/* Polaroid Frame */}
              <div className="w-full h-full bg-white p-2 md:p-3 rounded-xl shadow-inner border border-black/5 overflow-hidden flex flex-col">
                <div className="relative flex-1 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </RevealOnScroll>
  );
}
