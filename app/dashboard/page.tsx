"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { LiveTrackerCard } from "@/components/tracker/LiveTrackerCard";
import { AddressCardGrid } from "@/components/addresses/AddressCardGrid";
import { TransactionFeed } from "@/components/history/TransactionFeed";
import { BookingModal } from "@/components/booking/BookingModal";
import { AddressCrudModal } from "@/components/addresses/AddressCrudModal";
import { InvoiceDrawer } from "@/components/history/InvoiceDrawer";
import { TelemetryAnalyticsModal } from "@/components/telemetry/TelemetryAnalyticsModal";
import { SafetyAuditModal } from "@/components/safety/SafetyAuditModal";
import { IUser, IAddress, IBooking, BookingType } from "@/lib/types";
import { ShieldCheck, PhoneCall, Flame, AlertTriangle, ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/ToastProvider";
import { sound } from "@/lib/sound";

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [trackedBooking, setTrackedBooking] = useState<IBooking | null>(null);

  // Modals & Drawers state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialMode, setBookingInitialMode] = useState<BookingType>("instant");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<IBooking | null>(null);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [aRes, bRes] = await Promise.all([
        fetch("/api/addresses"),
        fetch("/api/bookings"),
      ]);

      if (aRes.ok) setAddresses(await aRes.json());
      if (bRes.ok) {
        const bList: IBooking[] = await bRes.json();
        setBookings(bList);
        const inTransit =
          bList.find((b) => b.deliveryStatus !== "Delivered") || bList[0];
        setTrackedBooking(inTransit || null);
      }
    } catch (err) {
      console.error("Error loading AuraGas platform data:", err);
    }
  };

  // Booking handlers
  const handleOpenBooking = (mode: BookingType = "instant") => {
    sound.tick();
    setBookingInitialMode(mode);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: IBooking) => {
    sound.success();
    setBookings((prev) => [newBooking, ...prev]);
    setTrackedBooking(newBooking);
    toast({
      type: "success",
      title: `Order Placed: ${newBooking.bookingRef}`,
      message: "Safety inspection triggered. Your 4-digit handover OTP is ready.",
    });
    setTimeout(() => {
      document.getElementById("tracker-section")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Address handlers
  const handleOpenAddAddress = () => {
    sound.tick();
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (addr: IAddress) => {
    sound.tick();
    setEditingAddress(addr);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddressSuccess = (saved: IAddress) => {
    sound.success();
    setAddresses((prev) => {
      const exists = prev.some((a) => a._id === saved._id);
      if (exists) {
        return prev.map((a) => {
          if (a._id === saved._id) return saved;
          if (saved.isDefault) return { ...a, isDefault: false };
          return a;
        });
      }
      return [saved, ...prev.map((a) => (saved.isDefault ? { ...a, isDefault: false } : a))];
    });
    toast({
      type: "success",
      title: "Delivery Hub Saved",
      message: `${saved.label} address (${saved.pincode}) updated successfully.`,
    });
  };

  const handleDeleteAddress = async (id: string) => {
    sound.tick();
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddresses((prev) => prev.filter((a) => a._id !== id));
        toast({
          type: "info",
          title: "Address Removed",
          message: "Delivery location removed from your account.",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    sound.tick();
    try {
      const res = await fetch(`/api/addresses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDefault: true }),
      });
      if (res.ok) {
        const updated: IAddress = await res.json();
        setAddresses((prev) =>
          prev.map((a) => ({
            ...a,
            isDefault: a._id === updated._id,
          }))
        );
        toast({
          type: "success",
          title: "Default Location Changed",
          message: `${updated.label} is now your primary delivery hub.`,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reorder & booking update
  const handleReorder = (booking: IBooking) => {
    sound.tick();
    setBookingInitialMode(booking.bookingType);
    setIsBookingOpen(true);
  };

  const handleUpdateBooking = (updated: IBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingRef === updated.bookingRef ? updated : b))
    );
    if (trackedBooking?.bookingRef === updated.bookingRef) {
      setTrackedBooking(updated);
    }
  };

  const activeInTransitCount = bookings.filter(
    (b) => b.deliveryStatus !== "Delivered"
  ).length;

  return (
    <div className="flex-1 flex flex-col bg-slate-50/70 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors">
      {/* Navbar */}
      <Navbar
        user={user}
        activeOrderCount={activeInTransitCount}
        onOpenBooking={() => handleOpenBooking("instant")}
        onSearchOrder={(ref) => {
          const match = bookings.find(
            (b) => b.bookingRef.toUpperCase() === ref.toUpperCase()
          );
          if (match) {
            setTrackedBooking(match);
            sound.tick();
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Banner with Kitchen Telemetry */}
        <HeroBanner
          onOpenBooking={handleOpenBooking}
          onScrollToTracker={() => {
            sound.tick();
            document.getElementById("tracker-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          hasActiveOrder={Boolean(trackedBooking && trackedBooking.deliveryStatus !== "Delivered")}
          activeOrderRef={trackedBooking?.bookingRef}
          onOpenTelemetry={() => {
            sound.tick();
            setIsTelemetryModalOpen(true);
          }}
        />

        {/* Real-Time Live Tracker with GPS Radar & Handover Dialog */}
        <LiveTrackerCard
          currentBooking={trackedBooking}
          onSelectBooking={(b) => setTrackedBooking(b)}
          onRefresh={fetchInitialData}
        />

        {/* Address Manager Grid */}
        <AddressCardGrid
          addresses={addresses}
          onOpenAddModal={handleOpenAddAddress}
          onEditAddress={handleEditAddress}
          onDeleteAddress={handleDeleteAddress}
          onSetDefault={handleSetDefaultAddress}
        />

        {/* Payment History & Invoices with Subscription Controls */}
        <TransactionFeed
          bookings={bookings}
          onViewInvoice={(b) => {
            sound.tick();
            setSelectedInvoiceBooking(b);
          }}
          onReorder={handleReorder}
          onTrackBooking={(b) => {
            sound.tick();
            setTrackedBooking(b);
            document.getElementById("tracker-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          onUpdateBooking={handleUpdateBooking}
        />

        {/* Emergency LPG Safety Notice Card */}
        <div className="rounded-3xl p-5 border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                24/7 National LPG Emergency Leak Helpline
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                In case of gas odor, turn off regulator valve, open all windows, avoid electrical switches, and dial 1906 immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.tick();
                setIsSafetyModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-orange-500" />
              <span>Safety Self-Audit Drill</span>
            </button>
            <a
              href="tel:1906"
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 1906</span>
            </a>
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        addresses={addresses}
        onOpenAddAddress={() => {
          setIsBookingOpen(false);
          handleOpenAddAddress();
        }}
        onBookingSuccess={handleBookingSuccess}
        initialMode={bookingInitialMode}
      />

      <AddressCrudModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addressToEdit={editingAddress}
        onSaveSuccess={handleSaveAddressSuccess}
      />

      <InvoiceDrawer
        isOpen={Boolean(selectedInvoiceBooking)}
        onClose={() => setSelectedInvoiceBooking(null)}
        booking={selectedInvoiceBooking}
      />

      <TelemetryAnalyticsModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        onOpenBooking={() => handleOpenBooking("instant")}
      />

      <SafetyAuditModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      {/* Modern Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 text-xs text-slate-500 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              AuraGas
            </span>
            <span>— PESO Compliant Smart LPG Grid</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>DBTL Direct Subsidy Integrated</span>
            <span>•</span>
            <span>RFID Bottle Authentication</span>
            <span>•</span>
            <span>256-Bit Encrypted Payments</span>
          </div>

          <p className="text-[11px] text-slate-400">
            © 2026 AuraGas Technologies Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

