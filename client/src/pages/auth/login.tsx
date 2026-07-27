import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/login", { email, password });
      return res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/auth/me"], user);
      setLocation("/admin/dashboard");
    },
    onError: (err: Error) => {
      const message = err.message.includes("401")
        ? "Invalid email or password."
        : err.message.includes("429")
          ? "Too many attempts — please wait 15 minutes."
          : "Could not log in. Please try again.";
      setError(message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    login.mutate();
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
                  placeholder="you@popecleaning.com" 
                  autoComplete="email"
                  required 
                  data-testid="input-login-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl" 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  required 
                  data-testid="input-login-password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" data-testid="text-login-error">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={login.isPending}
              className="w-full h-12 rounded-xl text-lg font-bold bg-[#2F7FD1] hover:bg-[#00275F] text-white" 
              variant="default"
              data-testid="button-login-submit"
            >
              {login.isPending ? (
                <>
                  Logging in… <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                </>
              ) : (
                <>
                  Log In <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Staff access only. Contact the administrator if you need an account.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
