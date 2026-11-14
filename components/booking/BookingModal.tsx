"use client";

import { useState } from "react";
import { X, ChevronRight, ChevronLeft, MapPin, Plus, Flame, CheckCircle2 } from "lucide-react";
import { CylinderSelector } from "./CylinderSelector";
import { TimingModeSelector } from "./TimingModeSelector";
import { PaymentCheckout } from "./PaymentCheckout";
import { CylinderTypeId, BookingType, DeliverySlot, PaymentMethod, IAddress, IBooking } from "@/lib/types";
import { CYLINDER_CATALOG } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: IAddress[];
  onOpenAddAddress: () => void;
  onBookingSuccess: (newBooking: IBooking) => void;
  initialMode?: BookingType;
}

export function BookingModal({
  isOpen,
  onClose,
  addresses,
  onOpenAddAddress,
  onBookingSuccess,
  initialMode = "instant",
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cylinderType, setCylinderType] = useState<CylinderTypeId>("domestic_14_2kg_subsidized");
  const [timingMode, setTimingMode] = useState<BookingType>(initialMode);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>("morning");
  const [recurrenceDays, setRecurrenceDays] = useState<30 | 45 | 60>(30);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  
  // Selected address
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddr?._id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<IBooking | null>(null);

  if (!isOpen) return null;

  const currentAddress = addresses.find((a) => a._id === selectedAddressId) || defaultAddr;

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePrev = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleConfirmOrder = async () => {
    if (!currentAddress) return;
    setIsSubmitting(true);

    try {
      const payload = {
        userId: currentAddress.userId || "usr_auragas_001",
        addressId: currentAddress._id,
        addressSnapshot: {
          label: currentAddress.label,
          consumerNumber: currentAddress.consumerNumber,
          houseFlat: currentAddress.houseFlat,
          street: currentAddress.street,
          landmark: currentAddress.landmark,
          city: currentAddress.city,
          state: currentAddress.state,
          pincode: currentAddress.pincode,
          contactPhone: currentAddress.contactPhone,
        },
        cylinderType,
        bookingType: timingMode,
        scheduledDate: timingMode === "scheduled" ? scheduledDate : undefined,
        deliverySlot: timingMode === "scheduled" ? deliverySlot : undefined,
        recurrenceDays: timingMode === "subscription" ? recurrenceDays : undefined,
        paymentMethod,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create booking");

      const created: IBooking = await res.json();
      setBookingSuccessData(created);
      onBookingSuccess(created);
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setBookingSuccessData(null);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Book Cylinder Refill
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                AuraGas Smart Booking Protocol
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {!bookingSuccessData && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span
                className={step >= 1 ? "text-orange-500 font-bold" : "text-slate-400"}
              >
                1. Cylinder Type
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700" />
              <span
                className={step >= 2 ? "text-orange-500 font-bold" : "text-slate-400"}
              >
                2. Delivery Cadence
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700" />
              <span
                className={step === 3 ? "text-orange-500 font-bold" : "text-slate-400"}
              >
                3. Address & Payment
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {bookingSuccessData ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Booking Confirmed
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
                  Reference: {bookingSuccessData.bookingRef}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto mt-1">
                  Your safety inspection order is now live. Hand over the empty cylinder to the delivery agent upon receiving the sealed unit.
                </p>
              </div>

              {/* Dynamic OTP Callout */}
              <div className="p-5 max-w-sm mx-auto rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Delivery Verification OTP
                </p>
                <div className="text-3xl font-mono font-black text-orange-500 tracking-widest py-1">
                  {bookingSuccessData.otp}
                </div>
                <p className="text-[11px] text-slate-400">
                  Share this OTP with the driver after inspecting the cylinder seal & weight.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md shadow-orange-500/25"
                >
                  View in Real-Time Tracker
                </button>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <CylinderSelector
                  selectedId={cylinderType}
                  onSelect={(id) => setCylinderType(id)}
                />
              )}

              {step === 2 && (
                <TimingModeSelector
                  timingMode={timingMode}
                  onChangeMode={(m) => setTimingMode(m)}
                  scheduledDate={scheduledDate}
                  onChangeDate={(d) => setScheduledDate(d)}
                  deliverySlot={deliverySlot}
                  onChangeSlot={(s) => setDeliverySlot(s)}
                  recurrenceDays={recurrenceDays}
                  onChangeRecurrence={(r) => setRecurrenceDays(r)}
                />
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {/* Address Selection Card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-zinc-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        Select Delivery Address
                      </span>
                      <button
                        type="button"
                        onClick={onOpenAddAddress}
                        className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add New Address
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {addresses.map((addr) => {
                        const isChosen =
                          selectedAddressId === addr._id ||
                          (!selectedAddressId && addr.isDefault);

                        return (
                          <div
                            key={addr._id}
                            onClick={() => setSelectedAddressId(addr._id)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                              isChosen
                                ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500/30"
                                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                                {addr.label}
                              </span>
                              {addr.isDefault && (
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-1">
                              {addr.houseFlat}, {addr.street}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {addr.city} - {addr.pincode}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Checkout Panel */}
                  <PaymentCheckout
                    cylinder={CYLINDER_CATALOG[cylinderType]}
                    paymentMethod={paymentMethod}
                    onChangePaymentMethod={(m) => setPaymentMethod(m)}
                    isSubmitting={isSubmitting}
                    onConfirmOrder={handleConfirmOrder}
                    hasAddressSelected={Boolean(currentAddress)}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation */}
        {!bookingSuccessData && (
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/30 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-zinc-100 shadow-sm transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

