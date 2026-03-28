import { model, models, Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userImage: { type: String },
    destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewModel = models.Review || model("Review", ReviewSchema);
export default ReviewModel;
