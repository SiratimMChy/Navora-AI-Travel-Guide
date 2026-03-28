import { connectDB } from "@/lib/mongoose";
import BlogPostModel from "@/models/BlogPost";

export const blogController = {
  async getAll(limit = 10) {
    await connectDB();
    return await BlogPostModel.find({}).sort({ createdAt: -1 }).limit(limit).lean();
  },

  async create(body: Record<string, unknown>) {
    await connectDB();
    return await BlogPostModel.create(body);
  },

  async remove(id: string) {
    await connectDB();
    await BlogPostModel.findByIdAndDelete(id);
  },
};
