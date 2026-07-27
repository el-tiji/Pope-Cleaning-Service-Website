import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Loader2, Inbox } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Quote } from "@shared/schema";
import { PLAN_LABELS, STATUS_META, formatDate } from "@/lib/quote-utils";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "new", "reviewing", "quote_sent", "accepted", "completed"] as const;

export default function QuoteRequests() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof FILTERS)[number]>("all");

  const { data: quotes, isLoading, isError } = useQuery<Quote[]>({
    queryKey: ["/api/admin/quotes"],
  });

  const filtered = (quotes ?? []).filter((q) => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false;
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const customerName = `${q.customer?.firstName ?? ""} ${q.customer?.lastName ?? ""}`.toLowerCase();
    return (
      q.reference.toLowerCase().includes(term) ||
      customerName.includes(term) ||
      (q.suburb ?? "").toLowerCase().includes(term) ||
      (q.customer?.email ?? "").toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout 
      title="Quote Requests" 
      subtitle="Review customer requests, prepare quotes and convert accepted jobs into bookings."
    >
      <div className="bg-white p-4 rounded-xl border border-border mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by customer, ID or suburb..." 
            className="pl-9 bg-muted/30 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-quotes"
          />
        </div>
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors",
                statusFilter === f
                  ? "bg-[#00275F] text-white border-[#00275F]"
                  : "bg-white text-muted-foreground border-border hover:border-[#2F7FD1]/50",
              )}
              data-testid={`button-filter-${f}`}
            >
              {f === "all" ? "All" : STATUS_META[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading quote requests…
          </div>
        ) : isError ? (
          <div className="py-20 text-center text-muted-foreground">
            Could not load quote requests. Please refresh the page.
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Inbox className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="font-bold text-secondary">No quote requests {statusFilter !== "all" ? `with status "${STATUS_META[statusFilter]?.label}"` : "yet"}</p>
            <p className="text-sm text-muted-foreground mt-1">
              New submissions from the website quote form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold tracking-wider border-b border-border">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((quote) => {
                  const meta = STATUS_META[quote.status] ?? { label: quote.status, color: "bg-gray-100 text-gray-600" };
                  return (
                    <tr key={quote.id} className="hover:bg-muted/20 transition-colors" data-testid={`row-quote-${quote.reference}`}>
                      <td className="px-6 py-4 font-medium text-secondary">{quote.reference}</td>
                      <td className="px-6 py-4 font-bold text-[#00275F]">
                        {quote.customer?.firstName} {quote.customer?.lastName}
                      </td>
                      <td className="px-6 py-4 text-secondary">{PLAN_LABELS[quote.plan] ?? quote.plan}</td>
                      <td className="px-6 py-4 text-secondary">{quote.suburb || "—"}</td>
                      <td className="px-6 py-4 text-secondary">{formatDate(quote.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${meta.color}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setLocation(`/admin/quotes/${quote.reference}`)}
                          className="text-[#2F7FD1] hover:text-[#00275F] hover:bg-blue-50"
                          data-testid={`button-view-${quote.reference}`}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
