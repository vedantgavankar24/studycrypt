import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  crypto: { type: String, required: true },
  currency: { type: String, required: true },
  condition: { type: String, enum: ["above", "below"], required: true },
  value: { type: Number, required: true },
  email: { type: String, required: true },
});

export const Alert = mongoose.model("Alert", alertSchema);
