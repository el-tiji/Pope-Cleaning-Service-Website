import { Sparkles, Home, Building2, SprayCan, FileText, Calculator, CalendarCheck, CheckCircle, ShieldCheck, ThumbsUp, MapPin, Leaf, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ServicesBlock } from "./services";
import { motion } from "framer-motion";

export function HowWeWork() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          <div className="hidden md:block absolute top-0 -left-8 text-yellow-400 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="hidden md:block absolute bottom-0 -right-8 text-yellow-400 animate-pulse delay-300">
            <Sparkles className="w-10 h-10" />
          </div>
          
          <RevealOnScroll>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">How We Work</h3>
            <p className="text-xl font-medium text-secondary/80 mb-4 leading-relaxed max-w-3xl mx-auto">Family-owned in Perth, delivering detailed residential and commercial cleaning with clear pricing and easy booking.  We focus on high-quality, detailed cleaning rather than rushing through jobs.</p>
          </RevealOnScroll>
        </div>

        {/* Our Services Block */}
        <div className="mb-32 md:mb-48">
          <ServicesBlock />
        </div>

        {/* Main CTA with Decorative Bubbles */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Absolute Bubbles */}
          <div className="hidden lg:block">
            {[
              { text: "Family-owned in Perth", className: "-top-6 -left-16", delay: 0, icon: <Users className="w-4 h-4 text-primary" /> },
              { text: "100% Satisfaction Guarantee", className: "-top-12 right-0", delay: 0.2, icon: <ThumbsUp className="w-4 h-4 text-primary" /> },
              { text: "Eco-friendly Options", className: "top-1/2 -translate-y-1/2 -left-28", delay: 0.4, icon: <Leaf className="w-4 h-4 text-primary" /> },
              { text: "Flexible Perth Bookings", className: "top-1/2 -translate-y-1/2 -right-24", delay: 0.1, icon: <MapPin className="w-4 h-4 text-primary" /> },
              { text: "Transparent Quotes", className: "-bottom-6 left-4", delay: 0.5, icon: <FileText className="w-4 h-4 text-primary" /> },
              { text: "Fully Insured & Checked", className: "-bottom-10 right-12", delay: 0.3, icon: <ShieldCheck className="w-4 h-4 text-primary" /> },
            ].map((bubble, idx) => (
              <RevealOnScroll key={idx} delay={bubble.delay} variant="zoom" className={`absolute z-20 ${bubble.className}`}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: "easeInOut", delay: bubble.delay }}
                  className="group flex items-center gap-2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-primary/20 text-secondary font-bold text-sm hover:scale-110 hover:shadow-primary/20 transition-all cursor-default overflow-hidden"
                >
                  <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:mr-1 transition-all duration-300 overflow-hidden flex items-center">
                    {bubble.icon}
                  </div>
                  {bubble.text}
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Mobile Stacked Bubbles */}
          <div className="lg:hidden flex flex-wrap justify-center gap-3 mb-10">
            {[
              { text: "Family-owned in Perth", icon: <Users className="w-3.5 h-3.5 text-primary" /> },
              { text: "100% Satisfaction Guarantee", icon: <ThumbsUp className="w-3.5 h-3.5 text-primary" /> },
              { text: "Eco-friendly Options", icon: <Leaf className="w-3.5 h-3.5 text-primary" /> },
              { text: "Flexible Perth Bookings", icon: <MapPin className="w-3.5 h-3.5 text-primary" /> },
              { text: "Transparent Quotes", icon: <FileText className="w-3.5 h-3.5 text-primary" /> },
              { text: "Fully Insured & Checked", icon: <ShieldCheck className="w-3.5 h-3.5 text-primary" /> }
            ].map((bubble, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1} variant="zoom">
                <div className="group flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-primary/20 text-secondary font-bold text-xs text-center hover:scale-105 transition-all overflow-hidden">
                  <div className="w-0 opacity-0 group-hover:w-3.5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center">
                    {bubble.icon}
                  </div>
                  {bubble.text}
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto bg-white p-12 sm:p-16 rounded-[3rem] shadow-2xl border border-primary/10 relative overflow-hidden z-10">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-20">
                <h3 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Ready to experience a detailed, professional clean?</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">Let's make your home or workplace feel like new.</p>
                <Link href="/book">
                  <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold shadow-xl shadow-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all">
                    Book a Clean
                  </Button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        
      </div>
    </section>
  );
}