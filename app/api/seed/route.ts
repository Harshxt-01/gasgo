import { NextResponse } from "next/server";
import { resetMockData } from "@/lib/db/repository";

export async function POST() {
  try {
    const result = await resetMockData();
    return NextResponse.json({
      message: "Data store initialized with sample bookings, addresses, and user profile.",
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to reset data" }, { status: 500 });
  }
}

