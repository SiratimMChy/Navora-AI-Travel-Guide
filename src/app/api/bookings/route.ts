import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { bookingController } from "@/lib/controllers/booking.controller";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const bookings = await bookingController.getByUser((session.user as { id?: string }).id!);
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const booking = await bookingController.create(body, (session.user as { id?: string }).id!);
  return NextResponse.json(booking, { status: 201 });
}
