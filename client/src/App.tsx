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

const SITE_URL = "https://www.popecleaningservices.com.au";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Pope Cleaning Services | Professional Cleaning in Perth, WA",
    description:
      "Family-owned residential and commercial cleaning in Perth, Western Australia. Regular, deep, vacate, carpet, tile and pressure cleaning — request your free quote today.",
  },
  "/services": {
    title: "Our Services | Pope Cleaning Services",
    description:
      "Residential, commercial, vacate, carpet, upholstery, tile & grout and pressure cleaning services across Perth. See what Pope Cleaning Services can do for you.",
  },
  "/pricing": {
    title: "Pricing Info | Pope Cleaning Services",
    description:
      "How quoting works at Pope Cleaning Services: tell us about your property and we prepare a personalised cleaning quote — no obligation.",
  },
  "/about": {
    title: "About Us | Pope Cleaning Services",
    description:
      "Meet the family team behind Pope Cleaning Services, providing reliable cleaning across Perth, Western Australia.",
  },
  "/book": {
    title: "Book Now | Pope Cleaning Services",
    description:
      "Request your cleaning quote in minutes. Tell us about your home or business in Perth and we'll get back to you with a personalised quote.",
  },
  "/quote": {
    title: "Request a Quote | Pope Cleaning Services",
    description:
      "Get a free personalised cleaning quote for your Perth home or business from Pope Cleaning Services.",
  },
  "/privacy": {
    title: "Privacy Policy | Pope Cleaning Services",
    description: "How Pope Cleaning Services collects, uses and protects your information.",
  },
};

function setMetaTag(selector: string, attr: string, value: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function ScrollToTop() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const meta = PAGE_META[pathname];
    document.title = meta?.title ?? "Pope Cleaning Services";
    if (meta) {
      setMetaTag('meta[name="description"]', "content", meta.description, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      });
      setMetaTag('link[rel="canonical"]', "href", `${SITE_URL}${pathname === "/" ? "/" : pathname}`, () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      });
    }
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
