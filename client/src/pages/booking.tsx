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
  Users, Building2, Layers, Store, Warehouse, Factory, Landmark, Dumbbell, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

// --- PRICING CONFIGURATION ---
const PRICING_CONFIG = {
  basePrices: {
    regular: 90,
    spring: 250,
    vacate: 400,
    office: 180
  },
  modifiers: {
    sqm: {
      'under120': 0,
      '121-180': 20,
      '181-250': 40,
      '251-350': 60,
      '350+': 90,
      '121-200': 30,
      '201-300': 60,
      '301-500': 100,
      '501-750': 200,
      '750+': 280
    },
    bedroom: 20,
    bathroom: 30,
    shower: 15,
    toilet: 10,
    floor: 20, // per floor above 1
    bedMaking: 10,
    extras: {
      balcony: { price: 30, includedIn: [] as string[] },
      interiorWindows: { price: 40, includedIn: ['spring', 'vacate'] as string[] },
      exteriorWindows: { price: 60, includedIn: ['vacate'] as string[] },
      garage: { price: 50, includedIn: ['vacate'] as string[] },
      poolArea: { price: 80, includedIn: [] as string[] },
      fridge: { price: 40, includedIn: [] as string[] },
      oven: { price: 50, includedIn: ['spring', 'vacate'] as string[] },
      cabinets: { price: 45, includedIn: ['spring', 'vacate'] as string[] },
      wallSpot: { price: 40, includedIn: ['spring', 'vacate'] as string[] },
      blinds: { price: 30, includedIn: [] as string[] },
      carpetSteam: { price: 50, includedIn: ['vacate'] as string[], isMultiplier: true }, // per room
      upholstery: { price: 45, includedIn: ['vacate'] as string[], isMultiplier: true }, // per couch
      pressure: { price: 90, includedIn: ['vacate'] as string[] },
      trash: { price: 25, includedIn: ['spring', 'vacate'] as string[] },
      garden: { price: 70, includedIn: [] as string[] }
    }
  },
  frequencyDiscounts: {
    'one-off': 0,
    '2-times-week': 0.25,
    'weekly': 0.15,
    'fortnightly': 0.10,
    'monthly': 0.10,
    'every-3-months': 0.05
  }
};

const PLANS = [
  { id: "regular", title: "Regular Cleaning", description: "Ideal for ongoing home maintenance (weekly/fortnightly).", icon: Calendar, startingPrice: PRICING_CONFIG.basePrices.regular },
  { id: "spring", title: "Spring Cleaning", description: "Ideal for deeper occasional cleaning of neglected areas.", icon: Sparkles, startingPrice: PRICING_CONFIG.basePrices.spring },
  { id: "vacate", title: "Vacate Cleaning", description: "Ideal for move-outs. Detailed and bond-inspection oriented.", icon: ShieldCheck, startingPrice: PRICING_CONFIG.basePrices.vacate },
  { id: "office", title: "Office Cleaning", description: "Professional commercial space cleaning and maintenance.", icon: Briefcase, startingPrice: PRICING_CONFIG.basePrices.office }
];

const FREQUENCIES = [
  { id: "one-off", label: "One-off", validFor: ['regular', 'spring', 'vacate', 'office'] },
  { id: "2-times-week", label: "2x a Week", validFor: ['regular', 'office'] },
  { id: "weekly", label: "Weekly", validFor: ['regular', 'office'] },
  { id: "fortnightly", label: "Fortnightly", validFor: ['regular', 'office'] },
  { id: "monthly", label: "Monthly", validFor: ['regular', 'spring', 'office'] },
  { id: "every-3-months", label: "Every 3 Months", validFor: ['spring'] }
];

const PROPERTY_TYPES = [
  { id: "house", label: "House", icon: Home },
  { id: "apartment", label: "Apartment / Unit", icon: Building },
  { id: "townhouse", label: "Townhouse", icon: Home }
];

const OFFICE_PROPERTY_TYPES = [
  { id: "regular-office", label: "Regular Office", icon: Briefcase },
  { id: "coworking", label: "Coworking Space", icon: Users },
  { id: "commercial-building", label: "Commercial Building", icon: Building2 },
  { id: "corporate-building", label: "Corporate Building", icon: Landmark },
  { id: "strata", label: "Strata / Common Areas", icon: Layers },
  { id: "retail", label: "Retail / Showroom", icon: Store },
  { id: "warehouse", label: "Warehouse / Industrial", icon: Warehouse },
  { id: "workshop", label: "Workshop / Factory", icon: Factory },
  { id: "public-facility", label: "Public Facility", icon: Building },
  { id: "gym", label: "Gym / Fitness Studio", icon: Dumbbell },
  { id: "other", label: "Other", icon: HelpCircle }
];

const SQM_RANGES = [
  { id: "under120", label: "Under 120 sqm" },
  { id: "121-180", label: "121 – 180 sqm" },
  { id: "181-250", label: "181 – 250 sqm" },
  { id: "251-350", label: "251 – 350 sqm" },
  { id: "350+", label: "350+ sqm" },
  { id: "121-200", label: "121 – 200 sqm" },
  { id: "201-300", label: "201 – 300 sqm" },
  { id: "301-500", label: "301 – 500 sqm" },
  { id: "501-750", label: "501 – 750 sqm" },
  { id: "750+", label: "750+ sqm" }
];

const EXTRAS_LIST = [
  { id: "balcony", label: "Balcony / Patio", type: "toggle" },
  { id: "interiorWindows", label: "Interior Windows", type: "toggle" },
  { id: "exteriorWindows", label: "Exterior Windows", type: "toggle" },
  { id: "garage", label: "Garage Sweep/Clean", type: "toggle" },
  { id: "poolArea", label: "Pool Area Tidy", type: "toggle" },
  { id: "fridge", label: "Fridge Inside", type: "toggle" },
  { id: "oven", label: "Oven Deep Clean", type: "toggle" },
  { id: "cabinets", label: "Cabinets Inside", type: "toggle" },
  { id: "wallSpot", label: "Wall Spot Cleaning", type: "toggle" },
  { id: "blinds", label: "Blinds Dusting/Wipe", type: "toggle" },
  { id: "trash", label: "Trash Removal", type: "toggle" },
  { id: "pressure", label: "Pressure Cleaning", type: "toggle" },
  { id: "garden", label: "Garden Tidy-up", type: "toggle" },
  { id: "carpetSteam", label: "Carpet Steam (Rooms)", type: "counter" },
  { id: "upholstery", label: "Upholstery (Couches)", type: "counter" }
];

const STEPS = ["Plan & Frequency", "Property Details", "Extras", "Logistics", "Details & Submit"];

const getFrequencyDiscount = (plan: string, frequency: string) => {
  if (plan === 'regular') {
    if (frequency === 'monthly') return 0.05;
    if (frequency === 'fortnightly') return 0.10;
  }
  return PRICING_CONFIG.frequencyDiscounts[frequency as keyof typeof PRICING_CONFIG.frequencyDiscounts] || 0;
};

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    plan: "regular",
    frequency: "fortnightly",
    propertyType: "house",
    otherPropertyType: "",
    area: "under120",
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
    showers: 2,
    toilets: 1,
    bedMaking: 0,
    extras: {} as Record<string, any>,
    suburb: "",
    parking: "easy",
    date: "",
    timeWindow: "morning",
    accessNotes: "",
    recommendations: "",
    customer: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactMethod: "email",
      language: "english"
    }
  });

  // Handle plan change logic (adjust frequency if needed)
  useEffect(() => {
    const validFreqs = FREQUENCIES.filter(f => f.validFor.includes(formData.plan))
      .sort((a, b) => {
        const discountA = getFrequencyDiscount(formData.plan, a.id);
        const discountB = getFrequencyDiscount(formData.plan, b.id);
        return discountB - discountA;
      });
      
    // Set frequency to the recommended option
    let recommendedId = validFreqs[Math.floor(validFreqs.length / 2)]?.id || 'one-off';
    if (formData.plan === 'regular') recommendedId = 'weekly';
    
    setFormData(prev => ({ ...prev, frequency: recommendedId }));

    // Auto-select included extras
    const newExtras = { ...formData.extras };
    EXTRAS_LIST.forEach(extra => {
      const config = PRICING_CONFIG.modifiers.extras[extra.id as keyof typeof PRICING_CONFIG.modifiers.extras];
      if (config.includedIn.includes(formData.plan)) {
        if (extra.type === 'toggle') newExtras[extra.id] = true;
        if (extra.type === 'counter' && !newExtras[extra.id]) newExtras[extra.id] = 1; 
      }
    });
    setFormData(prev => ({ ...prev, extras: newExtras }));
  }, [formData.plan]);

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateCustomer = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, customer: { ...prev.customer, [key]: value } }));
  };

  const updateExtra = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, extras: { ...prev.extras, [id]: value } }));
  };

  const incrementCounter = (key: string) => updateForm(key, (formData as any)[key] + 1);
  const decrementCounter = (key: string) => updateForm(key, Math.max(0, (formData as any)[key] - 1));

  const isStandard = formData.plan !== 'office';
  
  const getCounterExtra = (val: number, standard: number, price: number) => {
    if (isStandard) {
      return Math.max(0, val - standard) * price;
    }
    return val * price;
  };

  // Pricing Engine
  const calculateEstimate = () => {
    let base = PRICING_CONFIG.basePrices[formData.plan as keyof typeof PRICING_CONFIG.basePrices];
    
    let modifiers = 0;
    if (currentStep > 0) {
      modifiers += PRICING_CONFIG.modifiers.sqm[formData.area as keyof typeof PRICING_CONFIG.modifiers.sqm] || 0;

      modifiers += getCounterExtra(formData.bedrooms, 3, PRICING_CONFIG.modifiers.bedroom);
      modifiers += getCounterExtra(formData.bathrooms, 2, PRICING_CONFIG.modifiers.bathroom);
      modifiers += getCounterExtra(formData.showers, 2, PRICING_CONFIG.modifiers.shower);
      modifiers += getCounterExtra(formData.toilets, 1, PRICING_CONFIG.modifiers.toilet);
      modifiers += getCounterExtra(formData.floors, 1, PRICING_CONFIG.modifiers.floor);
      modifiers += getCounterExtra(formData.bedMaking, 0, PRICING_CONFIG.modifiers.bedMaking);
    }

    let extrasTotal = 0;
    if (currentStep > 1) {
      Object.entries(formData.extras).forEach(([key, value]) => {
        if (!value) return;
        const config = PRICING_CONFIG.modifiers.extras[key as keyof typeof PRICING_CONFIG.modifiers.extras];
        if (!config) return;
        
        // If it's included in the current plan, it's free
        if (config.includedIn.includes(formData.plan)) return;

        if ('isMultiplier' in config && config.isMultiplier && typeof value === 'number') {
          extrasTotal += config.price * value;
        } else if (value === true) {
          extrasTotal += config.price;
        }
      });
    }

    let subtotal = base + modifiers + extrasTotal;
    
    // Apply frequency discount
    const discountRate = getFrequencyDiscount(formData.plan, formData.frequency);
    const discountAmount = subtotal * discountRate;
    
    const preGstTotal = subtotal - discountAmount;
    const gstAmount = preGstTotal * 0.10; // 10% GST
    
    return {
      subtotal,
      discountAmount,
      gstAmount: Math.round(gstAmount),
      total: Math.round(preGstTotal + gstAmount),
      base,
      modifiers,
      extrasTotal
    };
  };

  const estimate = calculateEstimate();

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
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  // UI Components for Form
  const Counter = ({ label, value, onInc, onDec, extraCost }: any) => (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
      <div className="flex flex-col">
        <span className="font-medium text-secondary">{label}</span>
        {extraCost > 0 && <span className="text-xs font-bold text-primary">+${extraCost}</span>}
      </div>
      <div className="flex items-center gap-4">
        <button type="button" onClick={onDec} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
        <span className="w-4 text-center font-bold">{value}</span>
        <button type="button" onClick={onInc} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Quote Requested!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you, {formData.customer.firstName}! We've received your request for a {PLANS.find(p => p.id === formData.plan)?.title}. Our team will review your details and photos, and send a final confirmation to your email shortly.
            </p>
            <div className="bg-muted/50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-muted-foreground mb-1">Estimated Total</p>
              <p className="text-4xl font-bold text-primary">${estimate.total}</p>
            </div>
            <Button onClick={() => window.location.href = '/'} className="w-full h-14 rounded-xl text-lg font-bold">
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
      <main className="flex-1 pt-8 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Get your custom quote</h1>
              <p className="text-lg text-muted-foreground">
                Every property in Perth is unique. Use our interactive estimator to find the right plan and calculate your price instantly.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Form Area */}
            <div className="lg:col-span-2">
              
              {/* Progress Bar */}
              <RevealOnScroll delay={0.1}>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    {STEPS.map((step, idx) => (
                      <div key={idx} className={cn(
                        "text-xs font-bold uppercase tracking-wider hidden md:block",
                        idx === currentStep ? "text-primary" : idx < currentStep ? "text-primary/60" : "text-muted-foreground"
                      )}>
                        {step}
                      </div>
                    ))}
                    <div className="md:hidden text-sm font-bold text-primary uppercase tracking-wider">
                      Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex">
                    {STEPS.map((_, idx) => (
                      <div key={idx} className={cn(
                        "h-full flex-1 transition-colors duration-300",
                        idx <= currentStep ? "bg-primary" : "bg-transparent",
                        idx > 0 && "border-l border-white/20"
                      )} />
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Form Steps */}
              <RevealOnScroll delay={0.2}>
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-border">
                  
                  {/* STEP 1: Plan & Frequency */}
                  {currentStep === 0 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-6">1. Choose your plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PLANS.map(plan => {
                          const Icon = plan.icon;
                          const isSelected = formData.plan === plan.id;
                          return (
                            <div 
                              key={plan.id}
                              onClick={() => updateForm('plan', plan.id)}
                              className={cn(
                                "cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 relative",
                                isSelected ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/30"
                              )}
                            >
                              {isSelected && <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>}
                              <Icon className={cn("w-8 h-8 mb-3", isSelected ? "text-primary" : "text-muted-foreground")} />
                              <h4 className="font-bold text-lg text-secondary mb-1">{plan.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">Starting from ${plan.startingPrice}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-6">2. How often?</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {FREQUENCIES.filter(f => f.validFor.includes(formData.plan))
                          .sort((a, b) => {
                            const discountA = getFrequencyDiscount(formData.plan, a.id);
                            const discountB = getFrequencyDiscount(formData.plan, b.id);
                            return discountB - discountA;
                          })
                          .map((freq, index, array) => {
                          const isSelected = formData.frequency === freq.id;
                          const discount = getFrequencyDiscount(formData.plan, freq.id);
                          const isRecommended = array.length > 1 && (formData.plan === 'regular' ? freq.id === 'weekly' : index === Math.floor(array.length / 2));
                          return (
                            <div 
                              key={freq.id}
                              onClick={() => updateForm('frequency', freq.id)}
                              className={cn(
                                "cursor-pointer rounded-xl p-4 border-2 text-center transition-all duration-300 relative",
                                isSelected ? "border-primary bg-primary text-white shadow-md" : "border-border hover:border-primary/30"
                              )}
                            >
                              {isRecommended && (
                                <span className={cn(
                                  "absolute -top-3 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap",
                                  isSelected ? "bg-white text-primary" : "bg-primary text-white"
                                )}>
                                  Recommended
                                </span>
                              )}
                              {discount > 0 && (
                                <span className={cn(
                                  "absolute -top-3 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap",
                                  isSelected ? "bg-accent text-secondary" : "bg-green-100 text-green-700"
                                )}>
                                  Save {discount * 100}%
                                </span>
                              )}
                              <span className="font-bold text-sm block mt-1">{freq.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Property Details */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-6">Property Details</h3>
                      
                      <div className="space-y-6">
                        <div className={cn(
                          "grid gap-3",
                          formData.plan === 'office' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
                        )}>
                          {(formData.plan === 'office' ? OFFICE_PROPERTY_TYPES : PROPERTY_TYPES).map(pt => (
                            <div 
                              key={pt.id}
                              onClick={() => updateForm('propertyType', pt.id)}
                              className={cn(
                                "cursor-pointer rounded-xl p-3 border-2 text-center transition-all duration-300 flex flex-col items-center justify-center",
                                formData.propertyType === pt.id ? "border-primary bg-primary/5 text-primary shadow-md" : "border-border text-muted-foreground hover:border-primary/30"
                              )}
                            >
                              <pt.icon className="w-6 h-6 mb-2" />
                              <span className="font-semibold text-xs">{pt.label}</span>
                            </div>
                          ))}
                        </div>

                        {formData.propertyType === 'other' && formData.plan === 'office' && (
                          <div className="mt-4 animate-in fade-in duration-300">
                            <Label className="mb-2 block text-base">Please specify property type</Label>
                            <Input 
                              placeholder="e.g. Clinic, School, Studio..." 
                              className="bg-muted/50 border-transparent focus:border-primary"
                              value={formData.otherPropertyType}
                              onChange={(e) => updateForm('otherPropertyType', e.target.value)}
                            />
                          </div>
                        )}

                        <div>
                          <Label className="mb-3 block text-base">Approximate Internal Area</Label>
                          <div className={cn(
                            "grid gap-2",
                            formData.plan === 'office' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-5"
                          )}>
                            {SQM_RANGES.filter(range => {
                              if (formData.plan === 'office') {
                                return !['121-180', '181-250', '251-350', '350+'].includes(range.id);
                              } else {
                                return !['121-200', '201-300', '301-500', '501-750', '750+'].includes(range.id);
                              }
                            }).map(range => {
                              const extraCost = PRICING_CONFIG.modifiers.sqm[range.id as keyof typeof PRICING_CONFIG.modifiers.sqm] || 0;
                              return (
                              <div 
                                key={range.id}
                                onClick={() => updateForm('area', range.id)}
                                className={cn(
                                  "cursor-pointer rounded-lg p-2 border-2 text-center text-xs font-semibold transition-all flex flex-col justify-center items-center gap-1",
                                  formData.area === range.id ? "border-primary bg-primary text-white" : "border-border text-secondary hover:border-primary/30"
                                )}
                              >
                                <span>{range.label}</span>
                                {extraCost > 0 && (
                                  <span className={cn(
                                    "text-[10px] font-bold px-1.5 rounded",
                                    formData.area === range.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                                  )}>
                                    +${extraCost}
                                  </span>
                                )}
                              </div>
                            )})}
                          </div>
                        </div>

                        {formData.plan !== 'office' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Counter label="Bedrooms" value={formData.bedrooms} extraCost={getCounterExtra(formData.bedrooms, 3, PRICING_CONFIG.modifiers.bedroom)} onInc={() => incrementCounter('bedrooms')} onDec={() => decrementCounter('bedrooms')} />
                            <Counter label="Bathrooms" value={formData.bathrooms} extraCost={getCounterExtra(formData.bathrooms, 2, PRICING_CONFIG.modifiers.bathroom)} onInc={() => incrementCounter('bathrooms')} onDec={() => decrementCounter('bathrooms')} />
                            <Counter label="Separate Showers" value={formData.showers} extraCost={getCounterExtra(formData.showers, 2, PRICING_CONFIG.modifiers.shower)} onInc={() => incrementCounter('showers')} onDec={() => decrementCounter('showers')} />
                            <Counter label="Separate Toilets" value={formData.toilets} extraCost={getCounterExtra(formData.toilets, 1, PRICING_CONFIG.modifiers.toilet)} onInc={() => incrementCounter('toilets')} onDec={() => decrementCounter('toilets')} />
                            <Counter label="Floors / Levels" value={formData.floors} extraCost={getCounterExtra(formData.floors, 1, PRICING_CONFIG.modifiers.floor)} onInc={() => incrementCounter('floors')} onDec={() => updateForm('floors', Math.max(1, formData.floors - 1))} />
                            <Counter label="Beds to Make/Change" value={formData.bedMaking} extraCost={getCounterExtra(formData.bedMaking, 0, PRICING_CONFIG.modifiers.bedMaking)} onInc={() => incrementCounter('bedMaking')} onDec={() => decrementCounter('bedMaking')} />
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Extras */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-secondary">Extra Services</h3>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"><Info className="w-3 h-3"/> Some may be included in your plan</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {EXTRAS_LIST.map(extra => {
                        const config = PRICING_CONFIG.modifiers.extras[extra.id as keyof typeof PRICING_CONFIG.modifiers.extras];
                        const isIncluded = config.includedIn.includes(formData.plan);
                        const isSelected = formData.extras[extra.id];
                        
                        return (
                          <div 
                            key={extra.id}
                            onClick={() => {
                              if (isIncluded) return; // Prevent toggling included items
                              if (extra.type === 'toggle') updateExtra(extra.id, !isSelected);
                            }}
                            className={cn(
                              "flex flex-col justify-center p-4 rounded-xl border-2 transition-all relative overflow-hidden",
                              isIncluded ? "border-green-200 bg-green-50/50 cursor-default" : 
                              isSelected ? "border-primary bg-primary/5 cursor-pointer" : "border-border bg-muted/10 cursor-pointer hover:border-primary/30"
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                {extra.type === 'toggle' && (
                                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0", 
                                    isIncluded ? "bg-green-500 border-green-500 text-white" :
                                    isSelected ? "bg-primary border-primary text-white" : "border-muted-foreground"
                                  )}>
                                    {(isSelected || isIncluded) && <Check className="w-3.5 h-3.5" />}
                                  </div>
                                )}
                                <span className={cn("font-semibold text-sm", isIncluded ? "text-green-800" : "text-secondary")}>
                                  {extra.label}
                                </span>
                              </div>
                              
                              {isIncluded ? (
                                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">Included</span>
                              ) : extra.type === 'toggle' && isSelected ? (
                                <span className="text-xs font-bold text-primary">+${config.price}</span>
                              ) : null}
                            </div>

                            {extra.type === 'counter' && !isIncluded && (
                              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
                                <span className="text-xs font-bold text-primary">
                                  {formData.extras[extra.id] > 0 ? `+$${config.price * formData.extras[extra.id]}` : ""}
                                </span>
                                <div className="flex items-center gap-3">
                                  <button type="button" onClick={(e) => { e.stopPropagation(); updateExtra(extra.id, Math.max(0, (formData.extras[extra.id] || 0) - 1)); }} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border"><Minus className="w-3 h-3" /></button>
                                  <span className="w-4 text-center font-bold text-sm">{formData.extras[extra.id] || 0}</span>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); updateExtra(extra.id, (formData.extras[extra.id] || 0) + 1); }} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border border-border"><Plus className="w-3 h-3" /></button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: Logistics & Notes */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-secondary mb-6">Logistics & Access</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Suburb / Postal Code</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            placeholder="e.g. Joondalup 6027" 
                            className="pl-9 bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors"
                            value={formData.suburb}
                            onChange={(e) => updateForm('suburb', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Parking Availability</Label>
                        <div className="flex bg-muted/50 p-1 rounded-xl h-10">
                          {['Easy', 'Limited', 'Paid'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => updateForm('parking', opt.toLowerCase())}
                              className={cn(
                                "flex-1 text-sm font-semibold rounded-lg transition-all",
                                formData.parking === opt.toLowerCase() ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-secondary"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Preferred Date</Label>
                        <Input 
                          type="date" 
                          className="bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors"
                          value={formData.date}
                          onChange={(e) => updateForm('date', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Time Window</Label>
                        <div className="flex bg-muted/50 p-1 rounded-xl h-10">
                          {['Morning', 'Afternoon', 'Anytime'].map(opt => (
                            <button
                              key={opt}
                              onClick={() => updateForm('timeWindow', opt.toLowerCase())}
                              className={cn(
                                "flex-1 text-sm font-semibold rounded-lg transition-all",
                                formData.timeWindow === opt.toLowerCase() ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-secondary"
                              )}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Label className="mb-2 block">Special Access Notes / Recommendations</Label>
                      <Textarea 
                        placeholder="Please let us know about stairs without lift, pets, fragile items, or priority areas..."
                        className="min-h-[120px] bg-muted/50 border-transparent focus:border-primary focus:bg-white resize-none"
                        value={formData.recommendations}
                        onChange={(e) => updateForm('recommendations', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block flex items-center gap-2"><Camera className="w-4 h-4"/> Upload Photos (Optional but recommended)</Label>
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer flex flex-col items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                          <UploadCloud className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-secondary mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground">Kitchen, bathrooms, and living areas help us quote accurately.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Details & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <h3 className="text-2xl font-bold text-secondary mb-6">Your Details</h3>
                    
                    <form id="quote-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label>First Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input required placeholder="Jane" className="pl-9 bg-muted/50 border-transparent focus:border-primary" value={formData.customer.firstName} onChange={e => updateCustomer('firstName', e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name *</Label>
                        <Input required placeholder="Doe" className="bg-muted/50 border-transparent focus:border-primary" value={formData.customer.lastName} onChange={e => updateCustomer('lastName', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input required type="email" placeholder="jane@example.com" className="pl-9 bg-muted/50 border-transparent focus:border-primary" value={formData.customer.email} onChange={e => updateCustomer('email', e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input required type="tel" placeholder="0400 000 000" className="pl-9 bg-muted/50 border-transparent focus:border-primary" value={formData.customer.phone} onChange={e => updateCustomer('phone', e.target.value)} />
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label>Preferred Contact Method</Label>
                        <div className="flex flex-wrap gap-3">
                          {['Email', 'Phone', 'WhatsApp'].map(method => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => updateCustomer('contactMethod', method.toLowerCase())}
                              className={cn(
                                "px-4 py-2 text-sm font-semibold rounded-lg border transition-all",
                                formData.customer.contactMethod === method.toLowerCase() ? "bg-primary border-primary text-white" : "bg-white border-border text-secondary hover:border-primary/50"
                              )}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Form Navigation Controls */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleBack} 
                    className={cn("text-muted-foreground font-semibold hover:text-secondary", currentStep === 0 && "opacity-0 pointer-events-none")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {currentStep < STEPS.length - 1 ? (
                    <Button onClick={handleNext} className="h-12 px-8 rounded-xl font-bold shadow-md shadow-primary/20">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      form="quote-form"
                      disabled={isSubmitting}
                      className="h-12 px-8 rounded-xl font-bold bg-accent text-secondary hover:bg-accent/90 shadow-lg shadow-accent/20"
                    >
                      {isSubmitting ? "Processing..." : "Submit Quote Request"}
                    </Button>
                  )}
                </div>

              </div>
              </RevealOnScroll>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <RevealOnScroll delay={0.3}>
              <div className="sticky top-28 bg-secondary text-white rounded-[2rem] p-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <h3 className="font-display font-bold text-xl mb-4 relative z-10 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent"/> Live Estimate
                </h3>
                
                <div className="space-y-4 relative z-10 text-sm">
                  
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">Plan Selected</span>
                    <span className="font-bold text-accent">{PLANS.find(p => p.id === formData.plan)?.title}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70">Frequency</span>
                    <span className="font-bold">{FREQUENCIES.find(f => f.id === formData.frequency)?.label}</span>
                  </div>

                  {currentStep > 0 && (
                    <div className="space-y-2 border-b border-white/10 pb-4">
                      <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Property Details</p>
                      <div className="flex justify-between">
                        <span className="text-white/80">{formData.bedrooms} Beds, {formData.bathrooms} Baths</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Area: {SQM_RANGES.find(r => r.id === formData.area)?.label}</span>
                      </div>
                    </div>
                  )}

                  {estimate.extrasTotal > 0 && (
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-white/70">Extra Services</span>
                      <span className="font-bold">+${estimate.extrasTotal}</span>
                    </div>
                  )}

                  {estimate.discountAmount > 0 && (
                    <div className="flex justify-between items-center pb-2 text-green-400">
                      <span className="font-semibold">Frequency Discount</span>
                      <span className="font-bold">-${Math.round(estimate.discountAmount)}</span>
                    </div>
                  )}

                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-white/90 font-medium text-sm">Estimated Total</span>
                    <div className="text-right">
                      {estimate.discountAmount > 0 && (
                        <span className="text-white/40 line-through text-xs mr-2">${estimate.subtotal}</span>
                      )}
                      <span className="text-4xl font-display font-bold text-white">${estimate.total}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 mt-2 text-right">
                    <p className="text-xs font-semibold text-accent/80 border border-accent/20 px-2 py-0.5 rounded flex items-center gap-2">
                      <span>GST (10%)</span>
                      <span className="text-accent">${estimate.gstAmount}</span>
                    </p>
                    <p className="text-[10px] text-white/40 leading-tight">
                      * Estimated price before final confirmation.<br/> Final quote may be adjusted upon review.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 relative z-10 space-y-3">
                  {[
                    "Family-owned business in Perth",
                    "100% satisfaction guarantee",
                    "Fully insured and police-checked team",
                    "Transparent quotes tailored to your property",
                    "Flexible bookings across Perth metro",
                    "Eco-friendly options available"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-white/80 font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary"/>
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}