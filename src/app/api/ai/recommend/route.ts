import { NextRequest, NextResponse } from "next/server";
import { aiController } from "@/lib/controllers/ai.controller";

export async function POST(req: NextRequest) {
  try {
    const { preferences } = await req.json();
    const result = await aiController.recommend(preferences);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: "Could not get recommendations", recommendations: [] }, { status: 500 });
  }
}
