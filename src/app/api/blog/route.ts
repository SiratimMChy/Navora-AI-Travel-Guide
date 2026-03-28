import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { blogController } from "@/lib/controllers/blog.controller";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const posts = await blogController.getAll(limit);
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized. Please log in to post." }, { status: 401 });
    const body = await req.json();
    const post = await blogController.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
