import { Sparkles, Home, Building2, SprayCan, FileText, Calculator, CalendarCheck, CheckCircle, ShieldCheck, ThumbsUp, MapPin, Leaf, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { ServicesBlock } from "./services";

export function HowWeWork() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <div className="hidden md:block absolute top-0 -left-8 text-yellow-400 animate-pulse">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="hidden md:block absolute bottom-0 -right-8 text-yellow-400 animate-pulse delay-300">
            <Sparkles className="w-10 h-10" />
          </div>
          
          <RevealOnScroll>
            <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">Pope Cleaning Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">How We Work</h3>
            <p className="text-xl font-medium text-secondary/80 mb-4 leading-relaxed max-w-3xl mx-auto">
              Family-owned in Perth, delivering detailed residential and commercial cleaning with clear pricing and easy booking.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pope Cleaning Services is a family-owned business based in Perth, WA. We serve both homes and businesses with regular cleaning, spring/deep cleans, vacate/end-of-lease, carpets & upholstery, tiles & grout, and office/commercial cleaning. We focus on high-quality, detailed cleaning rather than rushing through jobs.
            </p>
          </RevealOnScroll>
        </div>

        {/* Our Services Block */}
        <div className="mb-24">
          <ServicesBlock />
        </div>

        {/* Business Model Steps */}
        <div className="mb-24">
          <RevealOnScroll>
            <h3 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-16">Our Business Model – Simple & Transparent</h3>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-10 rounded-full"></div>
            
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: "1. Tell us what you need",
                desc: "Choose a standard service via our estimator or request a custom clean for personalized needs."
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "2. Tailored estimate",
                desc: "We use details like property size and extra tasks to calculate a realistic estimated price."
              },
              {
                icon: <CalendarCheck className="w-8 h-8" />,
                title: "3. We schedule your clean",
                desc: "We confirm a time. A trained, insured team arrives fully equipped across Perth metro."
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "4. Detailed, high-quality cleaning",
                desc: "We focus on thorough work, backed by a satisfaction guarantee and responsive follow-up."
              }
            ].map((step, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.15}>
                <div className="relative flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-white border-4 border-muted flex items-center justify-center text-primary mb-6 shadow-lg z-10 group-hover:border-primary/50 group-hover:-translate-y-2 transition-all duration-300">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-secondary mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-24">
          {[
            { icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Family-owned in Perth" },
            { icon: <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />, text: "100% Satisfaction Guarantee" },
            { icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Fully Insured & Checked" },
            { icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Transparent Quotes" },
            { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Flexible Perth Bookings" },
            { icon: <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Eco-friendly Options" },
          ].map((badge, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.1}>
              <div className="flex items-center gap-2 bg-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="text-accent">{badge.icon}</div>
                <span className="text-xs sm:text-sm font-bold text-secondary">{badge.text}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Main CTA */}
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto bg-white p-12 sm:p-16 rounded-[3rem] shadow-2xl border border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
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
    </section>
  );
}