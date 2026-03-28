import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { userController } from "@/lib/controllers/user.controller";

type Params = { params: Promise<{ email: string }> };

async function requireAdmin() {
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  return user?.role === "admin" ? session : null;
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { email } = await params;
    const user = await userController.getByEmail(email);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { email } = await params;
    const { name, image } = await req.json();
    const updated = await userController.update(email, { name, image });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { email } = await params;
    const body = await req.json();
    let updated;
    if (body.status) updated = await userController.updateStatus(email, body.status);
    else if (body.role) updated = await userController.updateRole(email, body.role);
    else return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const { email } = await params;
    await userController.remove(email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
