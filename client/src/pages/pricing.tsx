import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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
  ArrowRight
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* 1) HERO SECTION */}
        <section className="container mx-auto px-4 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6 leading-tight">
                How Our Cleaning Prices Are Calculated
              </h1>
              <p className="text-xl text-primary font-medium mb-6">
                Transparent pricing based on your home, the level of detail and the time it takes to clean properly – not just a generic flat rate.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every home or office is different. The live estimated price in our booking section uses the information you provide about size, rooms, extras and access to give you a customized, accurate quote before we even step through the door.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden bg-muted/20 flex items-center justify-center shadow-2xl group">
              <img
                src="/assets/tiltshift/pricing/hero.png"
                alt="Bright, tilt-shift scene of a very clean Perth-style home with a timer representing efficiency"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </section>

        {/* 2) WHAT AFFECTS YOUR PRICE */}
        <section className="bg-muted/30 py-24 border-y border-border/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">What Affects Your Live Estimated Price?</h2>
              <p className="text-lg text-muted-foreground">
                Our live estimated price combines all of these factors to give you a realistic estimate before we arrive, instead of a generic flat rate.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Factor Cards */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <Home className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Size of the property</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Number of bedrooms, bathrooms, showers and overall floor area.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <ListChecks className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Type of clean</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Regular Cleaning, Spring Cleaning, Vacate Cleaning or Office Cleaning.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <Sparkles className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Level of detail</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Standard maintenance clean vs deeper, detail-focused cleaning for neglected areas.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <PlusCircle className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Extras & additional zones</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Windows, oven, fridge, carpets, upholstery, outdoor areas, etc.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <CarFront className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Access and logistics</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Stairs without lift, limited parking, heavy dust or construction residue, pets, etc.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <Clock className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold text-secondary mb-3">Time required</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">The number of hours needed to clean properly to our high standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3) OUR STANDARD-BASED PRICE EXAMPLE */}
        <section className="container mx-auto px-4 py-24">
          <div className="bg-secondary rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
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
        </section>

        {/* 4) HOW THE ESTIMATOR CALCULATES YOUR PRICE */}
        <section className="bg-primary/5 py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">How the Live Estimator Calculates Your Price</h2>
              <p className="text-lg text-muted-foreground">A step-by-step look at the logic behind your custom quote.</p>
            </div>

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
                <div key={i} className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2">{s.title}</h3>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/60 p-6 rounded-2xl flex items-start gap-4 border border-border">
              <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground italic">
                <strong>Disclaimer:</strong> Your live estimate is based on the information you provide. Final confirmation may change after we review your photos or if the actual conditions are very different from the description.
              </p>
            </div>
          </div>
        </section>

        {/* 5) WHY QUALITY AND TIME MATTER */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Why Quality and Time Matter for Your Cleaning Price</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Pope Cleaning focuses on clean, detailed and consistent results, not on rushing. 
              Spending the right amount of time is essential. Rushing leads to missed areas and poor results, so your price reflects the time needed to do the job properly.
            </p>

            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-secondary mb-2">Sparkling Surfaces</h4>
                <p className="text-sm text-muted-foreground">Proper bathroom and kitchen sanitation takes meticulous care.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Clock className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-secondary mb-2">Adequate Time</h4>
                <p className="text-sm text-muted-foreground">Detailed dusting and thorough cleaning cannot be done in a rush.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 mb-6">
                  <ListChecks className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-secondary mb-2">Correct Methods</h4>
                <p className="text-sm text-muted-foreground">Ensuring the correct use of equipment, checklists, and safe products.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6) HOW TO GET THE MOST ACCURATE ESTIMATE */}
        <section className="bg-secondary text-white py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">How to Get the Most Accurate Estimate</h2>
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
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for your quote?</h3>
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
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
