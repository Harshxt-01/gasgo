import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookingDocument extends Document {
  bookingRef: string;
  userId: string;
  addressId: string;
  addressSnapshot: {
    label: string;
    consumerNumber: string;
    houseFlat: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    contactPhone: string;
  };
  cylinderType: string;
  cylinderTitle: string;
  cylinderWeight: string;
  bookingType: "instant" | "scheduled" | "subscription";
  scheduledDate?: string;
  deliverySlot?: "morning" | "evening";
  recurrenceDays?: number;
  subscriptionActive?: boolean;
  paymentMethod: "upi" | "card" | "netbanking" | "cod";
  paymentStatus: "Paid" | "Pending" | "Scheduled" | "Refunded";
  deliveryStatus:
    | "Order Placed"
    | "Confirmed & Safety Inspected"
    | "Dispatched / Out for Delivery"
    | "Delivered";
  otp: string;
  baseAmount: number;
  deliveryFee: number;
  cgst: number;
  sgst: number;
  subsidyDiscount: number;
  totalAmount: number;
  driver?: {
    name: string;
    phone: string;
    vehicleNo: string;
    etaMinutes: number;
    avatar: string;
    rating: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    bookingRef: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    addressId: { type: String, required: true },
    addressSnapshot: {
      label: { type: String, default: "Home" },
      consumerNumber: { type: String, required: true },
      houseFlat: { type: String, required: true },
      street: { type: String, required: true },
      landmark: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      contactPhone: { type: String, required: true },
    },
    cylinderType: {
      type: String,
      enum: [
        "mini_5kg",
        "domestic_14_2kg_subsidized",
        "domestic_14_2kg_commercial",
        "commercial_19kg",
      ],
      required: true,
    },
    cylinderTitle: { type: String, required: true },
    cylinderWeight: { type: String, required: true },
    bookingType: {
      type: String,
      enum: ["instant", "scheduled", "subscription"],
      default: "instant",
    },
    scheduledDate: { type: String },
    deliverySlot: { type: String, enum: ["morning", "evening"] },
    recurrenceDays: { type: Number, enum: [30, 45, 60] },
    subscriptionActive: { type: Boolean, default: true },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "cod"],
      default: "upi",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Scheduled", "Refunded"],
      default: "Paid",
    },
    deliveryStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Confirmed & Safety Inspected",
        "Dispatched / Out for Delivery",
        "Delivered",
      ],
      default: "Dispatched / Out for Delivery",
    },
    otp: { type: String, required: true },
    baseAmount: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    subsidyDiscount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    driver: {
      name: { type: String },
      phone: { type: String },
      vehicleNo: { type: String },
      etaMinutes: { type: Number },
      avatar: { type: String },
      rating: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel: Model<IBookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<IBookingDocument>("Booking", BookingSchema);

export default BookingModel;

