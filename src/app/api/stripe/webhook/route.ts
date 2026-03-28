import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongoose";
import BookingModel from "@/models/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Webhook signature failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        await connectDB();
        await BookingModel.findByIdAndUpdate(bookingId, { paid: true });
        console.log(`Booking ${bookingId} marked as paid via webhook`);
      } catch (err) {
        console.error("Failed to update booking:", err);
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
