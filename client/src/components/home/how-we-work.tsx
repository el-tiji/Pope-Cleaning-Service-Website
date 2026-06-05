import { Sparkles, Home, Building2, SprayCan, FileText, Calculator, CalendarCheck, CheckCircle, ShieldCheck, ThumbsUp, MapPin, Leaf, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ServicesBlock } from "./services";
import { motion } from "framer-motion";

const processSteps = [
  {
    title: "Tell us what you need",
    description: "Choose a standard cleaning service, use our live estimator, or request a custom quote for a special job. Tell us about your property, suburb, timing and any areas that need extra attention.",
    icon: <FileText className="w-7 h-7" />,
    number: "01"
  },
  {
    title: "Get a tailored estimate",
    description: "We prepare an estimate based on your service type, property size, condition, extras and access requirements. For complex jobs, photos help us confirm the most accurate quote.",
    icon: <Calculator className="w-7 h-7" />,
    number: "02"
  },
  {
    title: "We schedule your clean",
    description: "Once the quote is confirmed, we arrange a suitable date and time across Perth metro. Our team arrives prepared with the equipment and products needed for the job.",
    icon: <CalendarCheck className="w-7 h-7" />,
    number: "03"
  },
  {
    title: "We deliver the service",
    description: "We complete the clean with attention to detail, focusing on the areas that matter most. If something reasonable is missed, our satisfaction guarantee means we'll work with you to make it right.",
    icon: <Sparkles className="w-7 h-7" />,
    number: "04"
  }
];

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

        {/* 4-Step Process Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-32">
          {processSteps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 0.15} variant="rise" className="h-full">
              <div 
                className="bg-white group h-[300px] md:h-[350px] rounded-[2rem] p-8 border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(47,127,209,0.12)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-center items-center cursor-default"
                tabIndex={0}
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110" />
                
                {/* DEFAULT STATE: Large Number (Centered) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8 group-focus:opacity-0 group-focus:-translate-y-8 lg:block lg:flex hidden">
                  <span className="text-[120px] font-black text-primary/10 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-primary/30 to-primary/5 drop-shadow-sm">
                    {step.number.replace('0', '')}
                  </span>
                  <span className="text-sm font-bold text-primary tracking-widest uppercase mt-4">
                    Step {step.number.replace('0', '')}
                  </span>
                </div>

                {/* HOVER/MOBILE STATE: Content */}
                <div className="flex flex-col h-full w-full relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:opacity-0 lg:translate-y-12 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-focus:opacity-100 lg:group-focus:translate-y-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                      {step.icon}
                    </div>
                    {/* Number badge for mobile view since the large number is hidden */}
                    <span className="lg:hidden text-3xl font-display font-bold text-primary/20">
                      {step.number}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-secondary mb-3">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
                
                {/* Decorative bottom border on hover */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full group-focus:w-full" />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Section transition for existing Services Block */}
        <RevealOnScroll variant="fade" className="text-center mb-16">
          <h3 className="text-3xl font-bold text-secondary mb-4">Our Cleaning Services at a Glance</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our main residential, commercial and specialty cleaning services below.</p>
        </RevealOnScroll>

        {/* Our Services Block (Existing) */}
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