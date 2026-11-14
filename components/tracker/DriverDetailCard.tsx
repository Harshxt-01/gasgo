"use client";

import { useState } from "react";
import { IDriver } from "@/lib/types";
import { Phone, Star, ShieldCheck, Truck, Copy, Check, Clock, KeyRound } from "lucide-react";

interface DriverDetailCardProps {
  driver?: IDriver;
  otp: string;
  deliveryStatus: string;
}

export function DriverDetailCard({
  driver,
  otp,
  deliveryStatus,
}: DriverDetailCardProps) {
  const [copied, setCopied] = useState(false);
  const [calling, setCalling] = useState(false);

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCallDriver = () => {
    setCalling(true);
    setTimeout(() => {
      alert(`Simulating call to delivery partner ${driver?.name || "Agent"} at ${driver?.phone || "+91 98451 22910"}`);
      setCalling(false);
    }, 400);
  };

  const isDelivered = deliveryStatus === "Delivered";

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
      {/* Driver Identity */}
      <div className="md:col-span-7 flex items-center gap-4">
        <div className="relative">
          <img
            src={
              driver?.avatar ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
            }
            alt={driver?.name || "Delivery Partner"}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-500/30"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white dark:border-zinc-900">
            <ShieldCheck className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {driver?.name || "Fleet Officer Assigned"}
            </h4>
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-current" />
              {driver?.rating || 4.9}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
            <Truck className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-mono">{driver?.vehicleNo || "KA 03 EX 4821 (Electric Trike)"}</span>
          </div>

          <button
            onClick={handleCallDriver}
            disabled={calling || isDelivered}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 disabled:opacity-40"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{calling ? "Connecting..." : `Contact (${driver?.phone || "+91 98451 22910"})`}</span>
          </button>
        </div>
      </div>

      {/* ETA & Dynamic OTP Box */}
      <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800">
        {/* ETA */}
        {!isDelivered ? (
          <div className="text-center sm:text-right md:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Est. Arrival
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-1 text-sm font-bold text-slate-900 dark:text-white">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{driver?.etaMinutes || 18} Mins</span>
            </div>
          </div>
        ) : (
          <div className="text-center sm:text-right">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Successfully Delivered
            </span>
          </div>
        )}

        {/* 4-Digit OTP Box */}
        <div className="p-2.5 px-4 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 tracking-wider">
            <KeyRound className="w-3 h-3" /> Delivery OTP
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xl font-black text-orange-600 dark:text-orange-400 tracking-widest">
              {otp}
            </span>
            <button
              onClick={handleCopyOtp}
              title="Copy OTP to clipboard"
              className="p-1 rounded hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

