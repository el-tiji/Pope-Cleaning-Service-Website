import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Calendar, Home, FileText, Settings, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-secondary">My Portal</h2>
            <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
          </div>
          
          <nav className="space-y-2 flex-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold">
              <Home className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-colors">
              <Calendar className="w-5 h-5 text-muted-foreground" /> My Bookings
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-colors">
              <FileText className="w-5 h-5 text-muted-foreground" /> Quotes & Invoices
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-gray-100 font-medium transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" /> Settings
            </a>
          </nav>
          
          <div className="pt-6 border-t border-gray-200">
            <Link href="/auth/login"><a className="text-sm font-medium text-red-500 hover:text-red-700">Log out</a></Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <h1 className="text-3xl font-bold text-secondary mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-500 font-medium mb-1">Next Cleaning</h3>
              <p className="text-2xl font-bold text-secondary mb-1">Oct 24, 9:00 AM</p>
              <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-auto pt-4">
                <CheckCircle2 className="w-4 h-4" /> Confirmed
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-500 font-medium mb-1">Pending Quotes</h3>
              <p className="text-2xl font-bold text-secondary mb-1">1 Action Required</p>
              <a href="#" className="text-sm text-primary font-medium flex items-center gap-1 mt-auto pt-4 hover:underline">
                Review quote <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-gray-500 font-medium mb-1">My Properties</h3>
              <p className="text-2xl font-bold text-secondary mb-1">2 Saved</p>
              <a href="#" className="text-sm text-primary font-medium flex items-center gap-1 mt-auto pt-4 hover:underline">
                Manage properties <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <h2 className="text-xl font-bold text-secondary mb-4">Upcoming Cleanings</h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-gray-500 uppercase">Oct</span>
                  <span className="text-xl font-bold text-secondary">24</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-secondary">Regular Cleaning</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                    <Clock className="w-4 h-4" /> 9:00 AM - 11:30 AM
                  </p>
                  <p className="text-sm text-muted-foreground">123 Sample St, Perth WA 6000</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Confirmed</span>
                <Button variant="outline" size="sm" className="transition-all hover:bg-gray-100">Manage</Button>
              </div>
            </div>
          </div>

        </main>
      </div>
      
      <Footer />
    </div>
  );
}