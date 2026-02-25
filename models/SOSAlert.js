import mongoose from "mongoose";

const SOSAlertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "sosalerts" }
);

export default mongoose.models.SOSAlert || mongoose.model("SOSAlert", SOSAlertSchema);
