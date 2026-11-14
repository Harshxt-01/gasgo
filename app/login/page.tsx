"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, ShieldCheck, ArrowRight, Lock, User, Sparkles, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastProvider";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError("Please enter your registered email or SV Number.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your account password.");
      return;
    }

    setLoading(true);
    const result = await login(identifier.trim(), password.trim());
    setLoading(false);

    if (result.success) {
      toast({
        type: "success",
        title: "Welcome Back to AuraGas",
        message: "Authenticated successfully. Telemetry nodes linked.",
      });
      if (identifier.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error || "Authentication failed. Check your credentials.");
    }
  };

  const handleQuickDemo = async (type: "consumer" | "admin") => {
    const id = type === "consumer" ? "arjun.verma@auragas.io" : "admin@auragas.io";
    const pwd = type === "consumer" ? "demo" : "admin";
    setIdentifier(id);
    setPassword(pwd);
    setLoading(true);
    const result = await login(id, pwd);
    setLoading(false);

    if (result.success) {
      toast({
        type: "success",
        title: `Logged in as ${type === "consumer" ? "Consumer" : "Fleet Admin"}`,
        message: `Welcome, ${type === "consumer" ? "Arjun Verma" : "Dr. Vikram Sethi"}!`,
      });
      router.push(type === "consumer" ? "/dashboard" : "/admin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 p-4 sm:p-6 transition-colors">
      {/* Top Bar */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            Aura<span className="text-orange-500">Gas</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            About AuraGas
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Card */}
      <main className="max-w-md w-full mx-auto my-12">
        <div className="rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center border border-orange-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Sign In to AuraGas
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Access your subsidized cylinder quota, live dispatches, and IoT telemetry.
            </p>
          </div>

          {/* Quick Demo Mode Chips */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 1-Click Evaluation Sign In:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("consumer")}
                disabled={loading}
                className="py-2 px-3 rounded-xl text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-all text-center"
              >
                Consumer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                disabled={loading}
                className="py-2 px-3 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all text-center"
              >
                Fleet Admin Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                Consumer SV Voucher / Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. SV-8492018 or arjun.verma@auragas.io"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Password
                </label>
                <span className="text-[11px] text-orange-500 hover:underline cursor-pointer">
                  Forgot PIN?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-slate-500 dark:text-zinc-400">
            Don't have an active connection?{" "}
            <Link href="/signup" className="font-bold text-orange-500 hover:underline">
              Apply for SV Voucher &rarr;
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-slate-400 dark:text-zinc-500">
        <p>AuraGas National LPG Telemetry • PESO Certified & DBTL Approved</p>
      </footer>
    </div>
  );
}

