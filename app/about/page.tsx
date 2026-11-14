"use client";

import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  Zap,
  Gauge,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  Activity,
  Layers,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight">
                Aura<span className="text-orange-500">Gas</span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                Smart LPG Infrastructure
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Admin Ops
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Re-architecting LPG for the 21st Century</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Clean Energy Delivery at the Speed of Software.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            AuraGas replaces bureaucratic utility booking with automated IoT bottle telemetry, instantaneous government DBTL subsidy processing, and rapid electric delivery fleets.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all"
            >
              <span>Book Cylinder Refill</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
            >
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>Explore Fleet Admin</span>
            </Link>
          </div>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant 24-Min Fulfillment
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Our hyper-local distribution nodes dispatch verified electric trikes equipped with RFID scales the moment you tap Book, bypassing 48-hour waitlists.
            </p>
          </div>

          <div className="rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              PESO Regulatory Compliance
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every cylinder undergoes 5-point safety testing: hydraulic pressure test (35 bar), tare weight audit, valve O-ring leak check, and digital OTP signature.
            </p>
          </div>

          <div className="rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Zero-Friction DBTL Subsidy
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Automated API clearing with the Ministry of Petroleum ensures ₹300 direct DBT benefits are discounted immediately at checkout with zero paperwork.
            </p>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Technical Specifications & Standards
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Manufactured under Indian Standard IS 3196:2006 guidelines.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Approved for All Indian Territories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Standard Propane/Butane</span>
              <p className="text-base font-black text-slate-900 dark:text-white mt-1">50:50 Blend</p>
              <p className="text-[11px] text-slate-500 mt-0.5">High thermal calorific value</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Test Burst Pressure</span>
              <p className="text-base font-black text-cyan-500 mt-1">34.5 Bar</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Hydraulically validated</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Delivery Authentication</span>
              <p className="text-base font-black text-orange-500 mt-1">4-Digit OTP</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Zero proxy or missing swaps</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Refill Options</span>
              <p className="text-base font-black text-emerald-500 mt-1">5kg, 14.2kg, 19kg</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Domestic & Commercial</p>
            </div>
          </div>
        </div>

        {/* National Emergency Card */}
        <div className="rounded-3xl p-6 border border-amber-500/30 bg-amber-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              National LPG Emergency Leak Line
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Toll-free 24/7 rapid response unit operated across all Indian states: <strong>Dial 1906</strong>.
            </p>
          </div>
          <a
            href="tel:1906"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-amber-600 hover:bg-amber-700 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1906</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 text-xs text-slate-500 text-center">
        <p>© 2026 AuraGas Technologies Inc. PESO Approved • Ministry of Petroleum & Natural Gas</p>
      </footer>
    </div>
  );
}

