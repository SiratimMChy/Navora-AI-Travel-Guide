import { NextRequest, NextResponse } from "next/server";
import { flightController } from "@/lib/controllers/flight.controller";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin") || "Dhaka, Bangladesh";
    const destination = searchParams.get("destination") || "Anywhere";
    
    const flights = await flightController.search(origin, destination);

    return NextResponse.json({ success: true, data: flights });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
