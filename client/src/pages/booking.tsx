import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Check, Sparkles, Calendar, Clock, ArrowRight, ArrowLeft, 
  ShieldCheck, Briefcase, Home, Building, Plus, Minus, 
  Camera, MapPin, CheckCircle2, User, Mail, Phone, UploadCloud, Info,
  Users, Building2, Layers, Store, Warehouse, Factory, Landmark, Dumbbell, HelpCircle, Droplets,
  CalendarCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

// Future feature: this pricing estimator should be used inside an admin-only quote assistant.
// Public customers should submit quote requests without seeing internal suggested prices.

const PLANS = [
  { id: "regular", title: "Regular Home Cleaning", description: "Routine cleaning for ongoing home maintenance.", icon: Calendar },
  { id: "spring", title: "Spring / Deep Cleaning", description: "Detailed cleaning for built-up dust, neglected areas or seasonal refresh.", icon: Sparkles },
  { id: "vacate", title: "Vacate / End of Lease Cleaning", description: "Move-out cleaning to help prepare the property for inspection.", icon: ShieldCheck },
  { id: "office", title: "Office / Commercial Cleaning", description: "Cleaning for offices, workplaces and commercial spaces.", icon: Briefcase },
  { id: "carpet", title: "Carpet & Upholstery Cleaning", description: "Steam cleaning for carpets, rugs, couches or upholstery.", icon: Layers },
  { id: "tile", title: "Tile & Grout Cleaning", description: "Detailed cleaning for tiles, grout lines, bathrooms and hard floors.", icon: Droplets },
  { id: "pressure", title: "Pressure Cleaning", description: "Outdoor cleaning for driveways, patios, paths and selected surfaces.", icon: Droplets },
  { id: "custom", title: "Custom Cleaning Request", description: "For mixed services, special jobs, warehouses, workshops, showrooms or anything not listed.", icon: HelpCircle }
];

const FREQUENCIES = [
  { id: "one-off", label: "One-off" },
  { id: "weekly", label: "Weekly" },
  { id: "fortnightly", label: "Fortnightly" },
  { id: "monthly", label: "Monthly" },
  { id: "2-times-week", label: "Twice weekly" },
  { id: "not-sure", label: "Not sure yet" }
];

const PROPERTY_TYPES = [
  { id: "house", label: "House", icon: Home },
  { id: "apartment", label: "Apartment / Unit", icon: Building },
  { id: "townhouse", label: "Townhouse", icon: Home },
  { id: "office", label: "Office", icon: Briefcase },
  { id: "retail", label: "Retail / Showroom", icon: Store },
  { id: "warehouse", label: "Warehouse / Workshop", icon: Warehouse },
  { id: "commercial", label: "Commercial Facility", icon: Building2 },
  { id: "other", label: "Other", icon: HelpCircle }
];

const RESIDENTIAL_SQM_RANGES = [
  { id: "under120", label: "Under 120 sqm" },
  { id: "121-180", label: "121 – 180 sqm" },
  { id: "181-250", label: "181 – 250 sqm" },
  { id: "251-350", label: "251 – 350 sqm" },
  { id: "350+", label: "350+ sqm" },
  { id: "not-sure", label: "Not sure" }
];

const COMMERCIAL_SQM_RANGES = [
  { id: "under100", label: "Under 100 sqm" },
  { id: "100-250", label: "100 – 250 sqm" },
  { id: "251-500", label: "251 – 500 sqm" },
  { id: "501-1000", label: "501 – 1000 sqm" },
  { id: "1000+", label: "1000+ sqm" },
  { id: "not-sure", label: "Not sure" }
];

const EXTRAS_LIST = [
  { id: "interiorWindows", label: "Interior windows" },
  { id: "exteriorWindows", label: "Exterior windows" },
  { id: "oven", label: "Oven cleaning" },
  { id: "fridge", label: "Fridge inside" },
  { id: "cabinets", label: "Cabinets inside" },
  { id: "wallSpot", label: "Wall spot cleaning" },
  { id: "blinds", label: "Blinds dusting/wipe" },
  { id: "carpetSteam", label: "Carpet steam cleaning" },
  { id: "upholstery", label: "Upholstery / couches" },
  { id: "tile", label: "Tile & grout cleaning" },
  { id: "pressure", label: "Pressure cleaning" },
  { id: "balcony", label: "Balcony / patio" },
  { id: "garage", label: "Garage sweep/clean" },
  { id: "trash", label: "Trash removal" },
  { id: "garden", label: "Garden tidy-up" },
  { id: "petHair", label: "Pet hair focus" },
  { id: "heavyDust", label: "Heavy dust / neglected areas" },
  { id: "postReno", label: "Post-renovation dust" },
  { id: "other", label: "Other" }
];

const STEPS = ["Service", "Property", "Extras", "Schedule", "Contact"];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    plan: "regular",
    frequency: "one-off",
    propertyType: "house",
    area: "under120",
    
    // Residential fields
    bedrooms: 3,
    bathrooms: 2,
    showers: 2,
    toilets: 1,
    kitchens: 1,
    floors: 1,
    livingAreas: 1,

    // Commercial fields
    workstations: 0,
    meetingRooms: 0,
    receptionAreas: 0,
    warehouseArea: false,
    afterHours: "not-sure",

    suburb: "",
    postcode: "",

    extras: {} as Record<string, boolean>,
    otherExtras: "",

    preferredDate: "",
    timeWindow: "morning",
    howSoon: "flexible",
    parking: "not-sure",
    stairsLift: "not-sure",
    pets: "no",
    accessNotes: "",

    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      contactMethod: "email",
      consentQuote: false,
      consentPrivacy: false,
      consentMarketing: false
    }
  });

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateCustomer = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, customer: { ...prev.customer, [key]: value } }));
  };

  const updateExtra = (id: string, value: boolean) => {
    setFormData(prev => ({ ...prev, extras: { ...prev.extras, [id]: value } }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer.consentQuote || !formData.customer.consentPrivacy) {
        alert("Please accept the required terms.");
        return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const isCommercial = ['office', 'retail', 'warehouse', 'commercial'].includes(formData.propertyType) || formData.plan === 'office';
  const isResidential = ['house', 'apartment', 'townhouse'].includes(formData.propertyType) && formData.plan !== 'office';

  const Counter = ({ label, value, onChange }: {label: string, value: number, onChange: (v: number) => void}) => (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
      <span className="font-medium text-secondary">{label}</span>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
        <span className="w-4 text-center font-bold">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 py-24 pt-[100px]">
          <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Quote Request Sent!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you, {formData.customer.firstName}! We've received your request for a {PLANS.find(p => p.id === formData.plan)?.title}. Our team will review your details and send a tailored quote to your email shortly.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full h-14 rounded-xl text-lg font-bold bg-[#2F7FD1] text-white">
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-[100px] md:pt-[120px] pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div id="quote-form" className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-mt-24">
            
            <div className="lg:col-span-2">
              
              <RevealOnScroll delay={0.1}>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {STEPS.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                          idx === currentStep ? "bg-[#2F7FD1] text-white shadow-md shadow-[#2F7FD1]/30" :
                          idx < currentStep ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                        )}>
                          {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className="text-xs font-medium mt-2 hidden sm:block text-center max-w-[80px]">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2F7FD1] transition-all duration-500 ease-out"
                      style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl border border-border">
                {currentStep === 0 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">What type of cleaning do you need?</h2>
                      <p className="text-muted-foreground">Choose the service that best matches your request. If you're unsure, select Custom Cleaning Request.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {PLANS.map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => updateForm('plan', plan.id)}
                          className={cn(
                            "cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col",
                            formData.plan === plan.id 
                              ? "border-[#2F7FD1] bg-[#EAF5FF] shadow-sm" 
                              : "border-border hover:border-[#2F7FD1]/30 hover:bg-muted/30"
                          )}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <plan.icon className={cn("w-6 h-6", formData.plan === plan.id ? "text-[#2F7FD1]" : "text-muted-foreground")} />
                            <h3 className="font-bold text-lg text-secondary leading-tight">{plan.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-bold text-secondary mb-4">How often do you need cleaning?</h3>
                      <div className="flex flex-wrap gap-3">
                        {FREQUENCIES.map((freq) => (
                          <button
                            key={freq.id}
                            onClick={() => updateForm('frequency', freq.id)}
                            className={cn(
                              "px-5 py-2.5 rounded-full text-sm font-bold transition-all border",
                              formData.frequency === freq.id
                                ? "bg-[#2F7FD1] text-white border-[#2F7FD1] shadow-sm"
                                : "bg-white text-secondary border-border hover:border-[#2F7FD1] hover:text-[#2F7FD1]"
                            )}
                          >
                            {freq.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                        <Info className="w-4 h-4"/> Recurring services may qualify for a tailored frequency discount after review.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">Tell us about the property</h2>
                      <p className="text-muted-foreground">These details help us understand the size and type of work required.</p>
                    </div>

                    <div>
                      <Label className="text-base mb-4 block">Property / facility type</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PROPERTY_TYPES.map((type) => (
                          <div 
                            key={type.id}
                            onClick={() => updateForm('propertyType', type.id)}
                            className={cn(
                              "cursor-pointer rounded-xl p-4 border transition-all flex flex-col items-center text-center gap-2",
                              formData.propertyType === type.id 
                                ? "border-primary bg-primary/5 text-primary shadow-sm" 
                                : "border-border hover:border-primary/30 hover:bg-muted text-muted-foreground"
                            )}
                          >
                            <type.icon className="w-6 h-6" />
                            <span className="text-xs font-bold">{type.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isResidential && (
                      <div className="space-y-6 pt-6 border-t border-border">
                        <div>
                            <Label className="text-base mb-4 block">Approximate internal area</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {RESIDENTIAL_SQM_RANGES.map(range => (
                                    <div 
                                        key={range.id}
                                        onClick={() => updateForm('area', range.id)}
                                        className={cn(
                                        "cursor-pointer rounded-lg p-3 border transition-all text-center",
                                        formData.area === range.id 
                                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm" 
                                            : "border-border hover:border-primary/30 hover:bg-muted text-secondary text-sm"
                                        )}
                                    >
                                        {range.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Counter label="Bedrooms" value={formData.bedrooms} onChange={(v) => updateForm('bedrooms', v)} />
                          <Counter label="Bathrooms" value={formData.bathrooms} onChange={(v) => updateForm('bathrooms', v)} />
                          <Counter label="Separate showers" value={formData.showers} onChange={(v) => updateForm('showers', v)} />
                          <Counter label="Separate toilets" value={formData.toilets} onChange={(v) => updateForm('toilets', v)} />
                          <Counter label="Kitchens" value={formData.kitchens} onChange={(v) => updateForm('kitchens', v)} />
                          <Counter label="Floors / levels" value={formData.floors} onChange={(v) => updateForm('floors', v)} />
                          <Counter label="Additional living areas" value={formData.livingAreas} onChange={(v) => updateForm('livingAreas', v)} />
                        </div>
                      </div>
                    )}

                    {isCommercial && (
                      <div className="space-y-6 pt-6 border-t border-border">
                         <div>
                            <Label className="text-base mb-4 block">Approximate internal area</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {COMMERCIAL_SQM_RANGES.map(range => (
                                    <div 
                                        key={range.id}
                                        onClick={() => updateForm('area', range.id)}
                                        className={cn(
                                        "cursor-pointer rounded-lg p-3 border transition-all text-center",
                                        formData.area === range.id 
                                            ? "border-primary bg-primary/5 text-primary font-bold shadow-sm" 
                                            : "border-border hover:border-primary/30 hover:bg-muted text-secondary text-sm"
                                        )}
                                    >
                                        {range.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Counter label="Workstations / desks" value={formData.workstations} onChange={(v) => updateForm('workstations', v)} />
                          <Counter label="Bathrooms / toilets" value={formData.bathrooms} onChange={(v) => updateForm('bathrooms', v)} />
                          <Counter label="Kitchens / break rooms" value={formData.kitchens} onChange={(v) => updateForm('kitchens', v)} />
                          <Counter label="Meeting rooms" value={formData.meetingRooms} onChange={(v) => updateForm('meetingRooms', v)} />
                          <Counter label="Reception areas" value={formData.receptionAreas} onChange={(v) => updateForm('receptionAreas', v)} />
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                <Label className="block mb-2">Warehouse / workshop area</Label>
                                <div className="flex gap-2">
                                    {['Yes', 'No'].map(opt => (
                                        <button key={opt} type="button" onClick={() => updateForm('warehouseArea', opt === 'Yes')} className={cn("flex-1 py-2 rounded-lg border text-sm font-medium", formData.warehouseArea === (opt === 'Yes') ? "bg-primary text-white border-primary" : "bg-white text-secondary border-border")}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                <Label className="block mb-2">After-hours cleaning needed?</Label>
                                <div className="flex gap-2">
                                    {['Yes', 'No', 'Not sure'].map(opt => (
                                        <button key={opt} type="button" onClick={() => updateForm('afterHours', opt.toLowerCase().replace(' ', '-'))} className={cn("flex-1 py-2 rounded-lg border text-sm font-medium", formData.afterHours === opt.toLowerCase().replace(' ', '-') ? "bg-primary text-white border-primary" : "bg-white text-secondary border-border")}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-bold text-secondary mb-4">Location</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Suburb</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={formData.suburb} onChange={(e) => updateForm('suburb', e.target.value)} className="pl-9 bg-muted/30" placeholder="e.g. Subiaco" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Postcode</Label>
                          <Input value={formData.postcode} onChange={(e) => updateForm('postcode', e.target.value)} className="bg-muted/30" placeholder="e.g. 6008" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">Any extras or special areas?</h2>
                      <p className="text-muted-foreground">Select only what applies. You can skip this step if you only need a standard clean.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {EXTRAS_LIST.map((extra) => (
                        <label 
                          key={extra.id}
                          className={cn(
                            "cursor-pointer rounded-xl p-4 border transition-all flex items-start gap-3",
                            formData.extras[extra.id]
                              ? "border-primary bg-primary/5 shadow-sm" 
                              : "border-border hover:border-primary/30 hover:bg-muted"
                          )}
                        >
                          <div className={cn(
                            "w-5 h-5 rounded flex items-center justify-center border shrink-0 mt-0.5 transition-colors",
                            formData.extras[extra.id] ? "bg-primary border-primary text-white" : "border-input bg-white"
                          )}>
                            {formData.extras[extra.id] && <Check className="w-3 h-3" />}
                          </div>
                          <span className={cn(
                            "text-sm font-medium leading-tight",
                            formData.extras[extra.id] ? "text-primary" : "text-secondary"
                          )}>
                            {extra.label}
                          </span>
                        </label>
                      ))}
                    </div>

                    {formData.extras['other'] && (
                        <div className="space-y-2 animate-in fade-in">
                            <Label>Tell us what else you need</Label>
                            <Textarea value={formData.otherExtras} onChange={(e) => updateForm('otherExtras', e.target.value)} className="bg-muted/30" placeholder="Describe any specific tasks..." />
                        </div>
                    )}

                    <div className="bg-blue-50/50 p-4 rounded-xl flex gap-3 border border-blue-100">
                        <Info className="w-5 h-5 text-blue-600 shrink-0"/>
                        <p className="text-sm text-blue-800">Extras help us prepare the right quote. We'll confirm what is included before booking.</p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">When would you like the clean?</h2>
                      <p className="text-muted-foreground">Choose your preferred timing. Final availability will be confirmed by our team.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Preferred date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="date" value={formData.preferredDate} onChange={(e) => updateForm('preferredDate', e.target.value)} className="pl-9 bg-muted/30" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred time window</Label>
                        <select 
                          value={formData.timeWindow} 
                          onChange={(e) => updateForm('timeWindow', e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          <option value="anytime">Anytime</option>
                          <option value="after-hours">After-hours</option>
                          <option value="not-sure">Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div>
                        <Label className="mb-3 block">How soon do you need it?</Label>
                        <div className="flex flex-wrap gap-2">
                            {['As soon as possible', 'This week', 'Next week', 'Specific date', 'Flexible'].map(opt => (
                                <button key={opt} type="button" onClick={() => updateForm('howSoon', opt)} className={cn("px-4 py-2 rounded-full border text-sm font-medium", formData.howSoon === opt ? "bg-primary text-white border-primary" : "bg-white text-secondary border-border hover:bg-muted")}>{opt}</button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-bold text-secondary mb-4">Access and logistics</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Parking</Label>
                            <select value={formData.parking} onChange={(e) => updateForm('parking', e.target.value)} className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm">
                                <option value="easy">Easy</option>
                                <option value="limited">Limited</option>
                                <option value="paid">Paid parking</option>
                                <option value="street">Street parking</option>
                                <option value="not-sure">Not sure</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Stairs or lift access</Label>
                            <select value={formData.stairsLift} onChange={(e) => updateForm('stairsLift', e.target.value)} className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm">
                                <option value="ground">Ground floor</option>
                                <option value="stairs">Stairs</option>
                                <option value="lift">Lift available</option>
                                <option value="multiple">Multiple levels</option>
                                <option value="not-sure">Not sure</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Pets on property?</Label>
                            <select value={formData.pets} onChange={(e) => updateForm('pets', e.target.value)} className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm">
                                <option value="no">No</option>
                                <option value="yes-friendly">Yes, friendly</option>
                                <option value="yes-instructions">Yes, needs instructions</option>
                            </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-6">
                        <Label>Access notes / optional</Label>
                        <Textarea 
                          value={formData.accessNotes} 
                          onChange={(e) => updateForm('accessNotes', e.target.value)}
                          className="bg-muted/30" 
                          placeholder="Tell us about stairs, parking, pets, fragile items, security access or priority areas." 
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                        <h3 className="font-bold text-secondary mb-2">Photos help us quote accurately</h3>
                        <p className="text-sm text-muted-foreground mb-4">Upload photos of key areas if you can. This is optional, but it helps us understand the job before arrival.</p>
                        
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer">
                            <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                            <p className="font-medium text-secondary mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground">JPG, PNG, HEIC (Max 10MB)</p>
                        </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-secondary mb-2">How should we contact you?</h2>
                      <p className="text-muted-foreground">We'll use these details to review your request and send your quote.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input value={formData.customer.firstName} onChange={(e) => updateCustomer('firstName', e.target.value)} className="pl-9 bg-muted/30" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Last name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input value={formData.customer.lastName} onChange={(e) => updateCustomer('lastName', e.target.value)} className="pl-9 bg-muted/30" required />
                        </div>
                      </div>
                    </div>

                    {isCommercial && (
                        <div className="space-y-2">
                            <Label>Company name (optional)</Label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input value={formData.customer.companyName} onChange={(e) => updateCustomer('companyName', e.target.value)} className="pl-9 bg-muted/30" />
                            </div>
                        </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="email" value={formData.customer.email} onChange={(e) => updateCustomer('email', e.target.value)} className="pl-9 bg-muted/30" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone / WhatsApp</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="tel" value={formData.customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} className="pl-9 bg-muted/30" required />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Preferred contact method</Label>
                        <div className="flex flex-wrap gap-2">
                            {['Email', 'Phone call', 'SMS', 'WhatsApp'].map(opt => (
                                <button key={opt} type="button" onClick={() => updateCustomer('contactMethod', opt.toLowerCase())} className={cn("px-4 py-2 rounded-full border text-sm font-medium", formData.customer.contactMethod === opt.toLowerCase() ? "bg-primary text-white border-primary" : "bg-white text-secondary border-border hover:bg-muted")}>{opt}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 w-4 h-4" checked={formData.customer.consentQuote} onChange={(e) => updateCustomer('consentQuote', e.target.checked)} />
                            <span className="text-sm text-secondary">I understand this is a quote request and the final quote will be confirmed after review. <span className="text-red-500">*</span></span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 w-4 h-4" checked={formData.customer.consentPrivacy} onChange={(e) => updateCustomer('consentPrivacy', e.target.checked)} />
                            <span className="text-sm text-secondary">I agree that Pope Cleaning Services may use my details to contact me about this quote request. <span className="text-red-500">*</span></span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="mt-1 w-4 h-4" checked={formData.customer.consentMarketing} onChange={(e) => updateCustomer('consentMarketing', e.target.checked)} />
                            <span className="text-sm text-muted-foreground">I would like to receive occasional promotions, cleaning offers or refer-a-friend discounts.</span>
                        </label>
                    </div>

                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={handleBack} 
                    disabled={currentStep === 0 || isSubmitting}
                    className="h-12 px-6 rounded-xl border-border hover:bg-muted text-secondary font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {currentStep < STEPS.length - 1 ? (
                    <Button 
                      onClick={handleNext}
                      className="h-12 px-8 rounded-xl bg-[#2F7FD1] text-white hover:bg-[#00275F] font-bold shadow-md shadow-primary/20"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="h-12 px-8 rounded-xl bg-[#2F7FD1] text-white hover:bg-[#00275F] font-bold shadow-md shadow-primary/20"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"} <CheckCircle2 className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-border sticky top-28">
                <h3 className="text-xl font-bold text-secondary mb-6">Quote Request Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-bold text-secondary">{PLANS.find(p => p.id === formData.plan)?.title || 'Service'}</p>
                      <p className="text-sm text-muted-foreground">{FREQUENCIES.find(f => f.id === formData.frequency)?.label}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="font-bold text-secondary mb-2">Property Details</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>{PROPERTY_TYPES.find(p => p.id === formData.propertyType)?.label}</p>
                        {formData.suburb && <p>{formData.suburb} {formData.postcode}</p>}
                        {isResidential && <p>{formData.bedrooms} Beds, {formData.bathrooms} Baths, {formData.floors} Level(s)</p>}
                    </div>
                  </div>

                  {Object.values(formData.extras).some(v => v) && (
                    <div className="pt-4 border-t border-border">
                      <p className="font-bold text-secondary mb-2">Selected Extras</p>
                      <ul className="space-y-1">
                        {Object.entries(formData.extras).map(([k, v]) => {
                          if (!v) return null;
                          return (
                            <li key={k} className="text-sm flex items-start gap-2">
                              <Check className="w-3 h-3 text-primary mt-1 shrink-0" />
                              <span className="text-muted-foreground">{EXTRAS_LIST.find(e => e.id === k)?.label || k}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {(formData.preferredDate || formData.timeWindow !== 'not-sure') && (
                     <div className="pt-4 border-t border-border">
                        <p className="font-bold text-secondary mb-1">Schedule</p>
                        <p className="text-sm text-muted-foreground capitalize">
                            {formData.preferredDate} {formData.preferredDate && '•'} {formData.timeWindow}
                        </p>
                     </div>
                  )}

                  <div className="pt-6 mt-6 border-t border-border">
                     <p className="text-sm text-muted-foreground leading-relaxed">
                        This is a quote request. Our team will review these details and contact you with a final quote.
                     </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}