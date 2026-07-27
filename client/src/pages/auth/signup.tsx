import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, User, Mail, Phone, Lock } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/portal/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-[112px] pb-20">
        <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 shadow-xl border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">Create an Account</h1>
            <p className="text-muted-foreground">Join Pope Cleaning to manage your properties and bookings.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9 h-11 rounded-xl" placeholder="John" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-9 h-11 rounded-xl" placeholder="Doe" required />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" className="pl-9 h-11 rounded-xl" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="tel" className="pl-9 h-11 rounded-xl" placeholder="0400 000 000" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" className="pl-9 h-11 rounded-xl" placeholder="••••••••" required />
              </div>
            </div>
            
            <div className="flex items-start gap-3 mt-6 mb-6 p-4 bg-muted/30 rounded-xl border border-border">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and acknowledge the <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold mt-4" variant="default">
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login"><span className="text-primary font-bold hover:underline cursor-pointer">Log in</span></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}