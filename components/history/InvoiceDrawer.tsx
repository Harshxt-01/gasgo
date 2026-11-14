"use client";

import { useState } from "react";
import { IBooking } from "@/lib/types";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  Flame,
  CheckCircle2,
  FileText,
  Building,
  QrCode,
  Check,
} from "lucide-react";

interface InvoiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  booking: IBooking | null;
}

export function InvoiceDrawer({ isOpen, onClose, booking }: InvoiceDrawerProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !booking) return null;

  const invoiceNo = `INV-${booking.bookingRef.replace("AG-", "AUR-")}-2026`;
  const baseAmount = booking.baseAmount;
  const subsidy = booking.subsidyDiscount;
  const cgst = booking.cgst || Number((baseAmount * 0.025).toFixed(2));
  const sgst = booking.sgst || Number((baseAmount * 0.025).toFixed(2));
  const total = booking.totalAmount;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      alert(`Invoice ${invoiceNo} generated as signed digital PDF.`);
      setDownloaded(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-xl h-full bg-white dark:bg-zinc-950 border-l border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Top Header Controls */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tax Invoice & Delivery Certificate
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                {invoiceNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700 dark:text-zinc-300">
          {/* Brand & Distributor Header */}
          <div className="flex justify-between items-start pb-6 border-b border-slate-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-orange-500 fill-current" />
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                  Aura<span className="text-orange-500">Gas</span> Telemetry Ltd.
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Authorized PESO Bottling & Doorstep Utility Node
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                GSTIN: 29AAACA9921B1ZM • Reg: PESO/BLR/2026/9102
              </p>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {booking.paymentStatus === "Paid" ? "TAX INVOICE - PAID" : `STATUS: ${booking.paymentStatus}`}
              </span>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 mt-1">
                Date: {formatDate(booking.createdAt)}
              </p>
            </div>
          </div>

          {/* Customer & Distributor Split Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Billed To (Consumer)
              </span>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                {booking.addressSnapshot.label} — SV {booking.addressSnapshot.consumerNumber}
              </p>
              <p className="text-slate-600 dark:text-zinc-400 text-[11px] mt-0.5">
                {booking.addressSnapshot.houseFlat}, {booking.addressSnapshot.street}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                {booking.addressSnapshot.city}, {booking.addressSnapshot.pincode}
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 mt-1">
                Phone: {booking.addressSnapshot.contactPhone}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Distributor Hub
              </span>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                Aura Indiranagar Gas Node #4
              </p>
              <p className="text-slate-600 dark:text-zinc-400 text-[11px] mt-0.5">
                Station Road, Indiranagar Depot
              </p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                Bengaluru, KA - 560038
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Leak Tested
              </p>
            </div>
          </div>

          {/* Cylinder Safety Specifications */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Safety Verification & Tare Weights
            </span>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60">
                <span className="text-[10px] text-slate-400 block">Net LPG</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {booking.cylinderWeight}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60">
                <span className="text-[10px] text-slate-400 block">Tare Weight</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  15.6 kg
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60">
                <span className="text-[10px] text-slate-400 block">Gross Weight</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  29.8 kg
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60">
                <span className="text-[10px] text-slate-400 block">Hydraulic Test</span>
                <span className="font-bold text-emerald-500 font-mono">Passed</span>
              </div>
            </div>
          </div>

          {/* Line Item Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 font-semibold border-b border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">HSN</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {booking.cylinderTitle}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Standard High-purity Propane-Butane Blend
                    </p>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">27111900</td>
                  <td className="py-2.5 px-3 text-right font-mono">1</td>
                  <td className="py-2.5 px-3 text-right font-mono">
                    {formatCurrency(baseAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-600 dark:text-zinc-400">
                    Express Doorstep Delivery & Handling
                  </td>
                  <td className="py-2 px-3 text-center font-mono">996813</td>
                  <td className="py-2 px-3 text-right font-mono">1</td>
                  <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-medium">
                    FREE
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Total */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
              <span>Taxable Value:</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">
                {formatCurrency(baseAmount)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
              <span>Central GST (CGST @ 2.5%):</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">
                ₹{cgst}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-zinc-400">
              <span>State GST (SGST @ 2.5%):</span>
              <span className="font-mono text-slate-900 dark:text-zinc-200">
                ₹{sgst}
              </span>
            </div>
            {subsidy > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Direct Benefit Transfer (DBTL Subsidy):</span>
                <span className="font-mono">- {formatCurrency(subsidy)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-baseline">
              <span className="font-black text-sm text-slate-900 dark:text-white">
                Net Paid by Consumer:
              </span>
              <span className="text-xl font-black text-orange-500 font-mono">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Digital Signature & Verification Seal */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-slate-800 dark:text-zinc-200" />
              </div>
              <div>
                <p className="font-mono font-bold text-slate-900 dark:text-white">
                  REF: {booking.bookingRef}
                </p>
                <p>Digital Cryptographic Seal Verified</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-800 dark:text-zinc-200">
                AuraGas Certified Officer
              </p>
              <p className="text-[10px]">Ministry of Petroleum & NG</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 p-4 border-t border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloaded}
            className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2"
          >
            {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? "Invoice Downloaded" : "Download PDF Invoice"}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-2xl font-bold text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

