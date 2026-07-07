import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import QuotePage from "@/pages/quote";
import ServicesPage from "@/pages/services";
import AboutPage from "@/pages/about";
import PricingPage from "@/pages/pricing";
import NotFound from "@/pages/not-found";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import CustomerDashboard from "@/pages/portal/dashboard";
import AdminDashboard from "@/pages/admin/dashboard";

function ScrollToTop() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
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
          className="flex-1 flex flex-col"
        >
          <Switch location={location}>
            <Route path="/" component={Home}/>
            <Route path="/book" component={Booking}/>
            <Route path="/quote" component={QuotePage}/>
            <Route path="/services" component={ServicesPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/pricing" component={PricingPage}/>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/signup" component={Signup}/>
            <Route path="/portal/dashboard" component={CustomerDashboard}/>
            <Route path="/admin/dashboard" component={AdminDashboard}/>
            <Route component={NotFound} />
          </Switch>
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
