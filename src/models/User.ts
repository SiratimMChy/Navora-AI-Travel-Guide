import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
  },
  { timestamps: true }
);

const UserModel = models.User || model("User", UserSchema);
export default UserModel;
