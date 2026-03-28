import { connectDB } from "@/lib/mongoose";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export const userController = {
  async getAll() {
    await connectDB();
    return await UserModel.find({}, { password: 0 }).lean();
  },

  async getByEmail(email: string) {
    await connectDB();
    const user = await UserModel.findOne({ email }, { password: 0 }).lean();
    if (!user) throw new Error("User not found");
    return user;
  },

  async create({ name, email, password }: { name: string; email: string; password: string }) {
    await connectDB();
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error("Email already exists");
    const hashed = await bcrypt.hash(password, 10);
    return await UserModel.create({ name, email, password: hashed, role: "user" });
  },

  async update(email: string, { name, image }: { name?: string; image?: string }) {
    await connectDB();
    return await UserModel.findOneAndUpdate(
      { email },
      { ...(name && { name }), ...(image && { image }) },
      { new: true, select: "-password" }
    );
  },

  async updateStatus(email: string, status: "active" | "blocked") {
    await connectDB();
    return await UserModel.findOneAndUpdate({ email }, { status }, { new: true, select: "-password" });
  },

  async updateRole(email: string, role: "user" | "admin") {
    await connectDB();
    return await UserModel.findOneAndUpdate({ email }, { role }, { new: true, select: "-password" });
  },

  async remove(email: string) {
    await connectDB();
    await UserModel.findOneAndDelete({ email });
  },
};
