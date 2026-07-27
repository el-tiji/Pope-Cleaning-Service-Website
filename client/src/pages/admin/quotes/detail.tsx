import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, User, Phone, Mail, MessageSquare, 
  MapPin, Home, Calendar,
  CheckCircle2, FileText, Save, Loader2, StickyNote, History
} from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Quote, QuoteStatus } from "@shared/schema";
import { QUOTE_STATUSES } from "@shared/schema";
import {
  PLAN_LABELS, STATUS_META, ROOM_LABELS, COMMERCIAL_LABELS, EXTRA_LABELS,
  formatDate, formatDateTime,
} from "@/lib/quote-utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function QuoteDetail() {
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const [internalNote, setInternalNote] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");

  const { data: quote, isLoading, isError } = useQuery<Quote>({
    queryKey: ["/api/admin/quotes", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/quotes/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (quote?.quoteAmount) setQuoteAmount(String(quote.quoteAmount));
  }, [quote?.quoteAmount]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes", id] });
    queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
  };

  const statusMutation = useMutation({
    mutationFn: async (status: QuoteStatus) => {
      const res = await apiRequest("PATCH", `/api/admin/quotes/${quote!.id}/status`, { status });
      return res.json();
    },
    onSuccess: (updated: Quote) => {
      invalidate();
      toast({ title: "Status updated", description: `${updated.reference} → ${STATUS_META[updated.status]?.label}` });
    },
    onError: () => toast({ title: "Could not update status", variant: "destructive" }),
  });

  const amountMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PATCH", `/api/admin/quotes/${quote!.id}/amount`, {
        amount: quoteAmount.trim() || null,
      });
      return res.json();
    },
    onSuccess: () => {
      invalidate();
      toast({ title: "Quote amount saved" });
    },
    onError: () => toast({ title: "Enter a valid amount (e.g. 350 or 350.50)", variant: "destructive" }),
  });

  const noteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/admin/quotes/${quote!.id}/notes`, { text: internalNote.trim() });
      return res.json();
    },
    onSuccess: () => {
      setInternalNote("");
      invalidate();
      toast({ title: "Internal note saved" });
    },
    onError: () => toast({ title: "Could not save note", variant: "destructive" }),
  });

  if (isLoading) {
    return (
      <AdminLayout title="Quote Request" subtitle="Loading…">
        <div className="flex items-center justify-center py-24 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading quote request…
        </div>
      </AdminLayout>
    );
  }

  if (isError || !quote) {
    return (
      <AdminLayout title="Quote Request" subtitle="Not found">
        <div className="bg-white p-10 rounded-2xl border border-border text-center max-w-lg mx-auto">
          <p className="font-bold text-secondary mb-2">This quote request could not be found.</p>
          <Button variant="outline" onClick={() => setLocation('/admin/quotes')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quotes
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const meta = STATUS_META[quote.status] ?? { label: quote.status, color: "bg-gray-100 text-gray-600" };
  const customer = quote.customer;
  const rooms = Object.entries(quote.rooms ?? {}).filter(([, v]) => v > 0);
  const commercial = Object.entries(quote.commercial ?? {}).filter(
    ([, v]) => v !== 0 && v !== false && v !== "" && v !== "not-sure",
  );
  const schedule = (quote.schedule ?? {}) as Record<string, string | string[] | undefined>;
  const phoneDigits = (customer?.phone ?? "").replace(/\D/g, "");
  const waLink = phoneDigits ? `https://wa.me/${phoneDigits.startsWith("0") ? "61" + phoneDigits.slice(1) : phoneDigits}` : undefined;

  const nextStatuses: { status: QuoteStatus; label: string }[] = QUOTE_STATUSES
    .filter((s) => s !== quote.status)
    .map((s) => ({ status: s, label: STATUS_META[s]?.label ?? s }));

  return (
    <AdminLayout 
      title={`Quote Request ${quote.reference}`}
      subtitle={`Submitted ${formatDateTime(quote.createdAt)} · via ${quote.source === "booking_form" ? "booking form" : "quote form"}`}
      copilotQuoteReference={quote.reference}
    >
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          onClick={() => setLocation('/admin/quotes')}
          className="text-secondary"
          data-testid="button-back-to-quotes"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quotes
        </Button>
        <span className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${meta.color}`} data-testid="text-quote-status">
          {meta.label}
        </span>
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
                <p className="font-bold text-lg text-secondary" data-testid="text-customer-name">
                  {customer?.firstName} {customer?.lastName}
                </p>
                {customer?.companyName && (
                  <p className="text-sm text-muted-foreground">{customer.companyName}{customer.businessRole ? ` · ${customer.businessRole}` : ""}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact Method</p>
                <p className="font-bold text-secondary capitalize">{customer?.contactMethod || "—"} preferred</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium text-secondary break-all">{customer?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <p className="font-medium text-secondary">{customer?.phone}</p>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Button variant="outline" className="flex-1" size="sm" asChild>
                  <a href={`mailto:${customer?.email}`}><Mail className="w-4 h-4 mr-2" /> Email</a>
                </Button>
                <Button variant="outline" className="flex-1" size="sm" asChild>
                  <a href={`tel:${customer?.phone}`}><Phone className="w-4 h-4 mr-2" /> Call</a>
                </Button>
                {waLink && (
                  <Button variant="outline" className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100" size="sm" asChild>
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                    </a>
                  </Button>
                )}
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
                <p className="text-xl font-bold text-[#00275F]" data-testid="text-service">{PLAN_LABELS[quote.plan] ?? quote.plan}</p>
                {quote.frequency && (
                  <p className="text-sm font-medium text-[#2F7FD1] mt-1 capitalize">{quote.frequency.replace(/-/g, " ")}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Property Type</p>
                  <p className="font-bold text-secondary capitalize">
                    {quote.propertyType || "—"}{quote.otherPropertyType ? ` (${quote.otherPropertyType})` : ""}
                  </p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Size</p>
                  <p className="font-bold text-secondary">{quote.area ? quote.area.replace(/-/g, " – ") + (quote.area.match(/\d/) ? " sqm" : "") : "—"}</p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-bold text-secondary flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2F7FD1]" /> {quote.suburb || "—"} {quote.postcode}
                  </p>
                </div>
              </div>

              {rooms.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-secondary mb-3">Rooms Configuration</p>
                  <div className="flex flex-wrap gap-2">
                    {rooms.map(([key, value]) => (
                      <span key={key} className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">
                        {value} {ROOM_LABELS[key] ?? key}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {commercial.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-secondary mb-3">Commercial Details</p>
                  <div className="flex flex-wrap gap-2">
                    {commercial.map(([key, value]) => (
                      <span key={key} className="px-3 py-1.5 bg-muted/50 rounded-lg text-sm font-medium text-secondary">
                        {COMMERCIAL_LABELS[key] ?? key}: {String(value) === "true" ? "Yes" : String(value).replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(quote.extras?.length ?? 0) > 0 && (
                <div>
                  <p className="text-sm font-bold text-secondary mb-3">Requested Extras</p>
                  <div className="flex flex-wrap gap-2">
                    {quote.extras!.map((extra) => (
                      <span key={extra} className="px-3 py-1.5 bg-[#2F7FD1]/10 border border-[#2F7FD1]/20 rounded-lg text-sm font-bold text-[#00275F] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2F7FD1]" /> {EXTRA_LABELS[extra] ?? extra}
                      </span>
                    ))}
                  </div>
                  {quote.otherExtras && (
                    <p className="text-sm text-muted-foreground mt-2 italic">"{quote.otherExtras}"</p>
                  )}
                </div>
              )}
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
                  <p className="font-bold text-secondary">{schedule.preferredDate ? formatDate(String(schedule.preferredDate)) : "Flexible"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time Window</p>
                  <p className="font-bold text-secondary capitalize">{String(schedule.timeWindow ?? "—").replace(/-/g, " ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Urgency</p>
                  <p className="font-bold text-secondary capitalize">{String(schedule.howSoon ?? "—").replace(/-/g, " ")}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Parking</p>
                  <p className="font-bold text-secondary capitalize">{String(schedule.parking ?? "—").replace(/-/g, " ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Stairs/Lift</p>
                  <p className="font-bold text-secondary capitalize">{String(schedule.stairsLift ?? "—").replace(/-/g, " ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pets</p>
                  <p className="font-bold text-secondary capitalize">{String(schedule.pets ?? "—").replace(/-/g, " ")}</p>
                </div>
              </div>
              {schedule.accessNotes && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Access Notes</p>
                  <p className="text-sm text-secondary bg-muted/30 rounded-lg p-3">{String(schedule.accessNotes)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status history */}
          {(quote.statusHistory?.length ?? 0) > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="font-bold text-[#00275F] mb-4 flex items-center gap-2">
                <History className="w-4 h-4 text-[#2F7FD1]" /> Status History
              </h3>
              <div className="space-y-2">
                {quote.statusHistory!.slice().reverse().map((change, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b border-border/50 last:border-0 pb-2 last:pb-0">
                    <span className="text-secondary">
                      <span className="font-medium capitalize">{STATUS_META[change.from]?.label ?? change.from}</span>
                      {" → "}
                      <span className="font-bold capitalize">{STATUS_META[change.to]?.label ?? change.to}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDateTime(change.at)} · {change.byEmail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quote actions */}
        <div className="space-y-6">
          <div className="bg-[#00275F] rounded-2xl p-6 shadow-xl lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2F7FD1]" /> Quote Actions
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label className="text-white/80 mb-2">Final Quote Amount ($)</Label>
                <div className="flex gap-2">
                  <Input 
                    type="text"
                    inputMode="decimal"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="e.g. 350"
                    className="bg-white text-lg font-bold h-12" 
                    data-testid="input-quote-amount"
                  />
                  <Button
                    onClick={() => amountMutation.mutate()}
                    disabled={amountMutation.isPending}
                    className="h-12 bg-[#2F7FD1] hover:bg-white hover:text-[#00275F] font-bold transition-colors"
                    data-testid="button-save-amount"
                  >
                    {amountMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-[11px] text-white/50 mt-2">
                  Set the amount before marking the quote as sent. The copilot can suggest pricing from the internal playbook.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Move to status</Label>
              <div className="grid grid-cols-2 gap-2">
                {nextStatuses.map(({ status, label }) => (
                  <Button
                    key={status}
                    variant="outline"
                    disabled={statusMutation.isPending}
                    onClick={() => statusMutation.mutate(status)}
                    className={cn(
                      "h-10 border-white/20 bg-transparent text-white hover:bg-white/10 text-xs font-bold",
                      status === "quote_sent" && "bg-[#2F7FD1] border-[#2F7FD1] hover:bg-[#2F7FD1]/80",
                    )}
                    data-testid={`button-status-${status}`}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="font-bold text-[#00275F] mb-4 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-[#2F7FD1]" /> Internal Notes
            </h3>

            {(quote.internalNotes?.length ?? 0) > 0 && (
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {quote.internalNotes!.slice().reverse().map((note) => (
                  <div key={note.id} className="bg-muted/30 rounded-lg p-3" data-testid="internal-note">
                    <p className="text-sm text-secondary whitespace-pre-wrap">{note.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-1.5">{formatDateTime(note.createdAt)} · {note.authorEmail}</p>
                  </div>
                ))}
              </div>
            )}

            <Textarea 
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Add private notes here. The customer will not see this."
              className="min-h-[100px] bg-muted/30 mb-3"
              data-testid="input-internal-note"
            />
            <Button 
              variant="outline" 
              className="w-full text-secondary"
              disabled={!internalNote.trim() || noteMutation.isPending}
              onClick={() => noteMutation.mutate()}
              data-testid="button-save-note"
            >
              {noteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Note
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
