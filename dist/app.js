"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./utils/db");
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const priceRoutes_1 = __importDefault(require("./routes/priceRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use("/alerts", alertRoutes_1.default);
app.use("/prices", priceRoutes_1.default);
// Initialize DB
(0, db_1.connectDB)();
exports.default = app;
