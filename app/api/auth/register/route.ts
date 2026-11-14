import { NextResponse } from "next/server";
import { registerUser } from "@/lib/db/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Full Name, Email, and Phone number are required" },
        { status: 400 }
      );
    }

    const newUser = await registerUser({
      name: body.name,
      email: body.email,
      phone: body.phone,
      consumerNumber: body.consumerNumber,
      role: body.role || "consumer",
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}

