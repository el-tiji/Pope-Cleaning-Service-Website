import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import ServicesPage from "@/pages/services";
import AboutPage from "@/pages/about";
import ReviewsPage from "@/pages/reviews";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [pathname] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/book" component={Booking}/>
        <Route path="/services" component={ServicesPage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/reviews" component={ReviewsPage}/>
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
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
