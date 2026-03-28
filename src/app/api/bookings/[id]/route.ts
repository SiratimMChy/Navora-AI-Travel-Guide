import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bookingController } from "@/lib/controllers/booking.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const { paid } = await req.json();
    const booking = await bookingController.updatePaid(id, paid);
    return NextResponse.json({ success: true, paid: booking.paid });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
