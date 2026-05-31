import { ASSETS } from "@/lib/assets";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

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
      </div>
    </section>
  );
}