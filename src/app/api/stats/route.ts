import { NextResponse } from "next/server";
import { statsController } from "@/lib/controllers/stats.controller";

export async function GET() {
  try {
    const stats = await statsController.getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ destinations: 0, bookings: 0, users: 0, avgRating: "4.9" }, { status: 500 });
  }
}
