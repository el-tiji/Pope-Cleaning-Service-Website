import { Link } from "wouter";
import { Users, Calendar, DollarSign, FileText, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Topbar */}
      <header className="bg-[#00275F] text-white h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="font-display font-bold text-xl tracking-wide">POPE <span className="text-[#2F7FD1]">ADMIN</span></div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white/80">Kevin Pope</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">KP</div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <nav className="p-4 space-y-1 flex-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-3">Overview</div>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold">
              <DollarSign className="w-5 h-5" /> Dashboard
            </a>
            
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-3">Operations</div>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              <Calendar className="w-5 h-5" /> Bookings Queue
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" /> Quotes
              </div>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              <Users className="w-5 h-5" /> Customers
            </a>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Link href="/auth/login"><a className="text-sm font-medium text-red-500 hover:text-red-700">Exit Admin</a></Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Overview for October 2026</p>
            </div>
            <Button className="bg-[#2F7FD1] hover:bg-[#00275F] text-white">Create Quote</Button>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium mb-1">Revenue This Month</p>
              <p className="text-2xl font-bold text-gray-900">$12,450</p>
              <p className="text-xs text-green-600 font-medium mt-2">+14% from last month</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium mb-1">New Quote Requests</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-orange-600 font-medium mt-2">3 awaiting response</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium mb-1">Upcoming Cleans</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-blue-600 font-medium mt-2">Next 7 days</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <p className="text-xs text-gray-500 font-medium mt-2">Quotes to bookings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Action Required */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Quote Requests</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 font-medium">Customer</th>
                      <th className="px-6 py-3 font-medium">Service</th>
                      <th className="px-6 py-3 font-medium">Est. Value</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
                      <td className="px-6 py-4 text-gray-600">Regular Home Cleaning</td>
                      <td className="px-6 py-4 text-gray-600">TBD</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider">New</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Emma Watson</td>
                      <td className="px-6 py-4 text-gray-600">Vacate Clean</td>
                      <td className="px-6 py-4 text-gray-600">$480</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider">New</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Liam Smith</td>
                      <td className="px-6 py-4 text-gray-600">Regular (Weekly)</td>
                      <td className="px-6 py-4 text-gray-600">$120/wk</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">Sent</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Olivia Brown</td>
                      <td className="px-6 py-4 text-gray-600">Spring Clean</td>
                      <td className="px-6 py-4 text-gray-600">$350</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Accepted</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">Schedule</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-6">Today's Schedule</h2>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
                  <div>
                    <p className="font-bold text-gray-900">8:00 AM - 10:00 AM</p>
                    <p className="text-sm text-gray-600 font-medium">Regular Clean • Jones Residence</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                  <div>
                    <p className="font-bold text-gray-900">11:00 AM - 2:00 PM</p>
                    <p className="text-sm text-gray-600 font-medium">Spring Clean • Apartment 4B</p>
                    <p className="text-xs text-blue-600 font-medium">In Progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gray-300 shrink-0"></div>
                  <div>
                    <p className="font-bold text-gray-900">3:00 PM - 5:00 PM</p>
                    <p className="text-sm text-gray-600 font-medium">Office Clean • Tech Hub</p>
                    <p className="text-xs text-gray-500">Upcoming</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}