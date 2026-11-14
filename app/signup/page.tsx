"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, ShieldCheck, ArrowRight, User, Mail, Phone, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastProvider";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [consumerType, setConsumerType] = useState<"domestic" | "commercial">("domestic");
  const [city, setCity] = useState("Bengaluru");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: "consumer",
    });
    setLoading(false);

    if (result.success) {
      toast({
        type: "success",
        title: "Connection Registered!",
        message: "Your new LPG SV consumer voucher has been issued with instant DBTL subsidy eligibility.",
      });
      router.push("/");
    } else {
      setError(result.error || "Registration failed. Please try again.");
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
            href="/login"
            className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Already Registered? Sign In
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Card */}
      <main className="max-w-lg w-full mx-auto my-10">
        <div className="rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              New Consumer Application
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Get an AuraGas Smart Connection
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Immediate allotment of Digital SV voucher with ₹300 direct DBTL subsidy on every refill.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Connection Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                Consumer Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConsumerType("domestic")}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                    consumerType === "domestic"
                      ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/30"
                      : "border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  Domestic Kitchen (14.2kg / 5kg)
                </button>
                <button
                  type="button"
                  onClick={() => setConsumerType("commercial")}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                    consumerType === "commercial"
                      ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/30"
                      : "border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  Commercial Catering (19kg)
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Full Name (As per Aadhaar/PAN) *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Verma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Mobile (For OTP Handover) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                City / Distribution Zone
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Compliance Note */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2 text-[11px] text-slate-600 dark:text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                By registering, your Aadhaar/PAN is mapped to the National DBTL server for instant subsidy credits on all subsidized 14.2kg refills.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Issue Smart SV Connection & Proceed</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-zinc-400">
            Already possess an SV voucher?{" "}
            <Link href="/login" className="font-bold text-orange-500 hover:underline">
              Log in to your account &rarr;
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

