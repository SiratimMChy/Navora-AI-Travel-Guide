import { model, models, Schema } from "mongoose";

const DestinationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, enum: ["beach", "mountain", "city", "adventure", "cruise"], required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    duration: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const DestinationModel = models.Destination || model("Destination", DestinationSchema);
export default DestinationModel;
