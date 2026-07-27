import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ENABLE_ADMIN_LOGIN } from "@/config/featureFlags";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import QuotePage from "@/pages/quote";
import ServicesPage from "@/pages/services";
import AboutPage from "@/pages/about";
import PricingPage from "@/pages/pricing";
import PrivacyPage from "@/pages/privacy";
import NotFound from "@/pages/not-found";

// Auth/portal/admin pages are lazy-loaded: they are not part of the public
// customer journey and this keeps them out of the initial bundle.
const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const CustomerDashboard = lazy(() => import("@/pages/portal/dashboard"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminQuotes = lazy(() => import("@/pages/admin/quotes"));
const AdminQuoteDetail = lazy(() => import("@/pages/admin/quotes/detail"));

const PAGE_TITLES: Record<string, string> = {
  "/": "Pope Cleaning Services | Professional Cleaning in Perth, WA",
  "/services": "Our Services | Pope Cleaning Services",
  "/pricing": "Pricing Info | Pope Cleaning Services",
  "/about": "About Us | Pope Cleaning Services",
  "/book": "Book Now | Pope Cleaning Services",
  "/quote": "Request a Quote | Pope Cleaning Services",
  "/privacy": "Privacy Policy | Pope Cleaning Services",
};

function ScrollToTop() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? "Pope Cleaning Services";
  }, [pathname]);
  
  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 text-[#2F7FD1] animate-spin" />
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 flex flex-col w-full h-full"
        >
          <Suspense fallback={<RouteFallback />}>
            <Switch location={location}>
              <Route path="/" component={Home}/>
              <Route path="/book" component={Booking}/>
              <Route path="/quote" component={QuotePage}/>
              <Route path="/services" component={ServicesPage}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/pricing" component={PricingPage}/>
              <Route path="/privacy" component={PrivacyPage}/>
              {/* Admin login is temporarily hidden for public release.
                  Re-enable with VITE_ENABLE_ADMIN_LOGIN=true.
                  When disabled, these routes fall through to the 404 page.
                  Admin dashboard is preserved for future development and
                  should not be exposed publicly until ready. */}
              {ENABLE_ADMIN_LOGIN && <Route path="/auth/login" component={Login}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/auth/signup" component={Signup}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/login" component={Login}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/portal/dashboard" component={CustomerDashboard}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/admin" component={AdminDashboard}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/admin/dashboard" component={AdminDashboard}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/admin/quotes" component={AdminQuotes}/>}
              {ENABLE_ADMIN_LOGIN && <Route path="/admin/quotes/:id" component={AdminQuoteDetail}/>}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
