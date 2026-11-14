"use client";

import { Flame, Clock, ShieldCheck, Zap, ArrowRight, Gauge, Calendar, BellRing } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface HeroBannerProps {
  onOpenBooking: (mode?: "instant" | "scheduled" | "subscription") => void;
  onScrollToTracker: () => void;
  hasActiveOrder: boolean;
  activeOrderRef?: string;
  onOpenTelemetry?: () => void;
}

export function HeroBanner({
  onOpenBooking,
  onScrollToTracker,
  hasActiveOrder,
  activeOrderRef,
  onOpenTelemetry,
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-white via-slate-50 to-orange-50/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-orange-950/20 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading and Quick Actions */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Smart LPG 2.0 • Ultra-Fast Subsidized Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Effortless Gas Refills,{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 bg-clip-text text-transparent">
              Zero Queues.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            Instant booking with real-time driver telemetry, direct DBTL subsidy discount, and AI-predicted refill cadence. PESO certified safety checks with every cylinder swap.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking("instant")}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-95"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Express Refill (Instant)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onOpenBooking("subscription")}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-cyan-500" />
              <span>Auto-Refill Plan</span>
            </button>

            {hasActiveOrder && (
              <button
                onClick={onScrollToTracker}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all animate-pulse"
              >
                <Clock className="w-4 h-4" />
                <span>Track Order ({activeOrderRef})</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 dark:border-zinc-800/60">
            <div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Avg. Delivery Speed</p>
              <p className="text-lg font-bold text-slate-900 dark:text-zinc-100">24 mins</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Govt. Subsidy / Refill</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹300 off</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Safety Compliance</p>
              <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">100% Tested</p>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Cylinder Telemetry Pod */}
        <div className="lg:col-span-5">
          <div
            onClick={onOpenTelemetry}
            className="relative rounded-2xl p-5 border border-slate-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 shadow-lg backdrop-blur-md space-y-4 cursor-pointer hover:border-orange-500/40 dark:hover:border-orange-500/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-105 transition-transform">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <span>Active Kitchen Telemetry</span>
                    <span className="text-[10px] text-orange-500 font-normal underline">Tap to View AI Charts</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Unit: Domestic 14.2kg • Indiranagar
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Optimal Flow
              </span>
            </div>

            {/* Simulated Fuel Gauge */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-zinc-300">LPG Reserve Level</span>
                <span className="text-orange-500 font-mono">72% (~10.2 kg)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 shadow-sm transition-all duration-1000"
                  style={{ width: "72%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                <span>Estimated run out: ~11 days</span>
                <span>Valve: Leak-Free (0.00 ppm)</span>
              </div>
            </div>

            {/* Smart Refill Suggestion Pill */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-600 dark:text-zinc-300">
                  Refill advised by <strong>Nov 20</strong> for uninterrupted cooking.
                </span>
              </div>
              <button
                onClick={() => onOpenBooking("scheduled")}
                className="shrink-0 font-semibold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Schedule &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

