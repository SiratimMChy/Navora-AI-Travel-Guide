import { NextRequest, NextResponse } from "next/server";
import { destinationController } from "@/lib/controllers/destination.controller";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await destinationController.getAll({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      sort: searchParams.get("sort") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined,
    });
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ destinations: [], total: 0, pages: 1 }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const destination = await destinationController.create(body);
    return NextResponse.json(destination, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
