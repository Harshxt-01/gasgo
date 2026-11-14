import { NextResponse } from "next/server";
import { loginUser } from "@/lib/db/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = body.identifier || body.email || body.consumerNumber;

    if (!identifier) {
      return NextResponse.json(
        { error: "Email or Consumer SV number is required" },
        { status: 400 }
      );
    }

    const user = await loginUser(identifier);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Try demo accounts: arjun.verma@auragas.io or admin@auragas.io" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log in" },
      { status: 500 }
    );
  }
}

