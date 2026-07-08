import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  CalendarCheck, 
  Calendar, 
  Users, 
  DollarSign, 
  BarChart, 
  Megaphone, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Quote Requests', href: '/admin/quotes', icon: FileText, badge: '3' },
    { name: 'Bookings', href: '#', icon: CalendarCheck },
    { name: 'Calendar', href: '#', icon: Calendar },
    { name: 'Customers', href: '#', icon: Users },
    { name: 'Finance', href: '#', icon: DollarSign },
    { name: 'Reports', href: '#', icon: BarChart },
    { name: 'Marketing', href: '#', icon: Megaphone },
    { name: 'Settings', href: '#', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5F8FC]">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#00275F] text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="font-display font-bold text-lg tracking-wide">POPE <span className="text-[#2F7FD1]">ADMIN</span></div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 bg-[#00275F] text-white hidden md:flex items-center px-6">
          <div className="font-display font-bold text-xl tracking-wide">POPE <span className="text-[#2F7FD1]">ADMIN</span></div>
        </div>
        
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF5FF] text-[#2F7FD1] flex items-center justify-center font-bold">KP</div>
            <div>
              <p className="text-sm font-bold text-secondary">Kevin Pope</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href !== '#' && location.startsWith(item.href) && item.href !== '/admin/dashboard');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href !== '#') {
                    setLocation(item.href);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors justify-between",
                  isActive 
                    ? "bg-[#EAF5FF] text-[#2F7FD1] font-bold" 
                    : "text-secondary hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-[#2F7FD1]" : "text-muted-foreground")} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              setLocation('/login');
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </a>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-screen overflow-hidden">
        {/* Page Header */}
        {(title || subtitle) && (
          <div className="bg-white border-b border-border px-6 py-6 md:px-10 md:py-8 shrink-0">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-[#00275F] mb-1">{title}</h1>}
            {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
