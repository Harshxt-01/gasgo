import { NextResponse } from "next/server";
import { getBookings, createBooking } from "@/lib/db/repository";
import { CYLINDER_CATALOG } from "@/lib/utils";
import { CylinderTypeId } from "@/lib/types";

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cylinderId = body.cylinderType as CylinderTypeId;
    const cylinder = CYLINDER_CATALOG[cylinderId] || CYLINDER_CATALOG.domestic_14_2kg_subsidized;

    const baseAmount = cylinder.basePrice;
    const deliveryFee = body.bookingType === "instant" ? 0 : 0;
    const subsidyDiscount = cylinder.subsidyAmount || 0;
    
    // Tax computation (GST on LPG is 5%: CGST 2.5% + SGST 2.5% on base)
    const cgst = Number(((baseAmount * 0.025)).toFixed(2));
    const sgst = Number(((baseAmount * 0.025)).toFixed(2));
    const totalAmount = Math.max(0, baseAmount - subsidyDiscount + deliveryFee);

    const booking = await createBooking({
      userId: body.userId || "usr_auragas_001",
      addressId: body.addressId,
      addressSnapshot: body.addressSnapshot,
      cylinderType: cylinderId,
      cylinderTitle: cylinder.title,
      cylinderWeight: cylinder.weight,
      bookingType: body.bookingType || "instant",
      scheduledDate: body.scheduledDate,
      deliverySlot: body.deliverySlot,
      recurrenceDays: body.recurrenceDays,
      subscriptionActive: body.subscriptionActive ?? true,
      paymentMethod: body.paymentMethod || "upi",
      paymentStatus: body.paymentMethod === "cod" ? "Pending" : "Paid",
      baseAmount,
      deliveryFee,
      cgst,
      sgst,
      subsidyDiscount,
      totalAmount,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create booking" }, { status: 500 });
  }
}

