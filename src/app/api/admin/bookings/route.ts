import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bookingController } from "@/lib/controllers/booking.controller";

async function requireAdmin() {
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  return user?.role === "admin" ? session : null;
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const bookings = await bookingController.getAll();
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { id, action, reason } = await req.json();
    if (!id || !action) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const booking = await bookingController.updateStatus(id, action, reason);
    return NextResponse.json(booking);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
