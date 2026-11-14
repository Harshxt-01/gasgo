"use client";

import { PaymentMethod, CylinderOption } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { QrCode, CreditCard, Building2, Banknote, ShieldCheck, Check, Sparkles } from "lucide-react";

interface PaymentCheckoutProps {
  cylinder: CylinderOption;
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (method: PaymentMethod) => void;
  isSubmitting: boolean;
  onConfirmOrder: () => void;
  hasAddressSelected: boolean;
}

export function PaymentCheckout({
  cylinder,
  paymentMethod,
  onChangePaymentMethod,
  isSubmitting,
  onConfirmOrder,
  hasAddressSelected,
}: PaymentCheckoutProps) {
  const basePrice = cylinder.basePrice;
  const subsidy = cylinder.subsidyAmount;
  const deliveryFee = 0;
  const cgst = Number((basePrice * 0.025).toFixed(2));
  const sgst = Number((basePrice * 0.025).toFixed(2));
  const netTotal = Math.max(0, basePrice - subsidy + deliveryFee);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
          3. Payment Method & Cost Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          Encrypted with 256-bit bank-grade tokenization. Zero gateway surcharges.
        </p>
      </div>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          type="button"
          onClick={() => onChangePaymentMethod("upi")}
          className={`p-3 rounded-2xl border text-center transition-all ${
            paymentMethod === "upi"
              ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-2 ring-orange-500/20"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          }`}
        >
          <QrCode className="w-5 h-5 mx-auto mb-1 text-orange-500" />
          <span className="text-xs font-bold block">Instant UPI QR</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400">GPay, PhonePe</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePaymentMethod("card")}
          className={`p-3 rounded-2xl border text-center transition-all ${
            paymentMethod === "card"
              ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/20"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          }`}
        >
          <CreditCard className="w-5 h-5 mx-auto mb-1 text-cyan-500" />
          <span className="text-xs font-bold block">Card / RuPay</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400">Credit & Debit</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePaymentMethod("netbanking")}
          className={`p-3 rounded-2xl border text-center transition-all ${
            paymentMethod === "netbanking"
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          }`}
        >
          <Building2 className="w-5 h-5 mx-auto mb-1 text-indigo-500" />
          <span className="text-xs font-bold block">Net Banking</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400">All Major Banks</span>
        </button>

        <button
          type="button"
          onClick={() => onChangePaymentMethod("cod")}
          className={`p-3 rounded-2xl border text-center transition-all ${
            paymentMethod === "cod"
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20"
              : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          }`}
        >
          <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
          <span className="text-xs font-bold block">Pay on Delivery</span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400">Cash or Doorstep QR</span>
        </button>
      </div>

      {/* Simulated Payment UI based on selection */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
        {paymentMethod === "upi" && (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-sm shrink-0">
              {/* Simulated QR Pattern */}
              <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-zinc-100 dark:to-zinc-300 p-2 rounded-lg flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                  <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                </div>
                <div className="text-center font-mono font-bold text-[8px] text-white dark:text-black">
                  AuraGas UPI
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                  <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Scan via any UPI App or Auto-Simulate
              </span>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                UPI ID: <span className="font-mono text-orange-500">auragas.express@icici</span>
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Instant payment confirmation with automated dispatch trigger.
              </p>
            </div>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                Card Information (Simulation)
              </span>
              <span className="text-[10px] text-slate-400">RuPay / Visa / MC</span>
            </div>
            <input
              type="text"
              readOnly
              value="4532 •••• •••• 9841"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 font-mono text-slate-700 dark:text-zinc-300"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                readOnly
                value="08 / 28"
                className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 font-mono text-slate-700 dark:text-zinc-300"
              />
              <input
                type="password"
                readOnly
                value="•••"
                className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 font-mono text-slate-700 dark:text-zinc-300"
              />
            </div>
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="text-xs space-y-2">
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              Selected Gateway: State Bank of India / HDFC
            </span>
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 flex items-center justify-between">
              <span>HDFC Direct NetBanking Portal</span>
              <span className="text-[10px] text-emerald-500 font-semibold">Active & Fast</span>
            </div>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="text-xs text-slate-600 dark:text-zinc-300 space-y-1">
            <p className="font-semibold text-slate-900 dark:text-white">
              Doorstep Settlement (Cash / QR)
            </p>
            <p className="text-slate-500 dark:text-zinc-400">
              Pay the delivery partner upon cylinder inspection and weight verification using cash or your delivery partner's handheld POS machine.
            </p>
          </div>
        )}
      </div>

      {/* Bill Summary */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2">
        <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
          <span>{cylinder.title} Base Price</span>
          <span className="font-mono text-slate-900 dark:text-zinc-200">
            {formatCurrency(basePrice)}
          </span>
        </div>

        <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
          <span>GST Split (CGST 2.5% + SGST 2.5%)</span>
          <span className="font-mono text-slate-900 dark:text-zinc-200">
            ₹{cgst} + ₹{sgst} (Included)
          </span>
        </div>

        <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
          <span>Priority Express Delivery</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            FREE (Special Promo)
          </span>
        </div>

        {subsidy > 0 && (
          <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Govt. Direct DBT Subsidy Benefit</span>
            <span className="font-mono">- {formatCurrency(subsidy)}</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-baseline">
          <div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              Total Amount Payable
            </span>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Tax invoice & safety slip delivered electronically.
            </p>
          </div>
          <span className="text-xl font-black text-orange-500">
            {formatCurrency(netTotal)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        disabled={isSubmitting || !hasAddressSelected}
        onClick={onConfirmOrder}
        className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 active:scale-98"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating Booking & Safety Token...
          </span>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Confirm & Reserve Cylinder ({formatCurrency(netTotal)})</span>
          </>
        )}
      </button>

      {!hasAddressSelected && (
        <p className="text-center text-xs text-rose-500 font-medium">
          Please select or add a delivery address above to proceed.
        </p>
      )}
    </div>
  );
}

