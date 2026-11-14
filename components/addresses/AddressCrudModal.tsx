"use client";

import { useState, useEffect } from "react";
import { IAddress } from "@/lib/types";
import { X, MapPin, Building, Home, Briefcase, Check } from "lucide-react";

interface AddressCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressToEdit: IAddress | null;
  onSaveSuccess: (address: IAddress) => void;
}

export function AddressCrudModal({
  isOpen,
  onClose,
  addressToEdit,
  onSaveSuccess,
}: AddressCrudModalProps) {
  const [label, setLabel] = useState<"Home" | "Work" | "Other">("Home");
  const [consumerNumber, setConsumerNumber] = useState("SV-8492018");
  const [houseFlat, setHouseFlat] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("560038");
  const [contactPhone, setContactPhone] = useState("+91 98765 43210");
  const [isDefault, setIsDefault] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (addressToEdit) {
      setLabel(addressToEdit.label);
      setConsumerNumber(addressToEdit.consumerNumber || "SV-8492018");
      setHouseFlat(addressToEdit.houseFlat);
      setStreet(addressToEdit.street);
      setLandmark(addressToEdit.landmark || "");
      setCity(addressToEdit.city);
      setState(addressToEdit.state);
      setPincode(addressToEdit.pincode);
      setContactPhone(addressToEdit.contactPhone);
      setIsDefault(addressToEdit.isDefault);
    } else {
      setLabel("Home");
      setConsumerNumber("SV-8492018");
      setHouseFlat("");
      setStreet("");
      setLandmark("");
      setCity("Bengaluru");
      setState("Karnataka");
      setPincode("560038");
      setContactPhone("+91 98765 43210");
      setIsDefault(false);
    }
  }, [addressToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseFlat.trim() || !street.trim() || !pincode.trim()) {
      alert("Please fill in all required address fields.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        label,
        consumerNumber,
        houseFlat,
        street,
        landmark,
        city,
        state,
        pincode,
        contactPhone,
        isDefault,
      };

      let res;
      if (addressToEdit) {
        res = await fetch(`/api/addresses/${addressToEdit._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save address");
      const saved: IAddress = await res.json();
      onSaveSuccess(saved);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save address. Please check your network connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {addressToEdit ? "Edit LPG Delivery Location" : "Add New Delivery Location"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Safe delivery requires valid SV consumer credentials.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Label selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              Location Type Tag
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Home", icon: Home },
                { id: "Work", icon: Briefcase },
                { id: "Other", icon: Building },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = label === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLabel(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                        : "border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consumer SV Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
              Consumer / SV Voucher Number *
            </label>
            <input
              type="text"
              required
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              placeholder="e.g. SV-8492018"
              className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* House / Flat & Street */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                House / Flat / Suite No. *
              </label>
              <input
                type="text"
                required
                value={houseFlat}
                onChange={(e) => setHouseFlat(e.target.value)}
                placeholder="e.g. Flat 402, Radiant Heights"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Street / Area *
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. 14th Main, Indiranagar"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Landmark & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Near Defense Colony Park"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* State, PIN code, Contact Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="560038"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Default Toggle Switch */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Set as Primary / Default Address
              </p>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Auto-selected for express 1-click refills and subscriptions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsDefault(!isDefault)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                isDefault ? "bg-orange-500" : "bg-slate-300 dark:bg-zinc-700"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  isDefault ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 px-4 rounded-2xl font-bold text-xs text-white bg-slate-900 dark:bg-white dark:text-zinc-950 hover:bg-slate-800 dark:hover:bg-zinc-100 disabled:opacity-50 transition-all shadow-md"
            >
              {isSaving ? "Saving Address..." : addressToEdit ? "Update Location" : "Save Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

