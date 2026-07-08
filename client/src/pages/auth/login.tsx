import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock routing based on email
    if (email.includes("admin")) {
      setLocation("/admin/dashboard");
    } else {
      setLocation("/portal/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-xl border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to manage your bookings and quotes.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl" 
                  placeholder="you@example.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold" variant="default">
              Log In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Tip: Use <span className="font-bold">admin@pope.com</span> to see the Admin Portal, or any other email for the Customer Portal.
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup"><a className="text-primary font-bold hover:underline">Sign up</a></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}