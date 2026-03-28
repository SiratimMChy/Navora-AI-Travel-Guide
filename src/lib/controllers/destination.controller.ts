import { connectDB } from "@/lib/mongoose";
import DestinationModel from "@/models/Destination";
import { SortOrder } from "mongoose";

export const destinationController = {
  async getAll({ search, category, sort, page, limit: limitParam }: { search?: string; category?: string; sort?: string; page?: number; limit?: number }) {
    await connectDB();
    const limit = limitParam || 8;
    const query: Record<string, unknown> = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (category) query.category = category;

    let sortObj: Record<string, SortOrder> = { rating: -1 };
    if (sort === "price_asc") sortObj = { price: 1 };
    if (sort === "price_desc") sortObj = { price: -1 };
    if (sort === "rating") sortObj = { rating: -1 };

    const currentPage = page || 1;
    const total = await DestinationModel.countDocuments(query);
    const destinations = await DestinationModel.find(query)
      .sort(sortObj)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .lean();

    return { destinations, total, pages: Math.ceil(total / limit) };
  },

  async getById(id: string) {
    await connectDB();
    const destination = await DestinationModel.findById(id).lean();
    if (!destination) throw new Error("Not found");
    return destination;
  },

  async create(body: Record<string, unknown>) {
    await connectDB();
    return await DestinationModel.create(body);
  },

  async update(id: string, body: Record<string, unknown>) {
    await connectDB();
    return await DestinationModel.findByIdAndUpdate(id, body, { new: true });
  },

  async remove(id: string) {
    await connectDB();
    await DestinationModel.findByIdAndDelete(id);
  },
};
