import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
  Check, Sparkles, Calendar, Clock, ArrowRight, ArrowLeft, 
  ShieldCheck, Briefcase, Home, Building, Plus, Minus, 
  Camera, MapPin, CheckCircle2, User, Mail, Phone, UploadCloud, Info,
  Building2, Layers, Store, Warehouse, HelpCircle, Droplets, X, Shield, Star, HeartHandshake
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA CONSTANTS ---
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
  { id: "2-times-week", label: "Twice weekly" },
  { id: "weekly", label: "Weekly" },
  { id: "fortnightly", label: "Fortnightly" },
  { id: "monthly", label: "Monthly" },
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

const RESIDENTIAL_SQM_RANGES = ["Under 120 sqm", "121–180 sqm", "181–250 sqm", "251–350 sqm", "350+ sqm", "Not sure"];
const COMMERCIAL_SQM_RANGES = ["Under 100 sqm", "100–250 sqm", "251–500 sqm", "501–1000 sqm", "1000+ sqm", "Not sure"];

const EXTRAS_LIST = [
  { id: "interiorWindows", label: "Interior windows" },
  { id: "exteriorWindows", label: "Exterior windows" },
  { id: "oven", label: "Oven cleaning" },
  { id: "fridge", label: "Fridge inside" },
  { id: "cabinets", label: "Cabinets inside" },
  { id: "wallSpot", label: "Wall spot cleaning" },
  { id: "blinds", label: "Blinds dusting / wipe" },
  { id: "carpetSteam", label: "Carpet steam cleaning" },
  { id: "upholstery", label: "Upholstery / couches" },
  { id: "tile", label: "Tile & grout cleaning" },
  { id: "pressure", label: "Pressure cleaning" },
  { id: "balcony", label: "Balcony / patio" },
  { id: "garage", label: "Garage sweep / clean" },
  { id: "trash", label: "Trash removal" },
  { id: "garden", label: "Garden tidy-up" },
  { id: "petHair", label: "Pet hair focus" },
  { id: "heavyDust", label: "Heavy dust / neglected areas" },
  { id: "postReno", label: "Post-renovation dust" },
  { id: "sanitation", label: "High-touch surface sanitation" },
  { id: "other", label: "Other" }
];

const STEPS = ["Service", "Property", "Extras", "Schedule", "Contact", "Review"];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitReference, setSubmitReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    plan: "",
    frequency: "",
    
    propertyType: "",
    otherPropertyType: "",
    area: "",
    suburb: "",
    postcode: "",
    
    // Residential fields
    bedrooms: 0,
    bathrooms: 0,
    showers: 0,
    toilets: 0,
    kitchens: 0,
    floors: 1,
    livingAreas: 0,
    bedsToMake: 0,

    // Commercial fields
    workstations: 0,
    meetingRooms: 0,
    receptionAreas: 0,
    sharedAreas: 0,
    warehouseArea: false,
    afterHours: "not-sure",

    extras: {} as Record<string, boolean>,
    otherExtras: "",

    preferredDate: "",
    timeWindow: "",
    howSoon: "",
    parking: "not-sure",
    stairsLift: "not-sure",
    pets: "no",
    accessNotes: "",
    photos: [] as File[],

    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      businessRole: "",
      contactMethod: "email",
      consentQuote: false,
      consentService: false,
      consentMarketing: false
    }
  });

  const isCommercial = ['office', 'retail', 'warehouse', 'commercial'].includes(formData.propertyType) || formData.plan === 'office';
  const isResidential = ['house', 'apartment', 'townhouse'].includes(formData.propertyType);

  const updateForm = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }));
  const updateCustomer = (key: string, value: any) => setFormData(prev => ({ ...prev, customer: { ...prev.customer, [key]: value } }));
  const updateExtra = (id: string, value: boolean) => setFormData(prev => ({ ...prev, extras: { ...prev.extras, [id]: value } }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.size <= 10 * 1024 * 1024); // 10MB limit
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newFiles] }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => {
      const newPhotos = [...prev.photos];
      newPhotos.splice(index, 1);
      return { ...prev, photos: newPhotos };
    });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Fallback for some browsers
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStep === 0 && !formData.plan) {
      alert("Please select a service type to continue.");
      return;
    }
    if (currentStep === 1 && (!formData.propertyType || !formData.suburb || !formData.postcode)) {
      alert("Please provide the property type, suburb, and postcode to continue.");
      return;
    }
    if (currentStep === 4 && (!formData.customer.firstName || !formData.customer.lastName || !formData.customer.email || !formData.customer.phone)) {
      alert("Please provide your required contact details to continue.");
      return;
    }
    if (currentStep === 4 && (!formData.customer.consentQuote || !formData.customer.consentService)) {
      alert("Please accept the required consent terms to continue.");
      return;
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      scrollToTop();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        source: "quote_form",
        plan: formData.plan,
        frequency: formData.frequency,
        propertyType: formData.propertyType,
        otherPropertyType: formData.otherPropertyType,
        area: formData.area,
        suburb: formData.suburb,
        postcode: formData.postcode,
        rooms: {
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          showers: formData.showers,
          toilets: formData.toilets,
          kitchens: formData.kitchens,
          floors: formData.floors,
          livingAreas: formData.livingAreas,
          bedsToMake: formData.bedsToMake,
        },
        commercial: {
          workstations: formData.workstations,
          meetingRooms: formData.meetingRooms,
          receptionAreas: formData.receptionAreas,
          sharedAreas: formData.sharedAreas,
          warehouseArea: formData.warehouseArea,
          afterHours: formData.afterHours,
        },
        extras: Object.entries(formData.extras)
          .filter(([, selected]) => selected)
          .map(([id]) => id),
        otherExtras: formData.otherExtras,
        schedule: {
          preferredDate: formData.preferredDate,
          timeWindow: formData.timeWindow,
          howSoon: formData.howSoon,
          parking: formData.parking,
          stairsLift: formData.stairsLift,
          pets: formData.pets,
          accessNotes: formData.accessNotes,
          photoNames: formData.photos.map((f) => f.name),
        },
        customer: formData.customer,
      };

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          data?.message || "We couldn't send your request. Please try again, or contact us on WhatsApp +61 423 258 795.",
        );
      }
      setSubmitReference(data?.reference ?? null);
      setIsSuccess(true);
      scrollToTop();
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't send your request. Please try again, or contact us on WhatsApp +61 423 258 795.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const Counter = ({ label, value, onChange }: {label: string, value: number, onChange: (v: number) => void}) => (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/60 hover:border-primary/20 transition-colors">
      <span className="font-medium text-secondary text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
        <span className="w-5 text-center font-bold text-secondary">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );

  // Form layout variants
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 py-24 pt-[100px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="max-w-lg w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-[#00275F]/10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2F7FD1] to-[#2E86DE]" />
            <div className="w-24 h-24 bg-[#EAF5FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-[#2F7FD1]" />
            </div>
            <h2 className="text-3xl font-bold text-[#00275F] mb-4">Thanks — your quote request has been sent.</h2>
            {submitReference && (
              <div className="inline-flex items-center gap-2 bg-[#EAF5FF] border border-[#2F7FD1]/30 text-[#00275F] font-bold px-4 py-2 rounded-full mb-4" data-testid="text-quote-reference">
                Reference: {submitReference}
              </div>
            )}
            <p className="text-[#00275F]/70 mb-8 leading-relaxed">
              Our team will review the details and contact you using your preferred method ({formData.customer.contactMethod}). If we need more information, we’ll let you know before confirming your quote.
            </p>
            <Button onClick={() => window.location.href = '/'} className="w-full h-14 rounded-xl text-lg font-bold bg-[#00275F] text-white hover:bg-[#00275F]/90 shadow-xl transition-all">
              Return to Home
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1 pb-32 pt-[100px] md:pt-[120px]">
        <div ref={topRef} className="absolute top-0 opacity-0 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            
            {/* MAIN FORM COLUMN */}
            <div className="lg:col-span-8">
              
              {/* Stepper */}
              <RevealOnScroll delay={0.1}>
                <div className="mb-8 bg-white p-4 rounded-2xl shadow-sm border border-[#00275F]/5">
                  <div className="flex justify-between mb-3 px-2">
                    {STEPS.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center relative z-10">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                          idx === currentStep ? "bg-[#2F7FD1] text-white border-[#2F7FD1] shadow-lg shadow-[#2F7FD1]/30 scale-110" :
                          idx < currentStep ? "bg-[#EAF5FF] text-[#2F7FD1] border-[#2F7FD1]" : "bg-white text-muted-foreground border-muted-foreground/30"
                        )}>
                          {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-bold mt-2 text-center absolute top-10 w-20 transition-colors",
                          idx === currentStep ? "text-[#00275F]" : "text-muted-foreground"
                        )}>
                          {step}
                        </span>
                      </div>
                    ))}
                    {/* Progress Bar Background */}
                    <div className="absolute left-0 top-8 w-full px-8 -z-0">
                       <div className="h-1 bg-muted rounded-full overflow-hidden w-[calc(100%-4rem)] mx-auto relative top-[-14px]">
                         <div 
                           className="h-full bg-[#2F7FD1] transition-all duration-500 ease-out"
                           style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                         />
                       </div>
                    </div>
                  </div>
                  <div className="h-6"></div> {/* Spacer for absolute labels */}
                </div>
              </RevealOnScroll>

              {/* Form Card */}
              <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-[#00275F]/5 border border-[#00275F]/5 min-h-[500px]">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: SERVICE */}
                  {currentStep === 0 && (
                    <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">What type of cleaning do you need?</h2>
                        <p className="text-[#00275F]/60">Choose the service that best matches your request. If you're unsure, select Custom Cleaning Request.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {PLANS.map((plan) => (
                          <div 
                            key={plan.id}
                            onClick={() => updateForm('plan', plan.id)}
                            className={cn(
                              "cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col relative overflow-hidden",
                              formData.plan === plan.id 
                                ? "border-[#2F7FD1] bg-[#EAF5FF] shadow-md" 
                                : "border-border/50 hover:border-[#2F7FD1]/30 hover:bg-muted/10"
                            )}
                          >
                            {formData.plan === plan.id && (
                              <div className="absolute top-4 right-4 bg-[#2F7FD1] text-white rounded-full p-1 shadow-sm">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                            <div className="flex items-center gap-3 mb-2">
                              <plan.icon className={cn("w-6 h-6", formData.plan === plan.id ? "text-[#2F7FD1]" : "text-[#00275F]/40")} />
                              <h3 className={cn("font-bold text-lg leading-tight pr-6", formData.plan === plan.id ? "text-[#00275F]" : "text-secondary")}>{plan.title}</h3>
                            </div>
                            <p className={cn("text-sm", formData.plan === plan.id ? "text-[#00275F]/80" : "text-muted-foreground")}>{plan.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-8 border-t border-border/50">
                        <h3 className="font-bold text-[#00275F] mb-4 text-lg">How often do you need cleaning?</h3>
                        <div className="flex flex-wrap gap-3">
                          {FREQUENCIES.map((freq) => (
                            <button
                              key={freq.id}
                              type="button"
                              onClick={() => updateForm('frequency', freq.id)}
                              className={cn(
                                "px-5 py-3 rounded-full text-sm font-bold transition-all border-2",
                                formData.frequency === freq.id
                                  ? "bg-[#2F7FD1] text-white border-[#2F7FD1] shadow-md"
                                  : "bg-white text-secondary border-border hover:border-[#2F7FD1]/50 hover:text-[#2F7FD1]"
                              )}
                            >
                              {freq.label}
                            </button>
                          ))}
                        </div>
                        <div className="bg-[#EAF5FF] p-4 rounded-xl mt-6 flex gap-3 border border-[#2F7FD1]/20">
                          <Info className="w-5 h-5 text-[#2F7FD1] shrink-0"/>
                          <p className="text-sm text-[#00275F]/80">Recurring services may qualify for a tailored frequency discount after review.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PROPERTY */}
                  {currentStep === 1 && (
                    <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">Tell us about the property</h2>
                        <p className="text-[#00275F]/60">These details help us understand the size and type of work required.</p>
                      </div>

                      <div>
                        <Label className="text-base mb-4 block font-bold text-[#00275F]">Property / facility type *</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {PROPERTY_TYPES.map((type) => (
                            <div 
                              key={type.id}
                              onClick={() => updateForm('propertyType', type.id)}
                              className={cn(
                                "cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col items-center text-center gap-2",
                                formData.propertyType === type.id 
                                  ? "border-[#2F7FD1] bg-[#EAF5FF] text-[#2F7FD1] shadow-md" 
                                  : "border-border hover:border-[#2F7FD1]/30 hover:bg-muted/10 text-muted-foreground"
                              )}
                            >
                              <type.icon className={cn("w-6 h-6", formData.propertyType === type.id ? "text-[#2F7FD1]" : "text-[#00275F]/40")} />
                              <span className="text-xs font-bold">{type.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {formData.propertyType === 'other' && (
                        <div className="space-y-2 animate-in fade-in">
                           <Label className="font-bold text-[#00275F]">Describe the property or facility</Label>
                           <Textarea 
                             value={formData.otherPropertyType} 
                             onChange={(e) => updateForm('otherPropertyType', e.target.value)} 
                             className="bg-muted/20 border-border/50 focus:border-[#2F7FD1]" 
                             placeholder="e.g. Medical clinic, school, gym..." 
                           />
                        </div>
                      )}

                      {(isResidential && formData.propertyType !== 'other') && (
                        <div className="space-y-8 pt-8 border-t border-border/50 animate-in fade-in">
                          <div>
                              <Label className="text-base mb-4 block font-bold text-[#00275F]">Approximate internal area</Label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {RESIDENTIAL_SQM_RANGES.map(range => (
                                      <div 
                                          key={range}
                                          onClick={() => updateForm('area', range)}
                                          className={cn(
                                          "cursor-pointer rounded-xl p-3 border-2 transition-all text-center",
                                          formData.area === range 
                                              ? "border-[#2F7FD1] bg-[#EAF5FF] text-[#00275F] font-bold shadow-sm" 
                                              : "border-border/50 hover:border-[#2F7FD1]/30 text-secondary text-sm font-medium"
                                          )}
                                      >
                                          {range}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 bg-muted/10 p-6 rounded-2xl border border-border/40">
                            <Counter label="Bedrooms" value={formData.bedrooms} onChange={(v) => updateForm('bedrooms', v)} />
                            <Counter label="Bathrooms" value={formData.bathrooms} onChange={(v) => updateForm('bathrooms', v)} />
                            <Counter label="Separate showers" value={formData.showers} onChange={(v) => updateForm('showers', v)} />
                            <Counter label="Separate toilets" value={formData.toilets} onChange={(v) => updateForm('toilets', v)} />
                            <Counter label="Kitchens" value={formData.kitchens} onChange={(v) => updateForm('kitchens', v)} />
                            <Counter label="Floors / levels" value={formData.floors} onChange={(v) => updateForm('floors', v)} />
                            <Counter label="Additional living areas" value={formData.livingAreas} onChange={(v) => updateForm('livingAreas', v)} />
                            <Counter label="Beds to make/change" value={formData.bedsToMake} onChange={(v) => updateForm('bedsToMake', v)} />
                          </div>
                        </div>
                      )}

                      {(isCommercial && formData.propertyType !== 'other') && (
                        <div className="space-y-8 pt-8 border-t border-border/50 animate-in fade-in">
                           <div>
                              <Label className="text-base mb-4 block font-bold text-[#00275F]">Approximate internal area</Label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {COMMERCIAL_SQM_RANGES.map(range => (
                                      <div 
                                          key={range}
                                          onClick={() => updateForm('area', range)}
                                          className={cn(
                                          "cursor-pointer rounded-xl p-3 border-2 transition-all text-center",
                                          formData.area === range 
                                              ? "border-[#2F7FD1] bg-[#EAF5FF] text-[#00275F] font-bold shadow-sm" 
                                              : "border-border/50 hover:border-[#2F7FD1]/30 text-secondary text-sm font-medium"
                                          )}
                                      >
                                          {range}
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 bg-muted/10 p-6 rounded-2xl border border-border/40">
                            <Counter label="Workstations / desks" value={formData.workstations} onChange={(v) => updateForm('workstations', v)} />
                            <Counter label="Bathrooms / toilets" value={formData.bathrooms} onChange={(v) => updateForm('bathrooms', v)} />
                            <Counter label="Kitchens / break rooms" value={formData.kitchens} onChange={(v) => updateForm('kitchens', v)} />
                            <Counter label="Meeting rooms" value={formData.meetingRooms} onChange={(v) => updateForm('meetingRooms', v)} />
                            <Counter label="Reception / customer areas" value={formData.receptionAreas} onChange={(v) => updateForm('receptionAreas', v)} />
                            <Counter label="Shared areas" value={formData.sharedAreas} onChange={(v) => updateForm('sharedAreas', v)} />
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4 mt-4">
                              <div className="p-5 bg-white rounded-2xl border-2 border-border/50">
                                  <Label className="block mb-3 font-bold text-[#00275F]">Warehouse / workshop area?</Label>
                                  <div className="flex gap-2">
                                      {['Yes', 'No'].map(opt => (
                                          <button key={opt} type="button" onClick={() => updateForm('warehouseArea', opt === 'Yes')} className={cn("flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-colors", formData.warehouseArea === (opt === 'Yes') ? "bg-[#2F7FD1] text-white border-[#2F7FD1]" : "bg-white text-secondary border-border/50 hover:border-[#2F7FD1]/30")}>{opt}</button>
                                      ))}
                                  </div>
                              </div>
                              <div className="p-5 bg-white rounded-2xl border-2 border-border/50">
                                  <Label className="block mb-3 font-bold text-[#00275F]">After-hours cleaning needed?</Label>
                                  <div className="flex gap-2">
                                      {['Yes', 'No', 'Not sure'].map(opt => (
                                          <button key={opt} type="button" onClick={() => updateForm('afterHours', opt.toLowerCase().replace(' ', '-'))} className={cn("flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-colors", formData.afterHours === opt.toLowerCase().replace(' ', '-') ? "bg-[#2F7FD1] text-white border-[#2F7FD1]" : "bg-white text-secondary border-border/50 hover:border-[#2F7FD1]/30")}>{opt}</button>
                                      ))}
                                  </div>
                              </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-8 border-t border-border/50">
                        <h3 className="font-bold text-[#00275F] mb-4 text-lg">Location *</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="font-semibold text-secondary">Suburb</Label>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input value={formData.suburb} onChange={(e) => updateForm('suburb', e.target.value)} className="pl-11 h-12 bg-muted/20 border-border/50 focus:border-[#2F7FD1] rounded-xl" placeholder="e.g. Subiaco" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="font-semibold text-secondary">Postcode</Label>
                            <Input value={formData.postcode} onChange={(e) => updateForm('postcode', e.target.value)} className="h-12 bg-muted/20 border-border/50 focus:border-[#2F7FD1] rounded-xl" placeholder="e.g. 6008" required />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: EXTRAS */}
                  {currentStep === 2 && (
                    <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">Any extras or special areas?</h2>
                        <p className="text-[#00275F]/60">Select only what applies. You can skip this step if you only need a standard clean.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {EXTRAS_LIST.map((extra) => (
                          <label 
                            key={extra.id}
                            className={cn(
                              "cursor-pointer rounded-xl p-4 border-2 transition-all flex items-start gap-3 select-none",
                              formData.extras[extra.id]
                                ? "border-[#2F7FD1] bg-[#EAF5FF] shadow-sm" 
                                : "border-border/50 hover:border-[#2F7FD1]/30 hover:bg-muted/10"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors",
                              formData.extras[extra.id] ? "bg-[#2F7FD1] border-[#2F7FD1] text-white" : "border-muted-foreground/30 bg-white"
                            )}>
                              {formData.extras[extra.id] && <Check className="w-3 h-3" />}
                            </div>
                            <span className={cn(
                              "text-sm font-bold leading-tight mt-0.5",
                              formData.extras[extra.id] ? "text-[#00275F]" : "text-secondary"
                            )}>
                              {extra.label}
                            </span>
                            {/* Hidden actual checkbox for accessibility */}
                            <input 
                               type="checkbox" 
                               className="sr-only" 
                               checked={formData.extras[extra.id] || false}
                               onChange={(e) => updateExtra(extra.id, e.target.checked)}
                            />
                          </label>
                        ))}
                      </div>

                      {formData.extras['other'] && (
                          <div className="space-y-3 animate-in fade-in bg-muted/10 p-6 rounded-2xl border border-border/50">
                              <Label className="font-bold text-[#00275F]">Tell us what else you need</Label>
                              <Textarea value={formData.otherExtras} onChange={(e) => updateForm('otherExtras', e.target.value)} className="bg-white border-border/50 focus:border-[#2F7FD1] min-h-[100px] rounded-xl" placeholder="Describe any specific tasks or requirements..." />
                          </div>
                      )}

                      <div className="bg-[#EAF5FF] p-4 rounded-xl flex gap-3 border border-[#2F7FD1]/20">
                          <Info className="w-5 h-5 text-[#2F7FD1] shrink-0"/>
                          <p className="text-sm text-[#00275F]/80 font-medium">Extras help us prepare the right quote. We'll confirm what is included before booking.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: SCHEDULE & ACCESS */}
                  {currentStep === 3 && (
                    <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">When would you like the clean?</h2>
                        <p className="text-[#00275F]/60">Choose your preferred timing. Final availability will be confirmed by our team.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-2xl border border-border/40">
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">Preferred date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input type="date" value={formData.preferredDate} onChange={(e) => updateForm('preferredDate', e.target.value)} className="pl-11 h-12 bg-white border-border/50 focus:border-[#2F7FD1] rounded-xl" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">Preferred time window</Label>
                          <select value={formData.timeWindow} onChange={(e) => updateForm('timeWindow', e.target.value)} className="w-full h-12 rounded-xl border border-border/50 bg-white px-4 py-2 text-sm focus:border-[#2F7FD1] focus:ring-1 focus:ring-[#2F7FD1]">
                            <option value="" disabled>Select time...</option>
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
                          <Label className="mb-4 block font-bold text-secondary">Urgency</Label>
                          <div className="flex flex-wrap gap-3">
                              {['As soon as possible', 'This week', 'Next week', 'Specific date', 'Flexible'].map(opt => (
                                  <button key={opt} type="button" onClick={() => updateForm('howSoon', opt)} className={cn("px-5 py-3 rounded-full border-2 text-sm font-bold transition-all", formData.howSoon === opt ? "bg-[#2F7FD1] text-white border-[#2F7FD1] shadow-md" : "bg-white text-secondary border-border/50 hover:border-[#2F7FD1]/40")}>{opt}</button>
                              ))}
                          </div>
                      </div>

                      <div className="pt-8 border-t border-border/50">
                        <h3 className="font-bold text-[#00275F] mb-6 text-lg">Access and logistics</h3>
                        <div className="grid sm:grid-cols-3 gap-6">
                          <div className="space-y-3">
                              <Label className="font-bold text-secondary">Parking</Label>
                              <select value={formData.parking} onChange={(e) => updateForm('parking', e.target.value)} className="w-full h-12 rounded-xl border border-border/50 bg-muted/10 px-4 py-2 text-sm focus:border-[#2F7FD1]">
                                  <option value="easy">Easy</option>
                                  <option value="limited">Limited</option>
                                  <option value="paid">Paid parking</option>
                                  <option value="street">Street parking</option>
                                  <option value="not-sure">Not sure</option>
                              </select>
                          </div>
                          <div className="space-y-3">
                              <Label className="font-bold text-secondary">Stairs or lift access</Label>
                              <select value={formData.stairsLift} onChange={(e) => updateForm('stairsLift', e.target.value)} className="w-full h-12 rounded-xl border border-border/50 bg-muted/10 px-4 py-2 text-sm focus:border-[#2F7FD1]">
                                  <option value="ground">Ground floor</option>
                                  <option value="stairs">Stairs</option>
                                  <option value="lift">Lift available</option>
                                  <option value="multiple">Multiple levels</option>
                                  <option value="not-sure">Not sure</option>
                              </select>
                          </div>
                          <div className="space-y-3">
                              <Label className="font-bold text-secondary">Pets on property?</Label>
                              <select value={formData.pets} onChange={(e) => updateForm('pets', e.target.value)} className="w-full h-12 rounded-xl border border-border/50 bg-muted/10 px-4 py-2 text-sm focus:border-[#2F7FD1]">
                                  <option value="no">No</option>
                                  <option value="yes-friendly">Yes, friendly</option>
                                  <option value="yes-instructions">Yes, needs instructions</option>
                              </select>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mt-6">
                          <Label className="font-bold text-secondary">Access notes / optional</Label>
                          <Textarea 
                            value={formData.accessNotes} 
                            onChange={(e) => updateForm('accessNotes', e.target.value)}
                            className="bg-muted/10 min-h-[100px] border-border/50 focus:border-[#2F7FD1] rounded-xl" 
                            placeholder="Tell us about stairs, parking, pets, fragile items, security access, priority areas or anything important." 
                          />
                        </div>
                      </div>

                      <div className="pt-8 border-t border-border/50">
                          <h3 className="font-bold text-[#00275F] mb-2 text-lg">Photos help us quote accurately</h3>
                          <p className="text-sm text-[#00275F]/60 mb-6">Upload photos of key areas if you can. This is optional, but it helps us understand the job before arrival.</p>
                          
                          <label className="border-2 border-dashed border-[#2F7FD1]/30 bg-[#EAF5FF]/30 rounded-2xl p-10 text-center hover:bg-[#EAF5FF] hover:border-[#2F7FD1]/50 transition-colors cursor-pointer block group">
                              <input type="file" multiple accept="image/*,.heic" onChange={handlePhotoUpload} className="hidden" />
                              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <Camera className="w-8 h-8 text-[#2F7FD1]" />
                              </div>
                              <p className="font-bold text-[#00275F] mb-1 text-lg">Click to upload or drag and drop</p>
                              <p className="text-sm text-[#00275F]/60">JPG, PNG, WEBP, HEIC (Max 10MB each)</p>
                          </label>

                          {formData.photos.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                              {formData.photos.map((file, i) => (
                                <div key={i} className="relative group rounded-xl overflow-hidden border border-border/50 bg-muted/10 aspect-square flex flex-col items-center justify-center p-2 text-center">
                                  {/* Just a simple representation since we can't reliably preview all types instantly without object URLs, but let's use a nice icon */}
                                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                                    <Camera className="w-5 h-5 text-[#2F7FD1]" />
                                  </div>
                                  <span className="text-xs font-medium text-secondary truncate w-full px-2">{file.name}</span>
                                  <button type="button" onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600">
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: CONTACT */}
                  {currentStep === 4 && (
                    <motion.div key="step5" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">How should we contact you?</h2>
                        <p className="text-[#00275F]/60">We'll use these details to review your request and send your quote.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 bg-muted/10 p-6 rounded-2xl border border-border/40">
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">First name *</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={formData.customer.firstName} onChange={(e) => updateCustomer('firstName', e.target.value)} className="pl-11 h-12 bg-white border-border/50 focus:border-[#2F7FD1] rounded-xl" required />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">Last name *</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input value={formData.customer.lastName} onChange={(e) => updateCustomer('lastName', e.target.value)} className="pl-11 h-12 bg-white border-border/50 focus:border-[#2F7FD1] rounded-xl" required />
                          </div>
                        </div>
                      </div>

                      {isCommercial && (
                          <div className="grid sm:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                  <Label className="font-bold text-secondary">Company name (optional)</Label>
                                  <div className="relative">
                                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                      <Input value={formData.customer.companyName} onChange={(e) => updateCustomer('companyName', e.target.value)} className="pl-11 h-12 bg-muted/10 border-border/50 focus:border-[#2F7FD1] rounded-xl" />
                                  </div>
                              </div>
                              <div className="space-y-3">
                                  <Label className="font-bold text-secondary">Business role / position (optional)</Label>
                                  <div className="relative">
                                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                      <Input value={formData.customer.businessRole} onChange={(e) => updateCustomer('businessRole', e.target.value)} className="pl-11 h-12 bg-muted/10 border-border/50 focus:border-[#2F7FD1] rounded-xl" />
                                  </div>
                              </div>
                          </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">Email *</Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input type="email" value={formData.customer.email} onChange={(e) => updateCustomer('email', e.target.value)} className="pl-11 h-12 bg-muted/10 border-border/50 focus:border-[#2F7FD1] rounded-xl" required />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="font-bold text-secondary">Phone / WhatsApp *</Label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input type="tel" value={formData.customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} className="pl-11 h-12 bg-muted/10 border-border/50 focus:border-[#2F7FD1] rounded-xl" required />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-border/50">
                          <Label className="font-bold text-[#00275F] text-lg">Preferred contact method</Label>
                          <div className="flex flex-wrap gap-3">
                              {['Email', 'Phone call', 'SMS', 'WhatsApp'].map(opt => (
                                  <button key={opt} type="button" onClick={() => updateCustomer('contactMethod', opt)} className={cn("px-6 py-3 rounded-full border-2 text-sm font-bold transition-all", formData.customer.contactMethod === opt ? "bg-[#2F7FD1] text-white border-[#2F7FD1] shadow-md" : "bg-white text-secondary border-border/50 hover:border-[#2F7FD1]/40")}>{opt}</button>
                              ))}
                          </div>
                      </div>

                      <div className="pt-8 border-t border-border/50 space-y-4">
                        <Label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-border/40 hover:bg-muted/10 transition-colors">
                          <div className="mt-0.5 relative flex items-center justify-center w-6 h-6 shrink-0 border-2 rounded transition-colors" style={{borderColor: formData.customer.consentQuote ? '#2F7FD1' : '#cbd5e1', backgroundColor: formData.customer.consentQuote ? '#2F7FD1' : 'white'}}>
                             <input type="checkbox" className="sr-only" checked={formData.customer.consentQuote} onChange={(e) => updateCustomer('consentQuote', e.target.checked)} />
                             {formData.customer.consentQuote && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-sm font-medium text-secondary leading-relaxed select-none">
                            I understand this is a quote request and the final quote will be confirmed after review. *
                          </span>
                        </Label>

                        <Label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-border/40 hover:bg-muted/10 transition-colors">
                          <div className="mt-0.5 relative flex items-center justify-center w-6 h-6 shrink-0 border-2 rounded transition-colors" style={{borderColor: formData.customer.consentService ? '#2F7FD1' : '#cbd5e1', backgroundColor: formData.customer.consentService ? '#2F7FD1' : 'white'}}>
                             <input type="checkbox" className="sr-only" checked={formData.customer.consentService} onChange={(e) => updateCustomer('consentService', e.target.checked)} />
                             {formData.customer.consentService && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-sm font-medium text-secondary leading-relaxed select-none">
                            I agree that Pope Cleaning Services may use my details to contact me about this quote request. *
                          </span>
                        </Label>

                        <Label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-border/40 hover:bg-muted/10 transition-colors">
                          <div className="mt-0.5 relative flex items-center justify-center w-6 h-6 shrink-0 border-2 rounded transition-colors" style={{borderColor: formData.customer.consentMarketing ? '#2F7FD1' : '#cbd5e1', backgroundColor: formData.customer.consentMarketing ? '#2F7FD1' : 'white'}}>
                             <input type="checkbox" className="sr-only" checked={formData.customer.consentMarketing} onChange={(e) => updateCustomer('consentMarketing', e.target.checked)} />
                             {formData.customer.consentMarketing && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-sm font-medium text-secondary leading-relaxed select-none">
                            I would like to receive occasional promotions, cleaning offers or refer-a-friend discounts. (Optional)
                          </span>
                        </Label>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 6: REVIEW */}
                  {currentStep === 5 && (
                    <motion.div key="step6" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-[#00275F] mb-2">Review your quote request</h2>
                        <p className="text-[#00275F]/60">Please review your details before submitting. Our team will prepare a tailored quote for you.</p>
                      </div>

                      <div className="bg-[#F5F8FC] rounded-2xl border border-[#00275F]/10 overflow-hidden shadow-inner">
                         <div className="p-6 border-b border-[#00275F]/10">
                            <h3 className="font-bold text-[#00275F] text-lg mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-[#2F7FD1]"/> Service Details</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                               <div><span className="text-muted-foreground block mb-1">Service</span><span className="font-bold text-secondary">{PLANS.find(p => p.id === formData.plan)?.title || 'Not specified'}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Frequency</span><span className="font-bold text-secondary">{FREQUENCIES.find(f => f.id === formData.frequency)?.label || 'Not specified'}</span></div>
                            </div>
                         </div>

                         <div className="p-6 border-b border-[#00275F]/10">
                            <h3 className="font-bold text-[#00275F] text-lg mb-4 flex items-center gap-2"><Home className="w-5 h-5 text-[#2F7FD1]"/> Property Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                               <div><span className="text-muted-foreground block mb-1">Property Type</span><span className="font-bold text-secondary">{PROPERTY_TYPES.find(p => p.id === formData.propertyType)?.label || 'Not specified'}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Location</span><span className="font-bold text-secondary">{formData.suburb} {formData.postcode}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Approx. Area</span><span className="font-bold text-secondary">{formData.area || 'Not specified'}</span></div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-border/50 text-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {isResidential && (
                                   <>
                                     <div><span className="text-muted-foreground block text-xs">Bedrooms</span><span className="font-bold">{formData.bedrooms}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Bathrooms</span><span className="font-bold">{formData.bathrooms}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Showers/Toilets</span><span className="font-bold">{formData.showers} / {formData.toilets}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Floors/Levels</span><span className="font-bold">{formData.floors}</span></div>
                                   </>
                                )}
                                {isCommercial && (
                                   <>
                                     <div><span className="text-muted-foreground block text-xs">Workstations</span><span className="font-bold">{formData.workstations}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Bathrooms</span><span className="font-bold">{formData.bathrooms}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Kitchens</span><span className="font-bold">{formData.kitchens}</span></div>
                                     <div><span className="text-muted-foreground block text-xs">Meeting Rms</span><span className="font-bold">{formData.meetingRooms}</span></div>
                                   </>
                                )}
                            </div>
                         </div>

                         {Object.values(formData.extras).some(Boolean) && (
                            <div className="p-6 border-b border-[#00275F]/10">
                                <h3 className="font-bold text-[#00275F] text-lg mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#2F7FD1]"/> Selected Extras</h3>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(formData.extras).map(([k, v]) => {
                                    if (!v) return null;
                                    return <span key={k} className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-[#00275F] border border-[#00275F]/10 shadow-sm">{EXTRAS_LIST.find(e => e.id === k)?.label || k}</span>
                                  })}
                                </div>
                            </div>
                         )}

                         <div className="p-6 border-b border-[#00275F]/10">
                            <h3 className="font-bold text-[#00275F] text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-[#2F7FD1]"/> Schedule & Access</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                               <div><span className="text-muted-foreground block mb-1">Preferred Date/Time</span><span className="font-bold text-secondary capitalize">{formData.preferredDate || 'Any'} • {formData.timeWindow || 'Any'}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Urgency</span><span className="font-bold text-secondary">{formData.howSoon || 'Flexible'}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Photos Uploaded</span><span className="font-bold text-secondary">{formData.photos.length} files</span></div>
                            </div>
                            {formData.accessNotes && (
                                <div className="mt-4 bg-white p-4 rounded-xl border border-border/50 text-sm">
                                    <span className="text-muted-foreground block mb-1 text-xs font-bold">Access Notes:</span>
                                    <p className="text-secondary italic">"{formData.accessNotes}"</p>
                                </div>
                            )}
                         </div>

                         <div className="p-6">
                            <h3 className="font-bold text-[#00275F] text-lg mb-4 flex items-center gap-2"><User className="w-5 h-5 text-[#2F7FD1]"/> Contact Details</h3>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                               <div><span className="text-muted-foreground block mb-1">Name</span><span className="font-bold text-secondary">{formData.customer.firstName} {formData.customer.lastName}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Email</span><span className="font-bold text-secondary">{formData.customer.email}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Phone</span><span className="font-bold text-secondary">{formData.customer.phone}</span></div>
                               <div><span className="text-muted-foreground block mb-1">Preferred Contact</span><span className="font-bold text-secondary">{formData.customer.contactMethod}</span></div>
                            </div>
                         </div>
                      </div>

                      <div className="bg-[#EAF5FF] p-5 rounded-2xl border border-[#2F7FD1]/20 text-center">
                          <p className="font-bold text-[#00275F] mb-1">Ready to submit?</p>
                          <p className="text-sm text-[#00275F]/70">Our team will review your request and contact you with a tailored quote before confirming your booking.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
                  {currentStep > 0 ? (
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                      className="h-14 px-6 rounded-xl font-bold text-secondary hover:bg-muted transition-colors border-2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  ) : <div></div>}

                  {currentStep < STEPS.length - 1 ? (
                    <Button 
                      onClick={handleNext}
                      className="h-14 px-8 rounded-xl bg-gradient-to-r from-[#2F7FD1] to-[#2E86DE] text-white hover:opacity-90 font-bold shadow-xl shadow-[#2F7FD1]/20 transition-all hover:scale-[1.02]"
                    >
                      Continue <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="h-14 px-10 rounded-xl bg-gradient-to-r from-[#00275F] to-[#001b44] text-white hover:opacity-90 font-bold shadow-xl shadow-[#00275F]/20 transition-all hover:scale-[1.02] text-lg"
                    >
                      {isSubmitting ? "Submitting..." : "Send My Quote Request"} <CheckCircle2 className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>
                {submitError && (
                  <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 font-medium" data-testid="text-submit-error">
                    {submitError}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR SUMMARY PANEL */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-[120px] bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-[#00275F]/5 border border-[#00275F]/5">
                <h3 className="text-2xl font-display font-bold text-[#00275F] mb-6 border-b border-border/50 pb-4">Your Quote Request</h3>
                
                {(!formData.plan && !formData.suburb && Object.values(formData.extras).filter(Boolean).length === 0) ? (
                  // TRUST POINTS (Shown before data is entered)
                  <div className="space-y-6 animate-in fade-in">
                     <p className="text-sm text-[#00275F]/70 leading-relaxed">Fill out the details on the left, and we'll prepare a custom quote just for you.</p>
                     
                     <ul className="space-y-4">
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><Check className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">Reviewed by our team</span>
                        </li>
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><Star className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">Tailored to your property</span>
                        </li>
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><Camera className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">Photos help improve accuracy</span>
                        </li>
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><Shield className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">No hidden fees when details are accurate</span>
                        </li>
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><Calendar className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">Flexible Perth bookings</span>
                        </li>
                        <li className="flex gap-3">
                           <div className="mt-0.5 bg-[#EAF5FF] w-6 h-6 rounded-full flex items-center justify-center shrink-0"><HeartHandshake className="w-3.5 h-3.5 text-[#2F7FD1]"/></div>
                           <span className="text-sm font-medium text-secondary">Local family-run business</span>
                        </li>
                     </ul>
                  </div>
                ) : (
                  // DYNAMIC SUMMARY (Shown as data is entered)
                  <div className="space-y-5 animate-in fade-in">
                    {formData.plan && (
                      <div>
                        <p className="font-bold text-[#00275F] text-lg leading-tight">{PLANS.find(p => p.id === formData.plan)?.title}</p>
                        {formData.frequency && <p className="text-sm font-medium text-[#2F7FD1] bg-[#EAF5FF] inline-block px-2.5 py-1 rounded-md mt-2">{FREQUENCIES.find(f => f.id === formData.frequency)?.label}</p>}
                      </div>
                    )}

                    {(formData.propertyType || formData.suburb) && (
                      <div className="pt-4 border-t border-border/50">
                        <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Property</p>
                        <div className="space-y-1.5 text-sm text-secondary font-medium">
                            {formData.propertyType && <p className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground"/> {PROPERTY_TYPES.find(p => p.id === formData.propertyType)?.label}</p>}
                            {(formData.suburb || formData.postcode) && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground"/> {formData.suburb} {formData.postcode}</p>}
                            {(isResidential && formData.bedrooms > 0) && <p className="flex items-center gap-2 text-muted-foreground ml-6 text-xs">{formData.bedrooms} Beds, {formData.bathrooms} Baths</p>}
                            {(isCommercial && formData.workstations > 0) && <p className="flex items-center gap-2 text-muted-foreground ml-6 text-xs">{formData.workstations} Desks, {formData.bathrooms} Baths</p>}
                        </div>
                      </div>
                    )}

                    {Object.values(formData.extras).some(Boolean) && (
                      <div className="pt-4 border-t border-border/50">
                        <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Extras</p>
                        <ul className="space-y-1.5">
                          {Object.entries(formData.extras).map(([k, v]) => {
                            if (!v) return null;
                            return (
                              <li key={k} className="text-sm flex items-start gap-2 text-secondary font-medium">
                                <Check className="w-4 h-4 text-[#2F7FD1] shrink-0" />
                                <span>{EXTRAS_LIST.find(e => e.id === k)?.label || k}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {(formData.preferredDate || formData.timeWindow) && (
                       <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Schedule</p>
                          <p className="text-sm font-medium text-secondary flex items-center gap-2 capitalize">
                              <Calendar className="w-4 h-4 text-muted-foreground"/>
                              {formData.preferredDate || 'Any date'} {formData.timeWindow && `• ${formData.timeWindow}`}
                          </p>
                       </div>
                    )}
                    
                    {formData.photos.length > 0 && (
                       <div className="pt-4 border-t border-border/50">
                          <p className="text-sm font-medium text-secondary flex items-center gap-2">
                              <Camera className="w-4 h-4 text-[#2F7FD1]"/>
                              {formData.photos.length} Photo{formData.photos.length !== 1 ? 's' : ''} added
                          </p>
                       </div>
                    )}
                    
                    {formData.customer.firstName && (
                       <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                          <p className="text-sm font-medium text-secondary flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground"/>
                              {formData.customer.firstName} {formData.customer.lastName}
                          </p>
                          {formData.customer.contactMethod && (
                             <p className="text-xs text-muted-foreground ml-6 mt-1">Prefers {formData.customer.contactMethod}</p>
                          )}
                       </div>
                    )}

                    <div className="pt-5 mt-2 border-t-2 border-dashed border-[#00275F]/10">
                       <p className="text-xs font-bold text-[#00275F]/50 text-center uppercase tracking-wider">
                          Final quote confirmed after review.
                       </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
