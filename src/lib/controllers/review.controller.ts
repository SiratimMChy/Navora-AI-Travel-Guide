import { connectDB } from "@/lib/mongoose";
import ReviewModel from "@/models/Review";

export const reviewController = {
  async getAll({ destinationId, userId, limit = 100 }: { destinationId?: string; userId?: string; limit?: number }) {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (destinationId) query.destinationId = destinationId;
    if (userId) query.userId = userId;
    return await ReviewModel.find(query).sort({ createdAt: -1 }).limit(limit).lean();
  },

  async create(body: Record<string, unknown>, userId: string, userName?: string | null, userImage?: string | null) {
    await connectDB();
    return await ReviewModel.create({ ...body, userId, userName, userImage });
  },
};
