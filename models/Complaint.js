import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ["HIGH", "NORMAL"], default: "NORMAL" },
    status: { type: String, default: "Pending" },
    image: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "complaints" }
);

export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
