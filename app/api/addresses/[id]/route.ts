import { NextResponse } from "next/server";
import { updateAddress, deleteAddress } from "@/lib/db/repository";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateAddress(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update address" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteAddress(id);
    if (!deleted) {
      return NextResponse.json({ error: "Address not found or delete failed" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Address deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete address" }, { status: 500 });
  }
}

