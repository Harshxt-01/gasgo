import { connectDB } from "./connect";
import UserModel from "../models/User";
import AddressModel from "../models/Address";
import BookingModel from "../models/Booking";
import { IAddress, IBooking, IUser } from "../types";
import { MOCK_USER, MOCK_ADMIN_USER, MOCK_ADDRESSES, MOCK_BOOKINGS } from "./mockData";
import { generateBookingRef, generateOTP } from "../utils";

// Memory storage cache fallback
let memoryUsers: IUser[] = [MOCK_USER, MOCK_ADMIN_USER];
let memoryUser: IUser = { ...MOCK_USER };
let memoryAddresses: IAddress[] = [...MOCK_ADDRESSES];
let memoryBookings: IBooking[] = [...MOCK_BOOKINGS];

export async function getUser(): Promise<IUser> {
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const user = await UserModel.findOne().lean();
      if (user) {
        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          consumerNumber: user.consumerNumber,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt?.toISOString(),
        };
      }
      // Seed default user if none
      const created = await UserModel.create({
        name: memoryUser.name,
        email: memoryUser.email,
        phone: memoryUser.phone,
        consumerNumber: memoryUser.consumerNumber,
        avatarUrl: memoryUser.avatarUrl,
      });
      return {
        _id: created._id.toString(),
        name: created.name,
        email: created.email,
        phone: created.phone,
        consumerNumber: created.consumerNumber,
        avatarUrl: created.avatarUrl,
        createdAt: created.createdAt?.toISOString(),
      };
    } catch (err) {
      console.warn("DB user fetch error, fallback to memory:", err);
    }
  }
  return memoryUser;
}

export async function getAddresses(): Promise<IAddress[]> {
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const addresses = await AddressModel.find().sort({ isDefault: -1, createdAt: -1 }).lean();
      if (addresses && addresses.length > 0) {
        return addresses.map((a) => ({
          _id: a._id.toString(),
          userId: a.userId,
          label: a.label,
          consumerNumber: a.consumerNumber,
          houseFlat: a.houseFlat,
          street: a.street,
          landmark: a.landmark,
          city: a.city,
          state: a.state,
          pincode: a.pincode,
          contactPhone: a.contactPhone,
          isDefault: a.isDefault,
          createdAt: a.createdAt?.toISOString(),
        }));
      }
    } catch (err) {
      console.warn("DB addresses fetch error, fallback to memory:", err);
    }
  }
  return memoryAddresses;
}

export async function createAddress(data: Omit<IAddress, "_id" | "createdAt" | "updatedAt">): Promise<IAddress> {
  const db = await connectDB();
  
  if (data.isDefault) {
    // Unset other defaults in memory
    memoryAddresses = memoryAddresses.map((a) => ({ ...a, isDefault: false }));
  }

  if (db && db.connection.readyState === 1) {
    try {
      if (data.isDefault) {
        await AddressModel.updateMany({}, { isDefault: false });
      }
      const created = await AddressModel.create(data);
      const newAddr: IAddress = {
        _id: created._id.toString(),
        userId: created.userId,
        label: created.label,
        consumerNumber: created.consumerNumber,
        houseFlat: created.houseFlat,
        street: created.street,
        landmark: created.landmark,
        city: created.city,
        state: created.state,
        pincode: created.pincode,
        contactPhone: created.contactPhone,
        isDefault: created.isDefault,
        createdAt: created.createdAt?.toISOString(),
      };
      // Keep memory synced
      memoryAddresses.unshift(newAddr);
      return newAddr;
    } catch (err) {
      console.warn("DB address creation error, fallback to memory:", err);
    }
  }

  const newAddr: IAddress = {
    ...data,
    _id: `addr_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  memoryAddresses.unshift(newAddr);
  return newAddr;
}

export async function updateAddress(id: string, data: Partial<IAddress>): Promise<IAddress | null> {
  const db = await connectDB();

  if (data.isDefault) {
    memoryAddresses = memoryAddresses.map((a) => ({ ...a, isDefault: false }));
  }

  if (db && db.connection.readyState === 1) {
    try {
      if (data.isDefault) {
        await AddressModel.updateMany({ _id: { $ne: id } }, { isDefault: false });
      }
      const updated = await AddressModel.findByIdAndUpdate(id, data, { new: true }).lean();
      if (updated) {
        const addr: IAddress = {
          _id: updated._id.toString(),
          userId: updated.userId,
          label: updated.label,
          consumerNumber: updated.consumerNumber,
          houseFlat: updated.houseFlat,
          street: updated.street,
          landmark: updated.landmark,
          city: updated.city,
          state: updated.state,
          pincode: updated.pincode,
          contactPhone: updated.contactPhone,
          isDefault: updated.isDefault,
          createdAt: updated.createdAt?.toISOString(),
        };
        const index = memoryAddresses.findIndex((a) => a._id === id);
        if (index !== -1) memoryAddresses[index] = addr;
        return addr;
      }
    } catch (err) {
      console.warn("DB address update error, fallback to memory:", err);
    }
  }

  const index = memoryAddresses.findIndex((a) => a._id === id);
  if (index === -1) return null;
  memoryAddresses[index] = { ...memoryAddresses[index], ...data, updatedAt: new Date().toISOString() };
  return memoryAddresses[index];
}

export async function deleteAddress(id: string): Promise<boolean> {
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      await AddressModel.findByIdAndDelete(id);
    } catch (err) {
      console.warn("DB address delete error:", err);
    }
  }
  const prevLen = memoryAddresses.length;
  memoryAddresses = memoryAddresses.filter((a) => a._id !== id);
  return memoryAddresses.length < prevLen;
}

export async function getBookings(): Promise<IBooking[]> {
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const bookings = await BookingModel.find().sort({ createdAt: -1 }).lean();
      if (bookings && bookings.length > 0) {
        return bookings.map((b) => ({
          _id: b._id.toString(),
          bookingRef: b.bookingRef,
          userId: b.userId,
          addressId: b.addressId,
          addressSnapshot: b.addressSnapshot,
          cylinderType: b.cylinderType as any,
          cylinderTitle: b.cylinderTitle,
          cylinderWeight: b.cylinderWeight,
          bookingType: b.bookingType as any,
          scheduledDate: b.scheduledDate,
          deliverySlot: b.deliverySlot as any,
          recurrenceDays: b.recurrenceDays as any,
          subscriptionActive: b.subscriptionActive,
          paymentMethod: b.paymentMethod as any,
          paymentStatus: b.paymentStatus as any,
          deliveryStatus: b.deliveryStatus as any,
          otp: b.otp,
          baseAmount: b.baseAmount,
          deliveryFee: b.deliveryFee,
          cgst: b.cgst,
          sgst: b.sgst,
          subsidyDiscount: b.subsidyDiscount,
          totalAmount: b.totalAmount,
          driver: b.driver,
          createdAt: b.createdAt?.toISOString(),
          updatedAt: b.updatedAt?.toISOString(),
        }));
      }
    } catch (err) {
      console.warn("DB bookings fetch error, fallback to memory:", err);
    }
  }
  return memoryBookings;
}

export async function getBookingByIdOrRef(query: string): Promise<IBooking | null> {
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const b = await BookingModel.findOne({
        $or: [{ _id: query.match(/^[0-9a-fA-F]{24}$/) ? query : null }, { bookingRef: query.toUpperCase() }],
      }).lean();
      if (b) {
        return {
          _id: b._id.toString(),
          bookingRef: b.bookingRef,
          userId: b.userId,
          addressId: b.addressId,
          addressSnapshot: b.addressSnapshot,
          cylinderType: b.cylinderType as any,
          cylinderTitle: b.cylinderTitle,
          cylinderWeight: b.cylinderWeight,
          bookingType: b.bookingType as any,
          scheduledDate: b.scheduledDate,
          deliverySlot: b.deliverySlot as any,
          recurrenceDays: b.recurrenceDays as any,
          subscriptionActive: b.subscriptionActive,
          paymentMethod: b.paymentMethod as any,
          paymentStatus: b.paymentStatus as any,
          deliveryStatus: b.deliveryStatus as any,
          otp: b.otp,
          baseAmount: b.baseAmount,
          deliveryFee: b.deliveryFee,
          cgst: b.cgst,
          sgst: b.sgst,
          subsidyDiscount: b.subsidyDiscount,
          totalAmount: b.totalAmount,
          driver: b.driver,
          createdAt: b.createdAt?.toISOString(),
          updatedAt: b.updatedAt?.toISOString(),
        };
      }
    } catch (err) {
      console.warn("DB booking fetch error, fallback to memory:", err);
    }
  }
  const cleanQ = query.trim().toUpperCase();
  const found = memoryBookings.find((b) => b._id === query || b.bookingRef.toUpperCase() === cleanQ);
  return found || null;
}

export async function createBooking(data: Partial<IBooking>): Promise<IBooking> {
  const bookingRef = data.bookingRef || generateBookingRef();
  const otp = data.otp || generateOTP();

  const isInstant = data.bookingType === "instant";
  const driverData =
    data.driver ||
    (isInstant
      ? {
          name: "Rajesh Kumar",
          phone: "+91 98451 22910",
          vehicleNo: "KA 03 EX 4821 (Electric Trike)",
          etaMinutes: 24,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          rating: 4.9,
        }
      : undefined);

  const deliveryStatus = data.deliveryStatus || (isInstant ? "Dispatched / Out for Delivery" : "Order Placed");

  const fullBooking: IBooking = {
    _id: `book_${Date.now()}`,
    bookingRef,
    userId: data.userId || "usr_auragas_001",
    addressId: data.addressId || "addr_001",
    addressSnapshot: data.addressSnapshot || {
      label: "Home",
      consumerNumber: "SV-8492018",
      houseFlat: "Flat 402, Radiant Heights",
      street: "14th Main, Indiranagar",
      landmark: "Near Defense Colony Park",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      contactPhone: "+91 98765 43210",
    },
    cylinderType: data.cylinderType || "domestic_14_2kg_subsidized",
    cylinderTitle: data.cylinderTitle || "Aura Domestic 14.2kg (Subsidized)",
    cylinderWeight: data.cylinderWeight || "14.2 kg",
    bookingType: data.bookingType || "instant",
    scheduledDate: data.scheduledDate,
    deliverySlot: data.deliverySlot,
    recurrenceDays: data.recurrenceDays,
    subscriptionActive: data.subscriptionActive ?? (data.bookingType === "subscription"),
    paymentMethod: data.paymentMethod || "upi",
    paymentStatus: data.paymentStatus || (data.paymentMethod === "cod" ? "Pending" : "Paid"),
    deliveryStatus,
    otp,
    baseAmount: data.baseAmount || 803,
    deliveryFee: data.deliveryFee ?? 0,
    cgst: data.cgst || 20.08,
    sgst: data.sgst || 20.08,
    subsidyDiscount: data.subsidyDiscount ?? 0,
    totalAmount: data.totalAmount || 503,
    driver: driverData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const created = await BookingModel.create(fullBooking);
      fullBooking._id = created._id.toString();
    } catch (err) {
      console.warn("DB booking creation error, using memory fallback:", err);
    }
  }

  memoryBookings.unshift(fullBooking);
  return fullBooking;
}

export async function updateBooking(idOrRef: string, updates: Partial<IBooking>): Promise<IBooking | null> {
  const cleanQ = idOrRef.trim().toUpperCase();
  const db = await connectDB();

  if (db && db.connection.readyState === 1) {
    try {
      const updated = await BookingModel.findOneAndUpdate(
        {
          $or: [{ _id: idOrRef.match(/^[0-9a-fA-F]{24}$/) ? idOrRef : null }, { bookingRef: cleanQ }],
        },
        { ...updates, updatedAt: new Date() },
        { new: true }
      ).lean();

      if (updated) {
        const res: IBooking = {
          _id: updated._id.toString(),
          bookingRef: updated.bookingRef,
          userId: updated.userId,
          addressId: updated.addressId,
          addressSnapshot: updated.addressSnapshot,
          cylinderType: updated.cylinderType as any,
          cylinderTitle: updated.cylinderTitle,
          cylinderWeight: updated.cylinderWeight,
          bookingType: updated.bookingType as any,
          scheduledDate: updated.scheduledDate,
          deliverySlot: updated.deliverySlot as any,
          recurrenceDays: updated.recurrenceDays as any,
          subscriptionActive: updated.subscriptionActive,
          paymentMethod: updated.paymentMethod as any,
          paymentStatus: updated.paymentStatus as any,
          deliveryStatus: updated.deliveryStatus as any,
          otp: updated.otp,
          baseAmount: updated.baseAmount,
          deliveryFee: updated.deliveryFee,
          cgst: updated.cgst,
          sgst: updated.sgst,
          subsidyDiscount: updated.subsidyDiscount,
          totalAmount: updated.totalAmount,
          driver: updated.driver,
          createdAt: updated.createdAt?.toISOString(),
          updatedAt: updated.updatedAt?.toISOString(),
        };

        const idx = memoryBookings.findIndex((b) => b._id === idOrRef || b.bookingRef.toUpperCase() === cleanQ);
        if (idx !== -1) memoryBookings[idx] = res;
        return res;
      }
    } catch (err) {
      console.warn("DB booking update error, fallback to memory:", err);
    }
  }

  const idx = memoryBookings.findIndex((b) => b._id === idOrRef || b.bookingRef.toUpperCase() === cleanQ);
  if (idx === -1) return null;
  memoryBookings[idx] = {
    ...memoryBookings[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return memoryBookings[idx];
}

export async function loginUser(identifier: string, password?: string): Promise<IUser | null> {
  const clean = identifier.trim().toLowerCase();
  const isDemo =
    clean === "arjun.verma@auragas.io" ||
    clean === "admin@auragas.io" ||
    clean === "sv-8492018" ||
    clean === "admin-peso-01";
  
  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const u = await UserModel.findOne({
        $or: [
          { email: clean },
          { consumerNumber: identifier.trim().toUpperCase() },
        ],
      }).lean();
      if (u) {
        // If user has a password set, verify it (demo accounts bypass)
        if (!isDemo && u.password && password && u.password !== password) {
          throw new Error("Incorrect password. Please verify your credentials.");
        }
        return {
          _id: u._id.toString(),
          name: u.name,
          email: u.email,
          phone: u.phone,
          consumerNumber: u.consumerNumber,
          avatarUrl: u.avatarUrl,
          role: u.role || "consumer",
          createdAt: u.createdAt?.toISOString(),
        };
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Incorrect password")) {
        throw err;
      }
      console.warn("DB login error, fallback to memory:", err);
    }
  }

  // Memory fallback
  const found = memoryUsers.find(
    (u) =>
      u.email.toLowerCase() === clean ||
      u.consumerNumber.toUpperCase() === identifier.trim().toUpperCase()
  );
  if (found) {
    if (!isDemo && found.password && password && found.password !== password) {
      throw new Error("Incorrect password. Please verify your credentials.");
    }
    memoryUser = found;
    return found;
  }
  return null;
}

export async function registerUser(userData: {
  name: string;
  email: string;
  phone: string;
  password?: string;
  consumerNumber?: string;
  role?: "consumer" | "admin";
}): Promise<IUser> {
  const consumerNumber =
    userData.consumerNumber ||
    `SV-${Math.floor(1000000 + Math.random() * 9000000)}`;

  const newUser: IUser = {
    _id: `usr_${Date.now()}`,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password || "123456",
    consumerNumber,
    role: userData.role || "consumer",
    avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    createdAt: new Date().toISOString(),
  };

  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      const created = await UserModel.create({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        consumerNumber: newUser.consumerNumber,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
      });
      newUser._id = created._id.toString();
    } catch (err) {
      console.warn("DB register error, fallback to memory:", err);
    }
  }

  const existingIdx = memoryUsers.findIndex(
    (u) => u.email.toLowerCase() === userData.email.toLowerCase()
  );
  if (existingIdx !== -1) {
    memoryUsers[existingIdx] = {
      ...memoryUsers[existingIdx],
      ...newUser,
      _id: memoryUsers[existingIdx]._id,
    };
    memoryUser = memoryUsers[existingIdx];
    return memoryUser;
  }

  memoryUsers.push(newUser);
  memoryUser = newUser;
  return newUser;
}

export async function resetMockData(): Promise<{ success: boolean; addresses: number; bookings: number }> {
  memoryUser = { ...MOCK_USER };
  memoryAddresses = [...MOCK_ADDRESSES];
  memoryBookings = [...MOCK_BOOKINGS];

  const db = await connectDB();
  if (db && db.connection.readyState === 1) {
    try {
      await UserModel.deleteMany({});
      await AddressModel.deleteMany({});
      await BookingModel.deleteMany({});

      await UserModel.create(MOCK_USER);
      await AddressModel.insertMany(MOCK_ADDRESSES);
      await BookingModel.insertMany(MOCK_BOOKINGS);
    } catch (err) {
      console.warn("Reset MongoDB error:", err);
    }
  }

  return { success: true, addresses: memoryAddresses.length, bookings: memoryBookings.length };
}

