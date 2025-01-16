import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cryptoDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "cryptoDB",
      useUnifiedTopology: true,
      useNewUrlParser: true, 
    } as mongoose.ConnectOptions);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};
