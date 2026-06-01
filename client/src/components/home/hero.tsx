import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/assets";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function Hero() {
  const carouselImages = [
    "/assets/tiltshift/home/hero-1.png",
    "/assets/tiltshift/home/hero-4.png",
    "/assets/tiltshift/home/hero-5.png",
    "/assets/tiltshift/home/hero-2.png",
    "/assets/tiltshift/home/hero-3.png",
    "/assets/tiltshift/home/hero-6.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoPlayInterval = 5000; // 5 seconds
  const progressUpdateInterval = 50; // Update progress bar every 50ms

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextImage();
          return 0;
        }
        return prev + (100 / (autoPlayInterval / progressUpdateInterval));
      });
    }, progressUpdateInterval);

    return () => clearInterval(progressTimer);
  }, [currentImageIndex]); // Reset timer when image changes manually

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    setProgress(0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setProgress(0);
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setProgress(0);
  }

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-pattern opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-2xl">
            <RevealOnScroll delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-secondary font-medium text-sm mb-6 border border-accent/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Perth's Premium Cleaning Service
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-secondary leading-[1.1]">
                Fresh. <span className="text-gradient">Spotless.</span> <br />
                Perfectly Done.
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We bring the shine back to Perth homes and offices. Professional, reliable, and equipped to handle any mess with our signature 3D-level precision.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/services">
                  <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    View Our Services
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.5}>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                      <img src={`/assets/tiltshift/avatars/avatar-${i}.png`} alt="User avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <Link href="/reviews" className="flex flex-col hover:opacity-80 transition-opacity">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {/* Stars */}
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-secondary hover:underline underline-offset-4 decoration-primary/30">500+ Happy Perth Locals</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
          
            <RevealOnScroll delay={0.3} className="relative" variant="zoom">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3 scale-105 blur-xl -z-10 animate-pulse duration-3000"></div>
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-white/50 relative hover:shadow-3xl transition-shadow duration-500">
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in zoom-in duration-1000 delay-300 z-20 hover:scale-105 hover:-rotate-3 transition-transform cursor-default">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Guarantee</p>
                  <p className="text-sm font-bold text-secondary">100% Satisfaction</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-[2rem] bg-muted/20 group">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/20 z-10">
                  <div 
                    className="h-full bg-primary transition-all ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {carouselImages.map((src, index) => (
                    <img 
                      key={index}
                      src={src} 
                      alt={`Cleaning scene ${index + 1}`} 
                      className="w-full h-auto object-cover min-w-full shrink-0"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
                
                {/* Carousel Controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={prevImage}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1.5 px-3 bg-white/80 backdrop-blur rounded-full shadow-md">
                    {carouselImages.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => goToImage(idx)}
                        className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${idx === currentImageIndex ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/50'}`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={nextImage}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          
        </div>
      </div>
    </section>
  );
}