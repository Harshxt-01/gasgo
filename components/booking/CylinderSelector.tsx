"use client";

import { CylinderOption, CylinderTypeId } from "@/lib/types";
import { CYLINDER_CATALOG, formatCurrency } from "@/lib/utils";
import { Check, ShieldCheck, Flame, Scale, Sparkles } from "lucide-react";

interface CylinderSelectorProps {
  selectedId: CylinderTypeId;
  onSelect: (id: CylinderTypeId) => void;
}

export function CylinderSelector({ selectedId, onSelect }: CylinderSelectorProps) {
  const options = Object.values(CYLINDER_CATALOG);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
          1. Select Cylinder Specification
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          All cylinders are BIS certified with smart RFID tags and dual security O-rings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id;

          const colorTheme = {
            amber: {
              activeBorder: "border-orange-500 dark:border-orange-500 ring-2 ring-orange-500/20",
              badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
              iconBg: "bg-orange-500/15 text-orange-500",
            },
            cyan: {
              activeBorder: "border-cyan-500 dark:border-cyan-500 ring-2 ring-cyan-500/20",
              badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
              iconBg: "bg-cyan-500/15 text-cyan-500",
            },
            indigo: {
              activeBorder: "border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20",
              badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
              iconBg: "bg-indigo-500/15 text-indigo-500",
            },
            emerald: {
              activeBorder: "border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20",
              badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
              iconBg: "bg-emerald-500/15 text-emerald-500",
            },
          }[option.colorScheme];

          return (
            <div
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border text-left bg-white dark:bg-zinc-900/90 hover:shadow-lg ${
                isSelected
                  ? `${colorTheme.activeBorder} shadow-md bg-gradient-to-b from-orange-500/[0.03] to-transparent dark:from-orange-500/[0.05]`
                  : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
              }`}
            >
              {/* Active Selection Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colorTheme.badgeBg}`}>
                  {option.badge}
                </span>
                {option.subsidyAmount > 0 && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Save ₹{option.subsidyAmount} (DBTL)
                  </span>
                )}
              </div>

              {/* Title & Weight */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {option.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {option.idealFor}
                  </p>
                </div>
              </div>

              {/* Pricing Callout */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {formatCurrency(option.netPrice)}
                    </span>
                    {option.subsidyAmount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatCurrency(option.basePrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                    Inclusive of 5% GST (CGST+SGST)
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                    <Scale className="w-3.5 h-3.5 text-orange-500" />
                    {option.weight}
                  </span>
                </div>
              </div>

              {/* Safety Badge note */}
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="truncate">{option.safetyRating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

