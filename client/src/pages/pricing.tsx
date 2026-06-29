import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { motion } from "framer-motion";
import {
  Calculator,
  Home,
  Sparkles,
  CheckCircle2,
  Clock,
  PlusCircle,
  CarFront,
  AlertCircle,
  ListChecks,
  ShieldCheck,
  Droplets,
  Camera,
  FileText,
  ArrowRight,
  CalendarCheck,
  CheckCircle
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* 1) HERO SECTION */}
        <section className="container mx-auto px-4 pt-16 pb-20 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6 leading-tight">
                  How Our Cleaning Quotes Are Prepared
                </h1>
                <p className="text-xl text-primary font-medium mb-6">
                  Every property is different. Our quotes are tailored based on your service type, property details, extras, access requirements and cleaning frequency.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We focus on fair, transparent quotes that match the real scope of work needed to clean your home, office or facility properly — with no hidden fees when the job matches the details provided.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book">
                    <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all group">
                      Request a Quote
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-bold border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all">
                      View Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2} variant="slide-left">
              <div className="relative">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[80px] rounded-full -z-10"></div>
                
                <div className="rounded-3xl overflow-hidden border border-border shadow-2xl relative bg-white">
                  <img 
                    src="/images/pricing-hero.png" 
                    alt="Premium 3D quote process illustration" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute top-6 -left-4 bg-white px-4 py-3 rounded-2xl shadow-xl border border-border flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Guarantee</p>
                      <p className="text-sm font-bold text-secondary">No Hidden Fees</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 -right-4 bg-white px-4 py-3 rounded-2xl shadow-xl border border-border flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Tailored</p>
                      <p className="text-sm font-bold text-secondary">Accurate Quotes</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* NEW) BUSINESS MODEL STEPS */}
        <section className="container mx-auto px-4 pb-24">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-16">Our Quote Process – Simple & Transparent</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative max-w-7xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-10 rounded-full"></div>
            
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "1. Choose your service",
                desc: "Select the type of cleaning you need, such as regular cleaning, spring cleaning, vacate cleaning, office cleaning or a custom service."
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "2. Share your property details",
                desc: "Tell us about the type of property, size, number of rooms, bathrooms, showers, kitchens and any additional areas."
              },
              {
                icon: <PlusCircle className="w-8 h-8" />,
                title: "3. Add extras and special requirements",
                desc: "Include any extras such as windows, oven, fridge, carpets, upholstery, outdoor areas, trash removal or other detailed cleaning tasks."
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "4. Receive a tailored quote",
                desc: "Our team reviews the details and prepares a quote that reflects the real time, effort and scope required."
              }
            ].map((step, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.15}>
                <div className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-white border-4 border-muted flex items-center justify-center text-primary mb-6 shadow-lg z-10 group-hover:border-primary/50 group-hover:-translate-y-2 transition-all duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* 2) WHAT AFFECTS YOUR PRICE */}
        <section className="bg-background py-24 border-y border-border/50 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <RevealOnScroll>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">What Affects Your Cleaning Quote?</h2>
                <p className="text-lg text-muted-foreground">
                  Your cleaning quote is based on the information you provide and the level of work required. The more accurate the property details, extras and access information, the easier it is for our team to prepare a fair and reliable quote.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Factor Cards */}
              <RevealOnScroll delay={0.1}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  {/* Default State: Icon and Title (Centered) */}
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <Home className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Property or Facility Type</h3>
                  </div>
                  
                  {/* Hover State: Full Content */}
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <Home className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Property or Facility Type</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A house, apartment, townhouse, office, showroom, warehouse or commercial facility may require different cleaning methods, time and equipment.
                    </p>
                  </div>
                  
                  {/* Decorative bottom border on hover */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.2}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Type of Cleaning</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <Sparkles className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Type of Cleaning</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Regular cleaning, spring cleaning, vacate cleaning, office cleaning, carpet cleaning, tile and grout cleaning or custom jobs each require a different level of detail.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.3}>
                 <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Size of the Property</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <FileText className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Size of the Property</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The approximate internal area, number of floors and overall layout help determine the time and resources needed for the job.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.4}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <ListChecks className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Property Characteristics</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <ListChecks className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Property Characteristics</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Bedrooms, bathrooms, showers, toilets, kitchens, living areas, workstations and additional zones all influence the final scope of work.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.5}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <PlusCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Extras & Additional Cleaning</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <PlusCircle className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Extras & Additional Cleaning</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Extras such as oven cleaning, fridge cleaning, interior windows, exterior windows, carpet steam cleaning, upholstery, pressure cleaning, trash removal or garden tidy-up can be added to the quote.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.6}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <CarFront className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Access & Logistics</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <CarFront className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Access & Logistics</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Parking, stairs, lift access, pets, security entry, after-hours requirements, distance and special site conditions may affect scheduling and quote preparation.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.7}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <CalendarCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Cleaning Frequency</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <CalendarCheck className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Cleaning Frequency</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Regular bookings such as weekly, twice-weekly, fortnightly or monthly cleaning may qualify for frequency-based discounts depending on the service type and schedule.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.8}>
                <div className="group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-border h-[280px] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center items-center text-center">
                  
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:-translate-y-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary shadow-sm border border-primary/20">
                      <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Photos & Special Notes</h3>
                  </div>
                  
                  <div className="flex flex-col h-full w-full p-8 relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 text-left bg-white">
                    <div className="flex items-start gap-4 mb-4 border-b border-border/50 pb-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <Camera className="w-5 h-5" />
                       </div>
                       <h3 className="text-lg font-bold text-secondary leading-tight">Photos & Special Notes</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Clear photos and detailed notes help us understand stains, priority areas, fragile items, access instructions and any special requirements before confirming your quote.
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 3) WHY CHOOSE POPE CLEANING SERVICES (Moved & Redesigned) */}
        <section className="bg-secondary text-white py-24 relative overflow-hidden">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 z-0">
             <img src="/images/pricing-services-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-10" />
             <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply"></div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <RevealOnScroll>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Choose Pope Cleaning Services?</h2>
                <p className="text-lg text-white/80">
                  When comparing cleaning companies, price matters — but reliability, preparation, communication and quality matter just as much. Pope Cleaning Services focuses on delivering a professional experience from quote to completion.
                </p>
              </div>
            </RevealOnScroll>

            {/* Floating Bubbles Section */}
            <div className="relative h-[650px] md:h-[600px] w-full max-w-5xl mx-auto mb-16 overflow-hidden md:overflow-visible">
              {[
                { title: "Transparent Quote Process", size: "w-32 h-32 md:w-44 md:h-44", left: "5%", top: "5%", delay: 0 },
                { title: "No Hidden Fees", size: "w-28 h-28 md:w-40 md:h-40", left: "40%", top: "0%", delay: 1.5 },
                { title: "Quality-Focused Cleaning", size: "w-36 h-36 md:w-48 md:h-48", left: "75%", top: "15%", delay: 0.5 },
                { title: "Family-Run Perth Business", size: "w-32 h-32 md:w-44 md:h-44", left: "10%", top: "45%", delay: 2 },
                { title: "Flexible Service Options", size: "w-28 h-28 md:w-36 md:h-36", left: "45%", top: "35%", delay: 0.8 },
                { title: "100% Satisfaction Guarantee", size: "w-36 h-36 md:w-52 md:h-52", left: "70%", top: "55%", delay: 2.5 },
                { title: "Prepared For The Job", size: "w-32 h-32 md:w-40 md:h-40", left: "20%", top: "75%", delay: 1.2 },
                { title: "Clear Communication", size: "w-32 h-32 md:w-48 md:h-48", left: "50%", top: "70%", delay: 0.3 }
              ].map((bubble, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    y: ["0%", "-15%", "5%", "0%"],
                    x: ["0%", "10%", "-10%", "0%"],
                  }}
                  transition={{
                    duration: 12 + (idx % 3) * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: bubble.delay,
                  }}
                  className={`absolute ${bubble.size} rounded-full bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-md border border-white/40 flex items-center justify-center p-4 md:p-6 text-center hover:scale-110 transition-transform duration-300 cursor-default group z-10 shadow-2xl`}
                  style={{
                    left: bubble.left,
                    top: bubble.top,
                    boxShadow: "inset -5px -5px 15px rgba(255,255,255,0.1), inset 5px 5px 15px rgba(255,255,255,0.6), 0 10px 30px rgba(0,0,0,0.1)"
                  }}
                >
                  <span className="font-bold text-white text-[13px] sm:text-sm md:text-base leading-tight drop-shadow-md z-10">
                    {bubble.title}
                  </span>
                  
                  {/* Bubble reflection/highlight */}
                  <div className="absolute top-[15%] left-[20%] w-[30%] h-[15%] bg-white/60 rounded-full blur-[1px] transform -rotate-[30deg]"></div>
                  <div className="absolute bottom-[15%] right-[20%] w-[15%] h-[10%] bg-white/30 rounded-full blur-[1px] transform -rotate-[30deg]"></div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </motion.div>
              ))}
            </div>

            <RevealOnScroll delay={0.4}>
              <div className="text-center">
                <p className="text-white/80 mb-6 font-medium text-[20px]">Ready to experience a detailed, professional clean?</p>
                <Link href="/book">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-accent text-secondary hover:bg-white transition-colors gap-2 group">
                    Request a Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* 6) OUR STANDARD-BASED PRICE EXAMPLE (Kept & Updated Title) */}
        <section className="container mx-auto px-4 py-24 border-t border-border/50">
          <RevealOnScroll>
            <div className="rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto" style={{ background: 'linear-gradient(135deg, var(--brand-navy-deep) 0%, var(--brand-navy) 100%)' }}>
              {/* Background Accents */}
              <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-8 -translate-y-8">
                <Calculator className="w-64 h-64" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">Our Standard-Based Price Benchmark</h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl leading-relaxed">
                  The estimator uses a standard reference clean to set expectations. We've structured our baseline around a typical single-storey Perth home.
                </p>

                <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm mb-8">
                  <div>
                    <h3 className="font-bold text-xl mb-6 text-white">The Base Scenario Includes:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Home className="w-4 h-4" /></div>
                        3 Bedrooms
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><Droplets className="w-4 h-4" /></div>
                        2 Bathrooms & 2 Showers
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><CheckCircle2 className="w-4 h-4" /></div>
                        1 Separate Toilet
                      </li>
                      <li className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent"><ShieldCheck className="w-4 h-4" /></div>
                        1 Floor (Single Level)
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center text-center p-8 bg-black/20 rounded-2xl border border-white/5">
                    <Clock className="w-16 h-16 text-accent mb-4" />
                    <h4 className="text-2xl font-bold mb-2 text-[#ffffff]">Approx. 2 Hours</h4>
                    <p className="text-sm text-white/70">For this benchmark property, a standard clean is assumed to take approximately 2 hours with our normal scope of work.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between bg-primary/20 p-6 rounded-2xl border border-primary/30">
                  <div className="flex items-start gap-3 flex-1">
                    <PlusCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">If your home is larger, has more bathrooms, extra levels, or needs a deeper clean, the estimated time and price will increase.</p>
                  </div>
                  <div className="hidden sm:block w-px bg-primary/30"></div>
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-white/90">If your home is smaller or requires less work, your estimate may be lower.</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* 4) HOW THE ESTIMATOR CALCULATES YOUR PRICE */}
        <section className="bg-primary/5 py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">How the Live Estimator Calculates Your Price</h2>
                <p className="text-lg text-muted-foreground">A step-by-step look at the logic behind your custom quote.</p>
              </div>
            </RevealOnScroll>

            <div className="space-y-6">
              {/* Steps */}
              {[
                { step: 1, title: "Base plan", desc: "Starts from your chosen plan: Regular, Spring, Vacate or Office cleaning." },
                { step: 2, title: "Property details", desc: "Adjusts for bedrooms, bathrooms, showers, floors and approximate size." },
                { step: 3, title: "Extras and additional zones", desc: "Adds extras such as windows, oven, fridge, carpets, upholstery, outdoor areas, trash removal, etc." },
                { step: 4, title: "Access and logistics", desc: "Considers parking, stairs, pets, heavy dust or other special conditions." },
                { step: 5, title: "Time and quality", desc: "Converts the workload into estimated cleaning hours based on our quality standards." },
                { step: 6, title: "Final estimate", desc: "Combines all of the above into an 'Estimated total before final confirmation'." }
              ].map((s, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <div className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary mb-2">{s.title}</h3>
                      <p className="text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.3}>
              <div className="mt-12 bg-white/60 p-6 rounded-2xl flex items-start gap-4 border border-border">
                <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground italic">
                  <strong>Disclaimer:</strong> Your live estimate is based on the information you provide. Final confirmation may change after we review your photos or if the actual conditions are very different from the description.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* 5) WHY QUALITY AND TIME MATTER */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Why Quality and Time Matter for Your Cleaning Price</h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Pope Cleaning focuses on clean, detailed and consistent results, not on rushing. 
                Spending the right amount of time is essential. Rushing leads to missed areas and poor results, so your price reflects the time needed to do the job properly.
              </p>
            </RevealOnScroll>

            <div className="grid sm:grid-cols-3 gap-8">
              <RevealOnScroll delay={0.1}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-secondary mb-2">Sparkling Surfaces</h4>
                  <p className="text-sm text-muted-foreground">Proper bathroom and kitchen sanitation takes meticulous care.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-secondary mb-2">Adequate Time</h4>
                  <p className="text-sm text-muted-foreground">Detailed dusting and thorough cleaning cannot be done in a rush.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 mb-6">
                    <ListChecks className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-secondary mb-2">Correct Methods</h4>
                  <p className="text-sm text-muted-foreground">Ensuring the correct use of equipment, checklists, and safe products.</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* 6) HOW TO GET THE MOST ACCURATE ESTIMATE */}
        <section className="text-white py-24" style={{ background: 'linear-gradient(135deg, var(--brand-navy-deep) 0%, var(--brand-navy) 100%)' }}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <RevealOnScroll>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#ffffff]">How to Get the Most Accurate Estimate</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><FileText className="w-4 h-4 text-accent" /></div>
                    <p className="text-white/80">Fill in all the fields in the estimator carefully (rooms, extras, access conditions).</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-accent" /></div>
                    <p className="text-white/80">Choose the cleaning type that best matches your needs (Regular vs Spring vs Vacate vs Office).</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><AlertCircle className="w-4 h-4 text-accent" /></div>
                    <p className="text-white/80">Be honest about the condition of the property (light, standard or heavy).</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><Camera className="w-4 h-4 text-accent" /></div>
                    <p className="text-white/80">Upload clear photos of key areas (kitchen, bathrooms, living room, bedrooms and any problem areas).</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><ListChecks className="w-4 h-4 text-accent" /></div>
                    <p className="text-white/80">Use the notes box to tell us about stains, fragile items and priorities.</p>
                  </li>
                </ul>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm text-center">
                  <h3 className="text-2xl font-bold mb-4 text-[#ffffff]">Ready for your quote?</h3>
                  <p className="text-white/70 mb-8">Take 2 minutes to fill out our interactive booking form and see your custom live estimate immediately.</p>
                  <Link href="/book">
                    <Button size="lg" className="w-full rounded-full h-14 text-lg font-bold bg-accent text-secondary hover:bg-white transition-colors gap-2 group">
                      Open the Live Price Estimator
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="text-xs text-white/50 mt-6">
                    Have questions about your estimate? <br/>
                    Contact us for a custom quote or message us on WhatsApp.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
