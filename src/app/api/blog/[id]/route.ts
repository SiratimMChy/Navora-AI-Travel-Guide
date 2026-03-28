import { NextRequest, NextResponse } from "next/server";
import { blogController } from "@/lib/controllers/blog.controller";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await blogController.remove(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
