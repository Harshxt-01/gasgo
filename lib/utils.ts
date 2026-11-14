import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CylinderOption, CylinderTypeId } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateBookingRef(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `AG-${randomNum}`;
}

export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const CYLINDER_CATALOG: Record<CylinderTypeId, CylinderOption> = {
  mini_5kg: {
    id: "mini_5kg",
    title: "Aura Mini 5kg",
    weight: "5 kg",
    capacityKg: 5,
    badge: "Compact & Agile",
    basePrice: 420,
    subsidyAmount: 0,
    netPrice: 420,
    description: "Ideal for singles, students, outdoor camping, and secondary kitchen backup.",
    idealFor: "1-2 Individuals / Campers",
    safetyRating: "IS 3196:2006 (Burst Tested 34.5 bar)",
    colorScheme: "cyan",
    dimensions: "350mm x 250mm",
    inspectionCycle: "Every 5 years",
  },
  domestic_14_2kg_subsidized: {
    id: "domestic_14_2kg_subsidized",
    title: "Aura Domestic 14.2kg (Subsidized)",
    weight: "14.2 kg",
    capacityKg: 14.2,
    badge: "DBTL Govt Benefit",
    basePrice: 803,
    subsidyAmount: 300,
    netPrice: 503,
    description: "Standard household cylinder with direct DBT government subsidy credited to bank account.",
    idealFor: "Family Kitchens (3-5 members)",
    safetyRating: "IS 3196:2006 (Burst Tested 35.0 bar)",
    colorScheme: "amber",
    dimensions: "625mm x 315mm",
    inspectionCycle: "Every 5 years",
  },
  domestic_14_2kg_commercial: {
    id: "domestic_14_2kg_commercial",
    title: "Aura Domestic 14.2kg (Non-Subsidized)",
    weight: "14.2 kg",
    capacityKg: 14.2,
    badge: "Standard Commercial Domestic",
    basePrice: 803,
    subsidyAmount: 0,
    netPrice: 803,
    description: "Standard domestic LPG cylinder without subsidy capping. Instant approval.",
    idealFor: "General Residential & Domestic Suites",
    safetyRating: "IS 3196:2006 (Burst Tested 35.0 bar)",
    colorScheme: "indigo",
    dimensions: "625mm x 315mm",
    inspectionCycle: "Every 5 years",
  },
  commercial_19kg: {
    id: "commercial_19kg",
    title: "Aura Commercial 19kg Heavy-Duty",
    weight: "19 kg",
    capacityKg: 19,
    badge: "High-Volume Commercial",
    basePrice: 1750,
    subsidyAmount: 0,
    netPrice: 1750,
    description: "Engineered for high-flow restaurants, bakeries, cloud kitchens, and industrial catering.",
    idealFor: "Cafes, Cloud Kitchens & Restaurants",
    safetyRating: "IS 3196 Heavy Grade High Flow Valve",
    colorScheme: "emerald",
    dimensions: "895mm x 320mm",
    inspectionCycle: "Every 3 years",
  },
};

