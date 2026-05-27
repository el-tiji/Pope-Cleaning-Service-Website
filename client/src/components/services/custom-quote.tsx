import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "wouter";
import { Upload, CheckCircle2, ArrowRight } from "lucide-react";

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
            <Link href="/book">
              <Button size="lg" className="rounded-full px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Go to Plans & Pricing <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services-custom-quote" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Request a Custom Cleaning Quote</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Need a cleaning service that isn’t listed on our website, or a personalised combination of services? Tell us what you need and we’ll prepare a tailored quote for you. Ideal for special requests, complex jobs, or mixed residential/commercial projects.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-xl font-bold text-secondary">1. Contact Details</h3>
              </div>
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

            {/* Service Context */}
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-xl font-bold text-secondary">2. Property or Facility Information</h3>
              </div>
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
                <div className="space-y-2">
                  <Label htmlFor="size">Approximate Size (m²) or Description</Label>
                  <Input id="size" placeholder="e.g. Large open warehouse or 150m²" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors">Number of Floors / Levels</Label>
                  <Input id="floors" type="number" min="1" placeholder="e.g. 2" className="bg-muted/30" />
                </div>
              </div>
            </div>

            {/* Custom Service */}
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-xl font-bold text-secondary">3. Service Details</h3>
              </div>
              <div className="space-y-4">
                <Label>What type of custom cleaning do you need? (Check all that apply)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Deep cleaning", "One-off special clean", "Post-renovation clean",
                    "Event / after-event clean", "Workshop / hangar clean", "Mixed residential + commercial", "Other"
                  ].map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox id={`tag-${tag}`} />
                      <label htmlFor={`tag-${tag}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Describe the cleaning work you need <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="description" 
                  required
                  placeholder="Please describe your property and what you would like us to clean. Include areas (e.g. warehouse floor, hangar, showroom, office, outdoor areas), how dirty it is, and anything special we should know." 
                  className="min-h-[120px] bg-muted/30 resize-y"
                />
              </div>
            </div>

            {/* Timing & Frequency */}
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-xl font-bold text-secondary">4. Timing & Frequency</h3>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Photos & Notes */}
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <h3 className="text-xl font-bold text-secondary">5. Photos & Additional Notes</h3>
              </div>
              
              <div className="space-y-2">
                <Label>Photos or files (optional but recommended)</Label>
                <p className="text-sm text-muted-foreground mb-2">Upload photos or documents that help us understand the areas to be cleaned.</p>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium text-secondary">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or PDF (max 10MB)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional notes or special instructions</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Tell us about access (stairs, parking, security), safety requirements, machinery, or anything important for preparing your quote." 
                  className="min-h-[100px] bg-muted/30 resize-y"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-bold rounded-xl bg-accent text-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Custom Quote Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
