"use client";

import { useState } from "react";
import { X, Gauge, Flame, Sparkles, TrendingDown, Thermometer, ShieldAlert, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface TelemetryAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function TelemetryAnalyticsModal({
  isOpen,
  onClose,
  onOpenBooking,
}: TelemetryAnalyticsModalProps) {
  const [dailyCookingHours, setDailyCookingHours] = useState(2.5);

  if (!isOpen) return null;

  // Calculation based on standard 14.2kg cylinder (~0.35 kg/hr on double burner)
  const kgPerHour = 0.35;
  const currentReserveKg = 10.2; // 72% of 14.2kg
  const daysLeft = Math.max(1, Math.round(currentReserveKg / (dailyCookingHours * kgPerHour)));

  // Mock weekly consumption data in grams
  const weeklyUsage = [
    { day: "Mon", grams: 850, pct: 65 },
    { day: "Tue", grams: 920, pct: 72 },
    { day: "Wed", grams: 780, pct: 58 },
    { day: "Thu", grams: 1100, pct: 85 },
    { day: "Fri", grams: 1250, pct: 95 },
    { day: "Sat", grams: 1400, pct: 100 },
    { day: "Sun", grams: 1300, pct: 92 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Smart Kitchen Telemetry & Consumption AI
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Connected Unit: Aura Domestic 14.2kg • Indiranagar Node #4
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Real-time Gauges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center">
              <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400">
                Current Fuel Level
              </span>
              <p className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono mt-0.5">
                72%
              </p>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">~10.2 kg Net</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">
                Internal Pressure
              </span>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
                1.82 bar
              </p>
              <span className="text-[11px] text-emerald-500 font-medium">Optimal Flow</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                Burner Purity
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                99.4%
              </p>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">Clean Blue Flame</span>
            </div>
          </div>

          {/* Interactive Days-Left Predictor */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Dynamic Days-Remaining Predictor
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Slide your average daily stove usage to calculate refill date.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg">
                ~{daysLeft} Days Left
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
                <span>Cooking Time: <strong>{dailyCookingHours} hours / day</strong></span>
                <span>Burn rate: ~{(dailyCookingHours * kgPerHour).toFixed(2)} kg/day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.5"
                value={dailyCookingHours}
                onChange={(e) => setDailyCookingHours(parseFloat(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5 hr (Light)</span>
                <span>3.0 hrs (Family Standard)</span>
                <span>6.0 hrs (Heavy / Commercial)</span>
              </div>
            </div>
          </div>

          {/* Weekly Consumption Bar Telemetry */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Last 7 Days Burner Telemetry (Grams)
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                Peak: Saturday (1.4 kg)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-end justify-between gap-2 h-36 pt-6">
              {weeklyUsage.map((w) => (
                <div key={w.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-mono text-slate-400">
                    {(w.grams / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full max-w-[28px] bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex flex-col justify-end h-20">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-lg transition-all duration-500"
                      style={{ height: `${w.pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-zinc-400">
                    {w.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt to Book */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-slate-700 dark:text-zinc-200">
                Reserve your replacement cylinder today to guarantee zero delivery waiting time.
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="shrink-0 px-4 py-2 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/25 transition-all"
            >
              Order Refill &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

