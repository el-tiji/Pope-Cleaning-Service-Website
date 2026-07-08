import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, MoreHorizontal } from "lucide-react";
import { useLocation } from "wouter";

export default function QuoteRequests() {
  const [, setLocation] = useLocation();

  const quotes = [
    {
      id: "QR-1042",
      customer: "Sarah Jenkins",
      service: "Spring Clean",
      suburb: "Subiaco",
      date: "Oct 24, 2026",
      status: "new",
      statusLabel: "New",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "QR-1041",
      customer: "Michael Chen",
      service: "Office Clean",
      suburb: "Perth CBD",
      date: "Oct 25, 2026",
      status: "reviewing",
      statusLabel: "Reviewing",
      statusColor: "bg-amber-100 text-amber-800"
    },
    {
      id: "QR-1040",
      customer: "Emma Watson",
      service: "Vacate Clean",
      suburb: "Fremantle",
      date: "Oct 28, 2026",
      status: "quote_sent",
      statusLabel: "Quote Sent",
      statusColor: "bg-purple-100 text-purple-800"
    },
    {
      id: "QR-1039",
      customer: "David Brown",
      service: "Regular Clean",
      suburb: "Cottesloe",
      date: "Oct 22, 2026",
      status: "accepted",
      statusLabel: "Accepted",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

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
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#2F7FD1] hover:bg-[#00275F] font-bold flex-1 sm:flex-none">
            New Request
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Preferred Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-secondary">{quote.id}</td>
                  <td className="px-6 py-4 font-bold text-[#00275F]">{quote.customer}</td>
                  <td className="px-6 py-4 text-secondary">{quote.service}</td>
                  <td className="px-6 py-4 text-secondary">{quote.suburb}</td>
                  <td className="px-6 py-4 text-secondary">{quote.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${quote.statusColor}`}>
                      {quote.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setLocation(`/admin/quotes/${quote.id}`)}
                      className="text-[#2F7FD1] hover:text-[#00275F] hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
