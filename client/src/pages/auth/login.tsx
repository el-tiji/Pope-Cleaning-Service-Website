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
      <main className="flex-1 flex items-center justify-center p-4 pt-[112px] pb-20">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-xl border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#00275F] mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Access the Pope Cleaning Services admin dashboard.</p>
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
                  placeholder="admin@popecleaning.com" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <a href="#" className="text-sm text-[#2F7FD1] hover:underline font-medium">Forgot password?</a>
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

            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold bg-[#2F7FD1] hover:bg-[#00275F] text-white" variant="default">
              Log In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="text-center mt-6 text-sm text-muted-foreground bg-[#EAF5FF] p-3 rounded-lg border border-[#2F7FD1]/20">
              <span className="font-bold text-[#00275F]">Prototype Mode:</span> Use any email containing "admin" to access the Admin Portal.
            </div>
          </form>

        </div>
      </main>
      <Footer />
    </div>
  );
}