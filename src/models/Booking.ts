import { model, models, Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: String, required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    travelers: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "rejected"], default: "pending" },
    travelDate: { type: Date, required: true },
    rejectionReason: { type: String, default: "" },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BookingModel = models.Booking || model("Booking", BookingSchema);
export default BookingModel;
