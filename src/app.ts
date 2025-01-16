import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./utils/db";
import alertRoutes from "./routes/alertRoutes";
import priceRoutes from "./routes/priceRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/alerts", alertRoutes);
app.use("/prices", priceRoutes);

// Initialize DB
connectDB();

export default app;
