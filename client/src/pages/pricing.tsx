import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Info, Calculator, Sparkles, CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-16 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">How Our Pricing Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in 100% transparent pricing. No hidden fees, no surprises. 
              Here is a clear breakdown of how we calculate your custom cleaning estimate.
            </p>
          </div>

          {/* Core Methodology */}
          <section className="mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-secondary">The Pricing Formula</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">Step 1</span>
                  <h3 className="text-xl font-bold text-secondary mb-2">Base Price</h3>
                  <p className="text-sm text-muted-foreground">Every plan starts with a standard base price covering a standard 3x2 property.</p>
                </div>
                <div className="hidden md:flex items-center justify-center text-muted-foreground">
                  <span className="text-4xl">+</span>
                </div>
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">Step 2</span>
                  <h3 className="text-xl font-bold text-secondary mb-2">Property Size</h3>
                  <p className="text-sm text-muted-foreground">Additional rooms, floors, or extra square meterage adjust the total slightly.</p>
                </div>
                <div className="hidden md:flex items-center justify-center text-muted-foreground">
                  <span className="text-4xl">+</span>
                </div>
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <span className="text-sm font-bold text-primary uppercase tracking-wider mb-2 block">Step 3</span>
                  <h3 className="text-xl font-bold text-secondary mb-2">Custom Extras</h3>
                  <p className="text-sm text-muted-foreground">Add specific tasks like carpet cleaning, oven detailing, or balcony sweeps.</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-muted-foreground inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <Info className="w-4 h-4" />
                  Finally, a 10% GST is applied to your final subtotal.
                </p>
              </div>
            </div>
          </section>

          {/* Base Plans */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Standard Base Prices</h2>
            <p className="text-center text-muted-foreground mb-8">
              Our standard baseline covers up to 3 bedrooms, 2 bathrooms, 2 showers, 1 toilet, and 1 floor. 
              If your property is this size or smaller, you only pay the base price!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Regular */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                <h3 className="text-xl font-bold text-secondary mb-2">Regular Cleaning</h3>
                <div className="text-3xl font-bold text-primary mb-4">$90<span className="text-lg text-muted-foreground font-normal"> base</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    General dusting & wiping
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Floors vacuumed & mopped
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Save 10% for Fortnightly
                  </li>
                </ul>
              </div>

              {/* Spring */}
              <div className="bg-secondary rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-2">Spring Cleaning</h3>
                <div className="text-3xl font-bold text-accent mb-4">$250<span className="text-lg text-white/60 font-normal"> base</span></div>
                <ul className="space-y-3 mb-6 relative z-10">
                  <li className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    Deep scrub of all surfaces
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    Skirting boards & door frames
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    Internal cobweb removal
                  </li>
                </ul>
              </div>

              {/* Vacate */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                <h3 className="text-xl font-bold text-secondary mb-2">Vacate Cleaning</h3>
                <div className="text-3xl font-bold text-primary mb-4">$400<span className="text-lg text-muted-foreground font-normal"> base</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    End of lease guarantee
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Includes Oven (Inside)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Includes Window Cleaning
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Size Modifiers */}
          <section className="mb-16">
            <div className="bg-muted/30 rounded-3xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-secondary mb-6 text-center">How Property Size Affects Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-4">Extra Rooms</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">Extra Bedroom (above 3)</span>
                      <span className="font-semibold text-secondary">+$20</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">Extra Bathroom (above 2)</span>
                      <span className="font-semibold text-secondary">+$40</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">Extra Floor Level (above 1)</span>
                      <span className="font-semibold text-secondary">+$30</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-4">Internal Area (SQM)</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">121 - 180 sqm</span>
                      <span className="font-semibold text-secondary">+$20</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">181 - 250 sqm</span>
                      <span className="font-semibold text-secondary">+$40</span>
                    </li>
                    <li className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground">350+ sqm</span>
                      <span className="font-semibold text-secondary">+$90</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary mb-6">Ready to see your exact price?</h2>
            <Link href="/book">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
                Get a Live Estimate Now
              </Button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
