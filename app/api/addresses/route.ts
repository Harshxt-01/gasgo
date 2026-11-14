import { NextResponse } from "next/server";
import { getAddresses, createAddress } from "@/lib/db/repository";

export async function GET() {
  try {
    const addresses = await getAddresses();
    return NextResponse.json(addresses);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch addresses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.houseFlat || !body.street || !body.city || !body.pincode || !body.consumerNumber) {
      return NextResponse.json(
        { error: "Consumer number, House/Flat, Street, City, and PIN code are required" },
        { status: 400 }
      );
    }

    const newAddress = await createAddress({
      userId: body.userId || "usr_auragas_001",
      label: body.label || "Home",
      consumerNumber: body.consumerNumber,
      houseFlat: body.houseFlat,
      street: body.street,
      landmark: body.landmark || "",
      city: body.city,
      state: body.state || "Karnataka",
      pincode: body.pincode,
      contactPhone: body.contactPhone || "+91 98765 43210",
      isDefault: Boolean(body.isDefault),
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create address" }, { status: 500 });
  }
}

