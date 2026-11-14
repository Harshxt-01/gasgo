"use client";

import { useState } from "react";
import { IBooking, BookingType } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  FileText,
  RotateCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Repeat,
  Zap,
  Calendar,
  PauseCircle,
  PlayCircle,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

interface TransactionFeedProps {
  bookings: IBooking[];
  onViewInvoice: (booking: IBooking) => void;
  onReorder: (booking: IBooking) => void;
  onTrackBooking: (booking: IBooking) => void;
  onUpdateBooking?: (updated: IBooking) => void;
}

export function TransactionFeed({
  bookings,
  onViewInvoice,
  onReorder,
  onTrackBooking,
  onUpdateBooking,
}: TransactionFeedProps) {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "instant" | "scheduled_recurring">("all");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "instant") return b.bookingType === "instant";
    if (filter === "scheduled_recurring") {
      return b.bookingType === "scheduled" || b.bookingType === "subscription";
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Paid
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Calendar className="w-3 h-3" /> Scheduled
          </span>
        );
      case "Refunded":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-3 h-3" /> Refunded
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getTypeIcon = (type: BookingType) => {
    switch (type) {
      case "instant":
        return <Zap className="w-3.5 h-3.5 text-orange-500" />;
      case "subscription":
        return <Repeat className="w-3.5 h-3.5 text-indigo-500" />;
      case "scheduled":
        return <Calendar className="w-3.5 h-3.5 text-cyan-500" />;
    }
  };

  const handleToggleSubscription = async (booking: IBooking) => {
    const newStatus = !(booking.subscriptionActive ?? true);
    setTogglingId(booking.bookingRef);

    try {
      const res = await fetch(`/api/bookings/${booking.bookingRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionActive: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        if (onUpdateBooking) onUpdateBooking(updated);
        toast({
          type: "success",
          title: `Subscription ${newStatus ? "Resumed" : "Paused"}`,
          message: newStatus
            ? `Auto-refills active every ${booking.recurrenceDays || 30} days.`
            : "Next automatic delivery is safely paused with zero fees.",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleSkipNext = async (booking: IBooking) => {
    setTogglingId(booking.bookingRef);
    try {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + (booking.recurrenceDays || 30));
      const nextDateStr = nextDate.toISOString().split("T")[0];

      const res = await fetch(`/api/bookings/${booking.bookingRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduledDate: nextDateStr }),
      });
      if (res.ok) {
        const updated = await res.json();
        if (onUpdateBooking) onUpdateBooking(updated);
        toast({
          type: "info",
          title: "Refill Cycle Skipped",
          message: `Next cylinder dispatch postponed to ${nextDateStr}.`,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <section className="space-y-4">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
            Ledger & Settlement Records
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Booking History & Invoices
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Verified receipts with itemized GST splits and safety test stamps.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filter === "all"
                ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-800"
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter("instant")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filter === "instant"
                ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-800"
            }`}
          >
            Instant Express
          </button>
          <button
            onClick={() => setFilter("scheduled_recurring")}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              filter === "scheduled_recurring"
                ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-800"
            }`}
          >
            Scheduled & Subscriptions
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center text-xs text-slate-500">
            No booking records matching this filter.
          </div>
        ) : (
          filteredBookings.map((item) => {
            const isSub = item.bookingType === "subscription";
            const isSubActive = item.subscriptionActive ?? true;

            return (
              <div
                key={item._id}
                className="rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col gap-3 shadow-sm"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Left Column: Ref, Type & Specs */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      {getTypeIcon(item.bookingType)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                          {item.bookingRef}
                        </span>
                        {getStatusBadge(item.paymentStatus)}
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                          {item.bookingType}
                        </span>
                        {isSub && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isSubActive
                                ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                                : "bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"
                            }`}
                          >
                            {isSubActive ? "Auto-Refill: Active" : "Auto-Refill: Paused"}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                        {item.cylinderTitle} ({item.cylinderWeight})
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Delivered to <strong>{item.addressSnapshot.label}</strong> • {item.addressSnapshot.street},{" "}
                        {item.addressSnapshot.city} • {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Action Buttons */}
                  <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800">
                    <div className="text-left md:text-right">
                      <span className="font-mono font-black text-base text-slate-900 dark:text-white">
                        {formatCurrency(item.totalAmount)}
                      </span>
                      <p className="text-[10px] text-slate-400">
                        via {item.paymentMethod.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTrackBooking(item)}
                        className="p-2 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors flex items-center gap-1"
                        title="Track Live"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Track</span>
                      </button>

                      <button
                        onClick={() => onViewInvoice(item)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => onReorder(item)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-sm shadow-orange-500/20 flex items-center gap-1.5"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subscriptions Cadence & Pause/Skip Control Strip */}
                {isSub && (
                  <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                      <Repeat className="w-3.5 h-3.5" />
                      <span>
                        Cadence: <strong>Every {item.recurrenceDays || 30} Days</strong> • Next Refill Target:{" "}
                        <strong className="font-mono">{item.scheduledDate || "Nov 20, 2026"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSkipNext(item)}
                        disabled={togglingId === item.bookingRef}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 transition-colors flex items-center gap-1"
                      >
                        <SkipForward className="w-3 h-3 text-cyan-500" />
                        <span>Skip Next</span>
                      </button>

                      <button
                        onClick={() => handleToggleSubscription(item)}
                        disabled={togglingId === item.bookingRef}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          isSubActive
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                        }`}
                      >
                        {isSubActive ? (
                          <>
                            <PauseCircle className="w-3 h-3" />
                            <span>Pause Plan</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-3 h-3" />
                            <span>Resume Plan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
