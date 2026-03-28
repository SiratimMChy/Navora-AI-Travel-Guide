import { NextRequest, NextResponse } from "next/server";
import { destinationController } from "@/lib/controllers/destination.controller";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const destination = await destinationController.getById(id);
    return NextResponse.json(destination);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await destinationController.update(id, body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await destinationController.remove(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
