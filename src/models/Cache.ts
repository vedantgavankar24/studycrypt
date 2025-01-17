import mongoose from "mongoose";

const cacheSchema = new mongoose.Schema({
  cryptos: String,
  currency: String,
  price: Number
});

export const Cache = mongoose.model("Cache", cacheSchema);
