import { connectDB } from "@/lib/mongoose";
import DestinationModel from "@/models/Destination";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";
import ReviewModel from "@/models/Review";

export const statsController = {
  async getStats() {
    await connectDB();
    const [destinations, bookings, users, ratingAgg] = await Promise.all([
      DestinationModel.countDocuments(),
      BookingModel.countDocuments(),
      UserModel.countDocuments(),
      ReviewModel.aggregate([{ $group: { _id: null, avg: { $avg: "$rating" } } }]),
    ]);
    const avgRating = ratingAgg[0]?.avg ? ratingAgg[0].avg.toFixed(1) : "4.9";
    return { destinations, bookings, users, avgRating };
  },
};
