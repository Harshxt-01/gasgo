import { NextResponse } from "next/server";
import { getBookingByIdOrRef, updateBooking } from "@/lib/db/repository";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await getBookingByIdOrRef(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking reference not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateBooking(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update booking" }, { status: 500 });
  }
}

