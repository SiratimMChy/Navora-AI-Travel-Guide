import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/lib/controllers/user.controller";

export async function GET() {
  const users = await userController.getAll();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const user = await userController.create({ name, email, password });
    return NextResponse.json({ acknowledged: true, id: user._id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
