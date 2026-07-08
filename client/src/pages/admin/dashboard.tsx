import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CalendarCheck, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const metrics = [
    { title: "New Quote Requests", value: "3", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Quotes Needing Response", value: "5", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Quotes Sent", value: "12", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Accepted Quotes", value: "8", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    
    { title: "Today's Jobs", value: "4", icon: CalendarCheck, color: "text-[#2F7FD1]", bg: "bg-[#EAF5FF]" },
    { title: "This Week's Jobs", value: "18", icon: CalendarCheck, color: "text-[#2F7FD1]", bg: "bg-[#EAF5FF]" },
    { title: "Completed This Month", value: "42", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Pending Payments", value: "2", icon: DollarSign, color: "text-red-600", bg: "bg-red-100" },
    
    { title: "Paid This Month", value: "$18,450", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Expected Revenue", value: "$24,800", icon: TrendingUp, color: "text-[#2F7FD1]", bg: "bg-[#EAF5FF]" },
    { title: "Quote Conversion Rate", value: "68%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Average Job Value", value: "$430", icon: DollarSign, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Manage quote requests, bookings, payments and service activity."
    >
      <div className="flex justify-end mb-6">
        <Button onClick={() => setLocation('/admin/quotes')} className="bg-[#2F7FD1] hover:bg-[#00275F] font-bold">
          View Quote Requests
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${metric.bg}`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00275F] leading-none mb-1">{metric.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#00275F]">Recent Quote Requests</h2>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/admin/quotes')} className="text-[#2F7FD1]">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="p-0 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border/50 hover:bg-muted/30 last:border-0">
                <div>
                  <p className="font-bold text-secondary">Sarah Jenkins</p>
                  <p className="text-sm text-muted-foreground">Spring / Deep Cleaning • Subiaco</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    NEW
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Today */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#00275F]">Jobs Today</h2>
            <Button variant="ghost" size="sm" className="text-[#2F7FD1]">
              View Schedule <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="p-0 flex-1">
            <div className="p-4 border-b border-border/50 flex gap-4 hover:bg-muted/30">
              <div className="w-1.5 rounded-full bg-green-500 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-bold text-[#00275F]">8:00 AM - 10:00 AM</p>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Completed</span>
                </div>
                <p className="text-sm font-medium text-secondary">Regular Clean • Jones Residence</p>
                <p className="text-xs text-muted-foreground">123 Example St, Perth</p>
              </div>
            </div>
            
            <div className="p-4 border-b border-border/50 flex gap-4 hover:bg-muted/30">
              <div className="w-1.5 rounded-full bg-[#2F7FD1] shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-bold text-[#00275F]">11:00 AM - 2:00 PM</p>
                  <span className="text-xs font-bold text-[#2F7FD1] bg-[#EAF5FF] px-2 py-0.5 rounded-md">In Progress</span>
                </div>
                <p className="text-sm font-medium text-secondary">Spring Clean • Apartment 4B</p>
                <p className="text-xs text-muted-foreground">45 Mounts Bay Rd, Subiaco</p>
              </div>
            </div>

            <div className="p-4 border-b border-border/50 flex gap-4 hover:bg-muted/30">
              <div className="w-1.5 rounded-full bg-orange-400 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-bold text-[#00275F]">3:00 PM - 5:00 PM</p>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Upcoming</span>
                </div>
                <p className="text-sm font-medium text-secondary">Office Clean • Tech Hub</p>
                <p className="text-xs text-muted-foreground">Level 2, St Georges Tce, Perth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
