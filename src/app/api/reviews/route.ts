import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { reviewController } from "@/lib/controllers/review.controller";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reviews = await reviewController.getAll({
      destinationId: searchParams.get("destinationId") || undefined,
      userId: searchParams.get("userId") || undefined,
      limit: parseInt(searchParams.get("limit") || "100"),
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const review = await reviewController.create(
      body,
      (session.user as { id?: string }).id!,
      session.user?.name,
      session.user?.image
    );
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
