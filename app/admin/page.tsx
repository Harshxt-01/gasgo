"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  Truck,
  RotateCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  User,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { IBooking, DeliveryStage } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastProvider";

const STAGES: DeliveryStage[] = [
  "Order Placed",
  "Confirmed & Safety Inspected",
  "Dispatched / Out for Delivery",
  "Delivered",
];

export default function AdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStage, setFilterStage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Warehouse inventory counts
  const [stockMini, setStockMini] = useState(148);
  const [stockDomestic, setStockDomestic] = useState(384);
  const [stockCommercial, setStockCommercial] = useState(96);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingRef: string, newStatus: DeliveryStage) => {
    setUpdatingId(bookingRef);
    try {
      const res = await fetch(`/api/bookings/${bookingRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });
      if (res.ok) {
        const updated: IBooking = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b.bookingRef === updated.bookingRef ? updated : b))
        );
        toast({
          type: "success",
          title: `Status Updated: ${bookingRef}`,
          message: `Moved to ${newStatus}. Consumer notified via SMS/App.`,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        title: "Update Failed",
        message: "Could not reach dispatch telemetry node.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRestock = (type: "mini" | "domestic" | "commercial") => {
    if (type === "mini") setStockMini((p) => p + 50);
    if (type === "domestic") setStockDomestic((p) => p + 100);
    if (type === "commercial") setStockCommercial((p) => p + 25);
    toast({
      type: "success",
      title: "Warehouse Inventory Replenished",
      message: `Safety inspected batch checked in to Indiranagar Node #4.`,
    });
  };

  // Filtered orders
  const filteredOrders = bookings.filter((b) => {
    const matchFilter = filterStage === "all" || b.deliveryStatus === filterStage;
    const matchSearch =
      b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.addressSnapshot.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.addressSnapshot.consumerNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Calculate metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalSubsidies = bookings.reduce((sum, b) => sum + (b.subsidyDiscount || 0), 0);
  const activeDispatches = bookings.filter(
    (b) => b.deliveryStatus === "Dispatched / Out for Delivery"
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                Aura<span className="text-orange-500">Gas</span>
              </span>
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              Fleet Commander Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Consumer View &rarr;
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
              PESO Bottling Node Telemetry
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Fleet Dispatch & Inventory Control
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Indiranagar Distribution Station #4 • 14 Electric Trikes Online
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Sync Telemetry</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Active Fleet In-Transit
              </span>
              <Truck className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {activeDispatches} Units
            </p>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Average Speed: 24 mins
            </span>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Total Orders Processed
              </span>
              <Package className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {bookings.length} Refills
            </p>
            <span className="text-[10px] text-slate-400">100% Delivery Verification</span>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Total Revenue Cleared
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {formatCurrency(totalRevenue)}
            </p>
            <span className="text-[10px] text-slate-400">Instant UPI & Cards</span>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                DBTL Subsidies Claimed
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-500 font-mono">
              {formatCurrency(totalSubsidies)}
            </p>
            <span className="text-[10px] text-slate-400">Ministry DBT Settled</span>
          </div>
        </div>

        {/* Warehouse Inventory Reserve Monitor */}
        <div className="rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-500" />
                Live Bottling Stock & Inspection Reserves
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Sealed, leak-tested cylinders ready for electric fleet loading.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Aura Mini 5kg
                </span>
                <span className="text-2xl font-black text-cyan-500 font-mono">{stockMini}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Campers & Singles</span>
              </div>
              <button
                onClick={() => handleRestock("mini")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
              >
                +50 Stock
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Aura Domestic 14.2kg
                </span>
                <span className="text-2xl font-black text-orange-500 font-mono">{stockDomestic}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Subsidized & Non-Sub</span>
              </div>
              <button
                onClick={() => handleRestock("domestic")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
              >
                +100 Stock
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Aura Commercial 19kg
                </span>
                <span className="text-2xl font-black text-emerald-500 font-mono">{stockCommercial}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Heavy Duty Restaurants</span>
              </div>
              <button
                onClick={() => handleRestock("commercial")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                +25 Stock
              </button>
            </div>
          </div>
        </div>

        {/* Live Orders Master Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Consumer Dispatches & Verification Ledger
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Click any status dropdown to transition stages in real-time.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Ref, SV, Label..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300"
              >
                <option value="all">All Stages</option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 font-semibold border-y border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Ref & Time</th>
                  <th className="py-3 px-4">Consumer & SV</th>
                  <th className="py-3 px-4">Cylinder</th>
                  <th className="py-3 px-4">Driver & Vehicle</th>
                  <th className="py-3 px-4 text-center">Security OTP</th>
                  <th className="py-3 px-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">
                      No matching dispatches found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-900 dark:text-white block">
                          {item.bookingRef}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200 block">
                          {item.addressSnapshot.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.addressSnapshot.consumerNumber}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800 dark:text-zinc-200 block">
                          {item.cylinderWeight}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.bookingType.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200 block">
                          {item.driver?.name || "Unassigned"}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-500">
                          {item.driver?.vehicleNo || "Aura Trike #04"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="font-mono font-black text-sm text-orange-500 tracking-wider bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20">
                          {item.otp}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          disabled={updatingId === item.bookingRef}
                          value={item.deliveryStatus}
                          onChange={(e) =>
                            handleUpdateStatus(item.bookingRef, e.target.value as DeliveryStage)
                          }
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                        >
                          {STAGES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

