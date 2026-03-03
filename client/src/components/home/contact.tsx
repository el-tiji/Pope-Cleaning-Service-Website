import { ASSETS } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-sm font-bold tracking-wider text-primary uppercase mb-3">Get a Quote</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Book your clean today</h3>
            <p className="text-lg text-muted-foreground mb-10">
              Fill out the form below with your requirements, and our team will get back to you with a customized quote within 2 hours.
            </p>
            
            <form className="space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="0400 000 000" className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Cleaning</SelectItem>
                    <SelectItem value="commercial">Commercial Cleaning</SelectItem>
                    <SelectItem value="vacate">Vacate / End of Lease</SelectItem>
                    <SelectItem value="carpet">Carpet & Upholstery</SelectItem>
                    <SelectItem value="other">Other / Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea 
                  id="details" 
                  placeholder="Tell us about your space (e.g., number of bedrooms, specific areas to focus on...)" 
                  className="min-h-[120px] bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors resize-none" 
                />
              </div>
              
              <Button type="button" className="w-full h-14 text-base font-bold rounded-xl shadow-md shadow-primary/20">
                Request Free Quote
              </Button>
            </form>
          </div>
          
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-[3rem] transform -rotate-3 scale-105 blur-2xl -z-10"></div>
              <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-white/50 relative">
                <div className="bg-secondary text-white p-8 rounded-2xl shadow-xl">
                  <h4 className="font-display font-bold text-2xl mb-4">Service Area</h4>
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    We proudly serve the entire Perth metropolitan area, providing premium cleaning services from Joondalup to Mandurah.
                  </p>
                  <ul className="space-y-3">
                    {["Perth CBD", "Victoria Park", "South Perth", "Subiaco", "Scarborough"].map((area) => (
                      <li key={area} className="flex items-center gap-3 text-sm font-medium text-accent">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </section>
  );
}