export type CylinderTypeId = 
  | 'mini_5kg' 
  | 'domestic_14_2kg_subsidized' 
  | 'domestic_14_2kg_commercial' 
  | 'commercial_19kg';

export interface CylinderOption {
  id: CylinderTypeId;
  title: string;
  weight: string;
  capacityKg: number;
  badge: string;
  basePrice: number;
  subsidyAmount: number;
  netPrice: number;
  description: string;
  idealFor: string;
  safetyRating: string;
  colorScheme: 'amber' | 'cyan' | 'indigo' | 'emerald';
  dimensions: string;
  inspectionCycle: string;
}

export type BookingType = 'instant' | 'scheduled' | 'subscription';

export type DeliverySlot = 'morning' | 'evening';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export type PaymentStatus = 'Paid' | 'Pending' | 'Scheduled' | 'Refunded';

export type DeliveryStage = 
  | 'Order Placed' 
  | 'Confirmed & Safety Inspected' 
  | 'Dispatched / Out for Delivery' 
  | 'Delivered';

export interface IDriver {
  name: string;
  phone: string;
  vehicleNo: string;
  etaMinutes: number;
  avatar: string;
  rating: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  consumerNumber: string;
  avatarUrl?: string;
  role?: 'consumer' | 'admin';
  password?: string;
  createdAt?: string;
}

export interface IAddress {
  _id: string;
  userId: string;
  label: 'Home' | 'Work' | 'Other';
  consumerNumber: string;
  houseFlat: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  contactPhone: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBooking {
  _id: string;
  bookingRef: string; // e.g. "AG-84920"
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
  cylinderType: CylinderTypeId;
  cylinderTitle: string;
  cylinderWeight: string;
  bookingType: BookingType;
  scheduledDate?: string;
  deliverySlot?: DeliverySlot;
  recurrenceDays?: 30 | 45 | 60;
  subscriptionActive?: boolean;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStage;
  otp: string; // 4-digit verification code
  baseAmount: number;
  deliveryFee: number;
  cgst: number;
  sgst: number;
  subsidyDiscount: number;
  totalAmount: number;
  driver?: IDriver;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  bookingRef: string;
  distributorName: string;
  distributorGST: string;
  distributorSVCode: string;
  customerName: string;
  consumerNumber: string;
  customerPhone: string;
  shippingAddress: string;
  cylinderSpecs: {
    type: string;
    tareWeight: string;
    grossWeight: string;
    pressureTestDate: string;
  };
  pricing: {
    baseAmount: number;
    deliveryFee: number;
    cgst: number; // 2.5%
    sgst: number; // 2.5%
    subsidyDiscount: number;
    totalAmount: number;
  };
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

