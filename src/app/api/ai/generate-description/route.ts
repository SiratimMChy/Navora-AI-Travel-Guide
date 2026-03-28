import { NextRequest, NextResponse } from "next/server";
import { aiController } from "@/lib/controllers/ai.controller";

export async function POST(req: NextRequest) {
  try {
    const { title, type } = await req.json();
    const data = await aiController.generateDescription({ title, type });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[POST /api/ai/generate-description]", err);
    const message = err instanceof Error ? err.message : "Failed to generate description";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
