"use client";

import { useState } from "react";
import { IAddress } from "@/lib/types";
import {
  MapPin,
  Home,
  Briefcase,
  Building,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Phone,
} from "lucide-react";

interface AddressCardGridProps {
  addresses: IAddress[];
  onOpenAddModal: () => void;
  onEditAddress: (address: IAddress) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function AddressCardGrid({
  addresses,
  onOpenAddModal,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
}: AddressCardGridProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getIcon = (label: string) => {
    switch (label) {
      case "Home":
        return Home;
      case "Work":
        return Briefcase;
      default:
        return Building;
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this delivery location?")) {
      setDeletingId(id);
      try {
        await onDeleteAddress(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
              Consumer Locations & SV Log
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Saved Delivery Hubs ({addresses.length})
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Registered premises eligible for subsidized doorstep delivery.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-slate-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Location</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((addr) => {
          const Icon = getIcon(addr.label);

          return (
            <div
              key={addr._id}
              className={`relative rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                addr.isDefault
                  ? "border-orange-500/80 bg-white dark:bg-zinc-900/90 shadow-md ring-1 ring-orange-500/20"
                  : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 hover:border-slate-300 dark:hover:border-zinc-700"
              }`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {addr.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {addr.isDefault ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-current" /> Primary
                      </span>
                    ) : (
                      <button
                        onClick={() => onSetDefault(addr._id)}
                        className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 underline"
                      >
                        Set Default
                      </button>
                    )}
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-slate-800 dark:text-zinc-200">
                    {addr.houseFlat}
                  </p>
                  <p className="text-slate-600 dark:text-zinc-400">
                    {addr.street}
                    {addr.landmark ? `, Near ${addr.landmark}` : ""}
                  </p>
                  <p className="text-slate-500 dark:text-zinc-400">
                    {addr.city}, {addr.state} —{" "}
                    <span className="font-mono font-medium text-slate-800 dark:text-zinc-200">
                      {addr.pincode}
                    </span>
                  </p>
                </div>

                {/* SV & Phone metadata */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 space-y-1 text-[11px] text-slate-500 dark:text-zinc-400">
                  <div className="flex justify-between">
                    <span>Consumer SV:</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-zinc-300">
                      {addr.consumerNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-cyan-500" /> Phone:
                    </span>
                    <span className="font-mono text-slate-700 dark:text-zinc-300">
                      {addr.contactPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEditAddress(addr)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                  title="Edit Address"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={deletingId === addr._id}
                  onClick={(e) => handleDelete(addr._id, e)}
                  className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-40"
                  title="Delete Address"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

