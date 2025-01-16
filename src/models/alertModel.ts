import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  username: String,
  cryptoId: String,
  priceThreshold: Number,
  alertType: { type: String, enum: ["above", "below"] },
  isActive: { type: Boolean, default: true },
});

export const Alert = mongoose.model("Alert", alertSchema);
