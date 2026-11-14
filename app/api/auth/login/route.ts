import { NextResponse } from "next/server";
import { loginUser } from "@/lib/db/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = body.identifier || body.email || body.consumerNumber;
    const password = body.password;

    if (!identifier) {
      return NextResponse.json(
        { error: "Email or Consumer SV number is required" },
        { status: 400 }
      );
    }

    const user = await loginUser(identifier, password);
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email or SV number. Please register for a connection first." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log in" },
      { status: 401 }
    );
  }
}

