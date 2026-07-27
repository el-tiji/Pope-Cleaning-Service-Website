import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "wouter";
import { Upload, CheckCircle2, ArrowRight, ClipboardList, Briefcase, KeySquare } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function CustomQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mocking an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="services-custom-quote" className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Thank you!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We’ve received your custom cleaning request. Our team will review the details and contact you with a tailored quote shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14" onClick={() => setIsSuccess(false)}>
              Submit Another Request
            </Button>
            <Link href="/quote">
              <Button size="lg" className="rounded-full px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Request a Custom Quote <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services-custom-quote" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Explanatory Content */}
          <div className="lg:col-span-1 space-y-8">
            <RevealOnScroll>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Need a Custom Cleaning Solution?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  If you can’t find exactly what you need in our standard services, or you have a complex property or special request, tell us about it here. We’ll prepare a tailored quote based on your specific requirements.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                <h3 className="font-bold text-secondary text-xl mb-4">Perfect for:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-secondary/80 font-medium pt-1">Mixed residential & commercial jobs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <KeySquare className="w-4 h-4" />
                    </div>
                    <span className="text-secondary/80 font-medium pt-1">Warehouses, workshops & hangars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <span className="text-secondary/80 font-medium pt-1">Post-renovation & event clean-ups</span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} className="hidden lg:block">
              <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 to-primary/10 p-6 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our commitment</p>
                <p className="text-secondary font-semibold text-lg leading-snug">Every quote is reviewed by a real team member. No hidden fees.</p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-primary/20"></div>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 h-px bg-primary/20"></div>
                </div>
                <ul className="space-y-2 text-sm text-secondary/70">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0"></span>Response within 24 business hours</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0"></span>Fully insured & police-cleared team</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shrink-0"></span>Flexible scheduling to suit your operations</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT COLUMN: Unified Form */}
          <div className="lg:col-span-2">
            <RevealOnScroll delay={0.3}>
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-border">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-secondary border-b border-border pb-4">Request a Custom Quote</h3>
                  </div>
                
                {/* 1. Contact Details */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                      <Input id="fullName" required placeholder="John Doe" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp <span className="text-red-500">*</span></Label>
                      <Input id="phone" type="tel" required placeholder="0400 000 000" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <Select defaultValue="phone">
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 2. Property Information */}
                <div className="space-y-6">
                  <h4 className="font-bold text-secondary text-lg border-b border-border/50 pb-2">Facility Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Property or Facility Type <span className="text-red-500">*</span></Label>
                      <Select required>
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment / Unit</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="office">Office / Commercial</SelectItem>
                          <SelectItem value="warehouse">Warehouse / Workshop</SelectItem>
                          <SelectItem value="retail">Retail / Showroom</SelectItem>
                          <SelectItem value="medical">Medical / Clinic</SelectItem>
                          <SelectItem value="hangar">Hangar / Aviation Facility</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="suburb">Suburb <span className="text-red-500">*</span></Label>
                      <Input id="suburb" required placeholder="e.g. Subiaco" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode <span className="text-red-500">*</span></Label>
                      <Input id="postcode" required placeholder="e.g. 6008" className="bg-muted/30" />
                    </div>
                  </div>
                </div>

                {/* 3. Job Description */}
                <div className="space-y-6">
                  <h4 className="font-bold text-secondary text-lg border-b border-border/50 pb-2">Cleaning Requirements</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Describe the cleaning work you need <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="description" 
                      required
                      placeholder="Please describe your property and what you would like us to clean. Include areas (e.g. warehouse floor, hangar, showroom, office, outdoor areas), how dirty it is, and anything special we should know." 
                      className="min-h-[140px] bg-muted/30 resize-y"
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <Label className="text-muted-foreground">Quick Tags (Optional)</Label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        "Deep cleaning", "One-off special clean", "Post-renovation clean",
                        "Event / after-event clean", "Mixed residential + commercial", "Ongoing commercial contract"
                      ].map((tag) => (
                        <div key={tag} className="flex items-center space-x-2 bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
                          <Checkbox id={`tag-${tag}`} />
                          <label htmlFor={`tag-${tag}`} className="text-sm font-medium leading-none cursor-pointer">
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Timing & Frequency */}
                <div className="space-y-6">
                  <h4 className="font-bold text-secondary text-lg border-b border-border/50 pb-2">Timing & Frequency</h4>
                  <div className="space-y-4">
                    <Label>Preferred Frequency</Label>
                    <RadioGroup defaultValue="one-off" className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-off" id="r-one-off" />
                        <Label htmlFor="r-one-off">One-off job</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short-term" id="r-short-term" />
                        <Label htmlFor="r-short-term">Short-term project</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ongoing" id="r-ongoing" />
                        <Label htmlFor="r-ongoing">Regular ongoing service</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Preferred Date(s) or Time Frame</Label>
                      <Input id="timeframe" placeholder="e.g. Next week, or specific date" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time Window</Label>
                      <Select defaultValue="flexible">
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue placeholder="Select time window" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="after-hours">After hours / Weekends</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* 5. Photos & Notes */}
                <div className="space-y-6">
                  <h4 className="font-bold text-secondary text-lg border-b border-border/50 pb-2">Additional Info</h4>
                  
                  <div className="space-y-2">
                    <Label>Photos (optional but recommended)</Label>
                    <p className="text-sm text-muted-foreground mb-2">Upload photos of the areas to be cleaned so we can understand the job better.</p>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                      <p className="text-sm font-medium text-secondary">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">Allow multiple files (max 10MB each)</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="notes">Additional notes or special instructions</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Tell us about access, parking, safety requirements, machinery, or anything important for preparing your quote." 
                      className="min-h-[100px] bg-muted/30 resize-y"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-16 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Custom Quote"}
                  </Button>
                </div>
              </form>
            </div>
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
