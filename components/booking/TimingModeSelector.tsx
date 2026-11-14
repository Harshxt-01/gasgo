"use client";

import { BookingType, DeliverySlot } from "@/lib/types";
import { Zap, Calendar, Repeat, CheckCircle, Clock, Info } from "lucide-react";

interface TimingModeSelectorProps {
  timingMode: BookingType;
  onChangeMode: (mode: BookingType) => void;
  scheduledDate: string;
  onChangeDate: (date: string) => void;
  deliverySlot: DeliverySlot;
  onChangeSlot: (slot: DeliverySlot) => void;
  recurrenceDays: 30 | 45 | 60;
  onChangeRecurrence: (days: 30 | 45 | 60) => void;
}

export function TimingModeSelector({
  timingMode,
  onChangeMode,
  scheduledDate,
  onChangeDate,
  deliverySlot,
  onChangeSlot,
  recurrenceDays,
  onChangeRecurrence,
}: TimingModeSelectorProps) {
  // Get tomorrow's date for scheduled minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
          2. Delivery Timing & Fulfillment Cadence
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Choose immediate priority dispatch, a planned weekend slot, or set-and-forget subscription.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Instant */}
        <button
          type="button"
          onClick={() => onChangeMode("instant")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            timingMode === "instant"
              ? "border-orange-500 bg-orange-500/10 dark:bg-orange-500/15 shadow-sm ring-1 ring-orange-500/30"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-500">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            {timingMode === "instant" && (
              <CheckCircle className="w-4 h-4 text-orange-500" />
            )}
          </div>
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            Express / Immediate
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Dispatched now. ETA 20–35 min.
          </p>
        </button>

        {/* Scheduled */}
        <button
          type="button"
          onClick={() => onChangeMode("scheduled")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            timingMode === "scheduled"
              ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-sm ring-1 ring-cyan-500/30"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-500">
              <Calendar className="w-4 h-4" />
            </div>
            {timingMode === "scheduled" && (
              <CheckCircle className="w-4 h-4 text-cyan-500" />
            )}
          </div>
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            Scheduled Delivery
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Pick date & custom delivery window.
          </p>
        </button>

        {/* Recurring */}
        <button
          type="button"
          onClick={() => onChangeMode("subscription")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            timingMode === "subscription"
              ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15 shadow-sm ring-1 ring-indigo-500/30"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-500">
              <Repeat className="w-4 h-4" />
            </div>
            {timingMode === "subscription" && (
              <CheckCircle className="w-4 h-4 text-indigo-500" />
            )}
          </div>
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            Auto-Refill Plan
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Every 30, 45, or 60 days automatically.
          </p>
        </button>
      </div>

      {/* Dynamic Sub-Panels based on mode */}
      {timingMode === "instant" && (
        <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-xs text-slate-600 dark:text-zinc-300 flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-500 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Instant Priority Fleet Activated
            </p>
            <p className="text-slate-500 dark:text-zinc-400 text-[11px] mt-0.5">
              The closest verified distributor hub will pick and safety-inspect your cylinder immediately.
            </p>
          </div>
        </div>
      )}

      {timingMode === "scheduled" && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Select Delivery Date
              </label>
              <input
                type="date"
                min={minDateStr}
                value={scheduledDate || minDateStr}
                onChange={(e) => onChangeDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChangeSlot("morning")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    deliverySlot === "morning"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                      : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  Morning (8 AM–12 PM)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSlot("evening")}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    deliverySlot === "evening"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                      : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-400"
                  }`}
                >
                  Evening (4 PM–8 PM)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {timingMode === "subscription" && (
        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Cadence Selection
              </p>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                You can pause, skip or modify delivery dates anytime with zero penalty.
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
              Never Run Out of Gas
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[30, 45, 60].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => onChangeRecurrence(days as 30 | 45 | 60)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  recurrenceDays === days
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                    : "border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                }`}
              >
                Every {days} Days
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-indigo-600 dark:text-indigo-400">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Next automatic refill will be scheduled for ~{recurrenceDays} days from today.</span>
          </div>
        </div>
      )}
    </div>
  );
}

