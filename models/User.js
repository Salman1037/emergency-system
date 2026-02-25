import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
