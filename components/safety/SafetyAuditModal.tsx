"use client";

import { useState } from "react";
import { X, ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, Wind, ZapOff, Flame, Info } from "lucide-react";

interface SafetyAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafetyAuditModal({ isOpen, onClose }: SafetyAuditModalProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    oring: true,
    soapy: false,
    regulator: true,
    hose: false,
  });

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allPassed = Object.values(checkedItems).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                LPG Safety Protocol & Emergency Leak Response
              </h3>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                National PESO Safety Guidelines (IS 6044 Standard)
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
          {/* Emergency 4-Step Action Drill */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Immediate Emergency Steps If Gas Odor Is Detected:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs">
                <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 shrink-0">
                  <Flame className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">1. Close Regulator</strong>
                  <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Turn off knob to 12 o'clock position.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Wind className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">2. Ventilate Space</strong>
                  <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Open all doors and windows wide.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs">
                <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 shrink-0">
                  <ZapOff className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">3. No Electricals</strong>
                  <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Do NOT switch on/off any electrical appliances.</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">4. Dial 1906</strong>
                  <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Free 24/7 dedicated LPG rapid unit.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Doorstep Safety Audit Checklist
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                allPassed ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600"
              }`}>
                {allPassed ? "Audit Passed (4/4)" : "Action Required"}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                {
                  id: "oring",
                  title: "Inspect Valve Rubber O-Ring",
                  desc: "Ensure the black neoprene ring inside cylinder mouth has no cracks or cuts.",
                },
                {
                  id: "soapy",
                  title: "Soapy Water Bubble Test",
                  desc: "Apply mild liquid soap solution around regulator joint. Zero bubble expansion confirms leak-free seal.",
                },
                {
                  id: "regulator",
                  title: "Regulator Click Lock Engagement",
                  desc: "Push down firmly until audible mechanical snap click is heard.",
                },
                {
                  id: "hose",
                  title: "Orange Suraksha Reinforced Hose Expiry",
                  desc: "Check steel wire-braided hose printing. Must be within 5-year replacement interval (valid till 2028).",
                },
              ].map((item) => {
                const isChecked = checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? "border-emerald-500/30 bg-emerald-500/5 text-slate-800 dark:text-zinc-200"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                        isChecked
                          ? "bg-emerald-500 text-white"
                          : "border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="tel:1906"
              className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 1906 Emergency Hotline</span>
            </a>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-2xl font-bold text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

