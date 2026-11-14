"use client";

import { useState } from "react";
import { IBooking, DeliveryStage } from "@/lib/types";
import { DriverDetailCard } from "./DriverDetailCard";
import { BookingSearchInput } from "./BookingSearchInput";
import { formatDate, formatTime } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  Truck,
  ShieldCheck,
  PackageCheck,
  MapPin,
  Flame,
  ArrowRight,
  RefreshCw,
  Search,
  Navigation,
  Compass,
  BatteryCharging,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

interface LiveTrackerCardProps {
  currentBooking: IBooking | null;
  onSelectBooking: (booking: IBooking) => void;
  onRefresh: () => void;
}

const STAGES: { stage: DeliveryStage; title: string; subtitle: string; icon: any }[] = [
  {
    stage: "Order Placed",
    title: "Order Placed",
    subtitle: "Booking received & SV verified",
    icon: Clock,
  },
  {
    stage: "Confirmed & Safety Inspected",
    title: "Safety Inspected",
    subtitle: "Tare weight & O-ring checked",
    icon: ShieldCheck,
  },
  {
    stage: "Dispatched / Out for Delivery",
    title: "Out for Delivery",
    subtitle: "Electric fleet in transit",
    icon: Truck,
  },
  {
    stage: "Delivered",
    title: "Delivered & Signed",
    subtitle: "OTP authenticated handover",
    icon: PackageCheck,
  },
];

export function LiveTrackerCard({
  currentBooking,
  onSelectBooking,
  onRefresh,
}: LiveTrackerCardProps) {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  const handleSearchRef = async (ref: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/bookings/${ref}`);
      if (!res.ok) {
        toast({
          type: "error",
          title: "Booking Not Found",
          message: `Reference ${ref} was not found in the network.`,
        });
        return;
      }
      const data: IBooking = await res.json();
      onSelectBooking(data);
      toast({
        type: "success",
        title: "Telemetry Linked",
        message: `Tracking live order ${data.bookingRef}.`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const currentStageIndex = currentBooking
    ? STAGES.findIndex((s) => s.stage === currentBooking.deliveryStatus)
    : 2;

  // Advance stage simulation for demo testing
  const handleAdvanceStage = async () => {
    if (!currentBooking) return;
    const nextIdx = (currentStageIndex + 1) % STAGES.length;
    const nextStage = STAGES[nextIdx].stage;

    setIsAdvancing(true);
    try {
      const res = await fetch(`/api/bookings/${currentBooking.bookingRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: nextStage }),
      });
      if (res.ok) {
        const updated: IBooking = await res.json();
        onSelectBooking(updated);
        toast({
          type: "info",
          title: "Stage Progressed (Demo)",
          message: `Dispatched stage updated to: ${nextStage}.`,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdvancing(false);
    }
  };

  const handleVerifyOtpHandover = async () => {
    if (!currentBooking) return;
    if (enteredOtp.trim() !== currentBooking.otp) {
      setOtpError(true);
      return;
    }

    setOtpError(false);
    try {
      const res = await fetch(`/api/bookings/${currentBooking.bookingRef}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: "Delivered", paymentStatus: "Paid" }),
      });
      if (res.ok) {
        const updated = await res.json();
        onSelectBooking(updated);
        setShowOtpDialog(false);
        setEnteredOtp("");
        toast({
          type: "success",
          title: "Handover Authenticated!",
          message: "Cylinder safety seal & weight verified. Delivery marked as Delivered.",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentBooking) {
    return (
      <div className="rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Real-Time Cylinder Tracker
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto mt-1">
            Track active dispatches with GPS telemetry, inspector certification, and verification OTP.
          </p>
        </div>
        <div className="flex justify-center">
          <BookingSearchInput onSearch={handleSearchRef} isLoading={isSearching} />
        </div>
      </div>
    );
  }

  const isDelivered = currentBooking.deliveryStatus === "Delivered";

  return (
    <section id="tracker-section" className="space-y-4">
      {/* Tracker Card Container */}
      <div className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg space-y-6">
        {/* Header with Search and Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
                Live Fulfillment Telemetry
              </span>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              {currentBooking.bookingRef}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                {currentBooking.cylinderTitle}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Booked on {formatDate(currentBooking.createdAt)} at {formatTime(currentBooking.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <BookingSearchInput onSearch={handleSearchRef} isLoading={isSearching} />
            <button
              onClick={handleAdvanceStage}
              disabled={isAdvancing}
              title="Demo feature: Cycle delivery stage"
              className="shrink-0 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAdvancing ? "animate-spin" : ""}`} />
              <span className="hidden md:inline">Simulate Stage</span>
            </button>
          </div>
        </div>

        {/* Visual Stage Progression Timeline */}
        <div className="py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {STAGES.map((s, index) => {
              const isPassed = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              const Icon = s.icon;

              return (
                <div key={s.stage} className="relative z-10 flex flex-col items-start space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/35 ring-4 ring-orange-500/15"
                          : isPassed
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600"
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCurrent
                          ? "text-orange-500"
                          : isPassed
                          ? "text-emerald-500"
                          : "text-slate-400 dark:text-zinc-600"
                      }`}
                    >
                      Stage 0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent
                          ? "text-orange-500 font-extrabold"
                          : isPassed
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-400 dark:text-zinc-600"
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-tight mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Connecting Line */}
          <div className="hidden md:block w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 transition-all duration-500"
              style={{
                width: `${((currentStageIndex + 1) / STAGES.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* GPS Live Radar Route Canvas */}
        {!isDelivered && (
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-950 p-4 text-white">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center animate-pulse">
                  <Navigation className="w-5 h-5 rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      Electric Fleet Trike KA 03 EX 4821
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live Telemetry
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Navigating Indiranagar 100ft Road &bull; 1.2 km away from doorstep
                  </p>
                </div>
              </div>

              {/* Speed & Battery Telemetry */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Compass className="w-4 h-4" />
                  <span>24 km/h Speed</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <BatteryCharging className="w-4 h-4" />
                  <span>88% Battery</span>
                </div>
                <button
                  onClick={() => setShowOtpDialog(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/30 transition-all flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Authenticate OTP Handover</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Driver Card & Destination Snapshot */}
        <div className="space-y-3 pt-2">
          <DriverDetailCard
            driver={currentBooking.driver}
            otp={currentBooking.otp}
            deliveryStatus={currentBooking.deliveryStatus}
          />

          {/* Destination Details Strip */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                Delivering to <strong>{currentBooking.addressSnapshot.label}</strong>:{" "}
                {currentBooking.addressSnapshot.houseFlat},{" "}
                {currentBooking.addressSnapshot.street},{" "}
                {currentBooking.addressSnapshot.city} - {currentBooking.addressSnapshot.pincode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
              <span>Consumer SV: {currentBooking.addressSnapshot.consumerNumber}</span>
              <span>•</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Payment: {currentBooking.paymentStatus} ({currentBooking.paymentMethod.toUpperCase()})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Handover Simulation Dialog */}
      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 mx-auto flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Delivery Verification Handover
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Enter the 4-digit code provided on this card ({currentBooking.otp}) to simulate delivery completion.
              </p>
            </div>

            <input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => {
                setEnteredOtp(e.target.value);
                setOtpError(false);
              }}
              placeholder="••••"
              className="w-36 mx-auto text-center font-mono font-black text-2xl tracking-widest py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {otpError && (
              <p className="text-xs text-rose-500 font-semibold">
                Invalid OTP! Enter the code shown on the card: {currentBooking.otp}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowOtpDialog(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtpHandover}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/25"
              >
                Confirm Handover
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
