"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  Zap,
  Gauge,
  Truck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Lock,
  ChevronRight,
  Scale,
  Award,
  PhoneCall,
  Activity,
  Layers,
  Repeat,
  Compass,
  Star,
  Users,
  Check,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import { formatCurrency, CYLINDER_CATALOG } from "@/lib/utils";
import { CylinderTypeId } from "@/lib/types";
import { sound } from "@/lib/sound";

export default function LandingHomePage() {
  const [selectedCylinder, setSelectedCylinder] = useState<CylinderTypeId>(
    "domestic_14_2kg_subsidized"
  );
  const [quantity, setQuantity] = useState(1);

  const currentCyl = CYLINDER_CATALOG[selectedCylinder];
  const totalPrice = currentCyl.netPrice * quantity;
  const totalSubsidySavings = currentCyl.subsidyAmount * quantity;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors selection:bg-orange-500/20 selection:text-orange-500">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-cyan-400 p-[1.5px] shadow-glow-orange">
              <div className="w-full h-full bg-slate-900 dark:bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                Aura<span className="text-orange-500">Gas</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                PESO Certified
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <a
              href="#how-it-works"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cylinder Catalog
            </a>
            <a
              href="#telemetry"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              IoT Telemetry
            </a>
            <Link
              href="/about"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About Platform
            </Link>
            <Link
              href="/admin"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>Admin Ops</span>
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              onClick={() => sound.tick()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Dashboard</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Next-Generation Smart LPG Infrastructure 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Gas Cylinder Booking,{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-400 bg-clip-text text-transparent">
              Reinvented for Speed.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate endless queues and paper vouchers. Book in 30 seconds with 24-minute electric trike delivery, automatic government DBTL subsidies, and dynamic 4-digit verification OTPs.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              onClick={() => sound.tick()}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Get Started / Book Cylinder</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/signup"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 shadow-sm transition-all active:scale-95"
            >
              <Award className="w-4 h-4 text-cyan-500" />
              <span>Apply for New Connection</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all active:scale-95"
            >
              <Activity className="w-4 h-4" />
              <span>Fleet Admin Ops &rarr;</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              PESO Nagpur Certified (IS 3196)
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className="w-4 h-4 text-orange-500" />
              Direct DBTL ₹300 Subsidy Discount
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="w-4 h-4 text-cyan-500" />
              4-Digit Security Handover OTP
            </span>
          </div>

          {/* Floating UI Feature Showcase Mockup */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    auragas.io/telemetry/live-protocol
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Node Status: Active (Indiranagar Hub #4)
                </span>
              </div>

              {/* Grid Preview inside the card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* 1. Live Telemetry */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-orange-500" /> Kitchen Reserve
                    </span>
                    <span className="text-[10px] font-mono text-orange-500 font-bold">72%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                    <div className="w-[72%] h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    ~10.2 kg Net LPG &bull; 11 Days Predicted Run
                  </p>
                </div>

                {/* 2. Dispatch Radar */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-cyan-500" /> Electric Fleet
                    </span>
                    <span className="text-[10px] font-semibold text-cyan-500">24 km/h</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Trike KA 03 EX 4821
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Driver: Rajesh Kumar &bull; ETA 18 mins
                  </p>
                </div>

                {/* 3. Security OTP Handover */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Verification OTP
                  </span>
                  <div className="text-2xl font-black font-mono tracking-widest text-orange-500">
                    7429
                  </div>
                  <p className="text-[10px] text-emerald-500 font-semibold">
                    PESO Cryptographic Seal Checked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key National Metrics Bar */}
      <section className="border-y border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
              24 min
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Average Dispatch Time</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">
              ₹300 off
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Direct DBTL Subsidy/Refill</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-cyan-500 font-mono">
              34.5 bar
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Hydraulic Burst Tested</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-orange-500 font-mono">
              100%
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">OTP Handover Verified</p>
          </div>
        </div>
      </section>

      {/* Interactive Cylinder Catalog & Pricing Section */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
            Clear, Regulated Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Certified Cylinders for Every Need
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            From single-person studios to bustling restaurant kitchens. All prices include 5% GST and delivery.
          </p>
        </div>

        {/* Cylinder Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mini 5kg */}
          <div
            onClick={() => {
              setSelectedCylinder("mini_5kg");
              sound.tick();
            }}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCylinder === "mini_5kg"
                ? "border-cyan-500 bg-white dark:bg-zinc-900 shadow-xl ring-2 ring-cyan-500/20"
                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  Agile & Compact
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400">5 kg</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aura Mini 5kg</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Singles, students, outdoor camping, and secondary kitchen backup.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">₹420</span>
                <span className="text-xs text-slate-400 ml-1">net payable</span>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-center border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-colors block"
            >
              Order 5kg Mini &rarr;
            </Link>
          </div>

          {/* Domestic 14.2kg Subsidized (Featured) */}
          <div
            onClick={() => {
              setSelectedCylinder("domestic_14_2kg_subsidized");
              sound.tick();
            }}
            className={`relative p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCylinder === "domestic_14_2kg_subsidized"
                ? "border-orange-500 bg-white dark:bg-zinc-900 shadow-2xl ring-2 ring-orange-500/30 -translate-y-1"
                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-slate-300"
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white shadow-md shadow-orange-500/30">
              Most Popular Domestic
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  DBTL Govt Benefit
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400">14.2 kg</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Aura Domestic 14.2kg
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Standard household cylinder with ₹300 direct subsidy credit to your registered bank account.
              </p>
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-orange-500">₹503</span>
                  <span className="text-xs text-slate-400 line-through">₹803</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold">
                  Saves ₹300 per refill via DBTL
                </p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="mt-6 w-full py-3 rounded-xl font-bold text-xs text-center bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 transition-all block"
            >
              Order 14.2kg Domestic &rarr;
            </Link>
          </div>

          {/* Commercial 19kg Heavy-Duty */}
          <div
            onClick={() => {
              setSelectedCylinder("commercial_19kg");
              sound.tick();
            }}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedCylinder === "commercial_19kg"
                ? "border-emerald-500 bg-white dark:bg-zinc-900 shadow-xl ring-2 ring-emerald-500/20"
                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-slate-300"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  High-Flow Commercial
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400">19 kg</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Aura Commercial 19kg
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                High-capacity heavy-duty valve designed for restaurants, cafes, and cloud kitchens.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">₹1,750</span>
                <span className="text-xs text-slate-400 ml-1">commercial rate</span>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-center border border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors block"
            >
              Order 19kg Commercial &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* "How It Works" 4-Stage Protocol Section */}
      <section id="how-it-works" className="py-20 border-t border-slate-200 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
              Zero Queues &bull; 100% Tested
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              The 4-Stage Fulfillment Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              How AuraGas ensures your cylinder is safe, verified, and delivered in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Instant Booking</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Choose express dispatch or set an automatic refill cadence (every 30, 45, or 60 days).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Safety Inspected</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                PESO-certified technician validates tare weight, O-ring seal, and digital RFID tag.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">GPS Radar Fleet</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Track your driver's electric trike with live speed telemetry and turn-by-turn ETA.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold font-mono">
                04
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">OTP Handover</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                Share your 4-digit code after weight inspection to seal the exchange securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white shadow-2xl text-center space-y-6">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Modernize Your Kitchen's Fuel?
            </h2>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
              Join thousands of households enjoying uninterrupted cooking, automated refills, and guaranteed government DBTL subsidies.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard"
                onClick={() => sound.success()}
                className="px-8 py-3.5 rounded-2xl font-black text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all active:scale-95"
              >
                Launch Booking Dashboard &rarr;
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-black/20 hover:bg-black/30 border border-white/20 transition-all"
              >
                Register New Connection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 text-xs text-slate-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-current" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              AuraGas
            </span>
            <span>&bull; PESO Certified Clean LPG Distribution Grid</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin Ops
            </Link>
            <Link href="/login" className="hover:underline">
              Sign In
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            &copy; 2026 AuraGas Technologies Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
