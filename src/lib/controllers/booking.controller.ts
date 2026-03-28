import { connectDB } from "@/lib/mongoose";
import BookingModel from "@/models/Booking";

export const bookingController = {
  async getByUser(userId: string) {
    await connectDB();
    return await BookingModel.find({ userId }).populate("destinationId").lean();
  },

  async create(body: Record<string, unknown>, userId: string) {
    await connectDB();
    return await BookingModel.create({ ...body, userId });
  },

  async updatePaid(id: string, paid: boolean) {
    await connectDB();
    const booking = await BookingModel.findByIdAndUpdate(id, { paid }, { new: true });
    if (!booking) throw new Error("Booking not found");
    return booking;
  },

  // Admin
  async getAll() {
    await connectDB();
    return await BookingModel.find({})
      .populate("destinationId", "title image location country")
      .sort({ createdAt: -1 })
      .lean();
  },

  async updateStatus(id: string, action: "confirm" | "reject", reason?: string) {
    await connectDB();
    const update =
      action === "confirm"
        ? { status: "confirmed", rejectionReason: "" }
        : { status: "rejected", rejectionReason: reason || "No reason provided." };
    const booking = await BookingModel.findByIdAndUpdate(id, update, { new: true });
    if (!booking) throw new Error("Booking not found");
    return booking;
  },
};
