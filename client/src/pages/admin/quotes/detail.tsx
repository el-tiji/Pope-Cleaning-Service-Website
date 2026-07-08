import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, User, Phone, Mail, MessageSquare, 
  MapPin, Home, Briefcase, Calendar, Clock,
  CheckCircle2, AlertCircle, FileText, Send, Save
} from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useState } from "react";

export default function QuoteDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const [internalNote, setInternalNote] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("350");

  return (
    <AdminLayout 
      title={`Quote Request ${id || "QR-1042"}`}
      subtitle="Submitted Oct 20, 2026 at 09:45 AM"
    >
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => setLocation('/admin/quotes')}
          className="text-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quotes
        </Button>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> NEW REQUEST
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Details */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold text-[#00275F] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2F7FD1]" /> Customer Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="font-bold text-lg text-secondary">Sarah Jenkins</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact Method</p>
                <p className="font-bold text-secondary capitalize">Email preferred</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" size="sm">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Service & Property */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold text-[#00275F] mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-[#2F7FD1]" /> Service & Property
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-[#EAF5FF] rounded-xl border border-[#2F7FD1]/20">
                <p className="text-sm text-[#00275F]/70 font-medium mb-1">Requested Service</p>
                <p className="text-xl font-bold text-[#00275F]">Spring / Deep Cleaning</p>
                <p className="text-sm font-medium text-[#2F7FD1] mt-1">One-off service</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Property Type</p>
                  <p className="font-bold text-secondary">House</p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Size</p>
                  <p className="font-bold text-secondary">181-250 sqm</p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-bold text-secondary flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2F7FD1]" /> Subiaco 6008
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-secondary mb-3">Rooms Configuration</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">4 Bedrooms</span>
                  <span className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">2 Bathrooms</span>
                  <span className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">1 Living Area</span>
                  <span className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">Single Level</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-secondary mb-3">Requested Extras</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#2F7FD1]/10 border border-[#2F7FD1]/20 rounded-lg text-sm font-bold text-[#00275F] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F7FD1]" /> Interior Windows
                  </span>
                  <span className="px-3 py-1.5 bg-[#2F7FD1]/10 border border-[#2F7FD1]/20 rounded-lg text-sm font-bold text-[#00275F] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F7FD1]" /> Oven Cleaning
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & Access */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold text-[#00275F] mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2F7FD1]" /> Schedule & Access
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Preferred Date</p>
                  <p className="font-bold text-secondary">October 24, 2026</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Window</p>
                  <p className="font-bold text-secondary">Morning</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Urgency</p>
                  <p className="font-bold text-secondary">Next week</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Parking</p>
                  <p className="font-bold text-secondary">Street parking</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Stairs/Lift</p>
                  <p className="font-bold text-secondary">Ground floor</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pets</p>
                  <p className="font-bold text-secondary">Yes, friendly (Dog)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Assistant */}
        <div className="space-y-6">
          <div className="bg-[#00275F] rounded-2xl p-6 shadow-xl sticky top-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2F7FD1]" /> Admin Quote Assistant
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">Internal Estimator</p>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm text-white/80">Base Service</p>
                  <p className="font-bold text-white">$250</p>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm text-white/80">Extras</p>
                  <p className="font-bold text-white">$100</p>
                </div>
                <div className="w-full h-px bg-white/20 my-3"></div>
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-white">Suggested Total</p>
                  <p className="text-2xl font-bold text-[#2F7FD1]">$350</p>
                </div>
              </div>

              <div>
                <Label className="text-white/80 mb-2">Final Quote Amount ($)</Label>
                <Input 
                  type="number" 
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="bg-white text-lg font-bold h-12" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full h-12 bg-[#2F7FD1] hover:bg-white hover:text-[#00275F] font-bold transition-colors">
                <Send className="w-4 h-4 mr-2" /> Send Quote to Customer
              </Button>
              <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
                Mark as Reviewing
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="font-bold text-[#00275F] mb-4">Internal Notes</h3>
            <Textarea 
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add private notes here. The customer will not see this."
              className="min-h-[120px] bg-muted/30 mb-4"
            />
            <Button variant="outline" className="w-full text-secondary">
              <Save className="w-4 h-4 mr-2" /> Save Note
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
