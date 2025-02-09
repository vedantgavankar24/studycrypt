import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db";
import priceRoutes from "./routes/priceRoutes";
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


const cryptoAPI = "https://api.coingecko.com/api/v3";
const axios = require("axios");

app.use("/api", priceRoutes);

app.use('/', authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/alertcrypto", (req, res) => {
  res.sendFile(path.join(__dirname, "alertcrypto.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.get("/analytics", (req, res) => {
    res.sendFile(path.join(__dirname, "analytics.html"));
});
app.get("/viewcrypto", (req, res) => {
    res.sendFile(path.join(__dirname, "viewcrypto.html"));
});
// Endpoint to fetch all cryptocurrencies
app.get("/api/cryptos", async (req, res) => {
    try {
        const response = await axios.get(`${cryptoAPI}/coins/list`);
        const cryptos = response.data;
        res.json(cryptos);
    } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        res.status(500).json({ error: "Failed to fetch cryptocurrencies" });
    }
});

app.get("/api/prices", async (req, res) => {
  const { cryptos, currency } = req.body; // Use req.query t
  // o handle GET requests

  if (!cryptos || !currency) {
      return res.status(400).json({ error: "Cryptos and currencies are required." });
  }

  try {
      const response = await axios.get(
          `${cryptoAPI}/simple/price?ids=${cryptos}&vs_currencies=${currency}`
      );
      return res.json(response.data);
  } catch (error) {
      console.error("Error fetching prices:", error);
      res.status(500).json({ error: "Error fetching prices from CoinGecko API" });
  }
});


app.get("/api/currencies", async (req, res) => {
  try {
      // Fetch currency data from CoinGecko
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");

      if (response.data) {
          res.json(response.data);
      } else {
          res.status(500).json({ error: "Failed to fetch currencies." });
      }
  } catch (error) {
      console.error("Error fetching currencies:", error);
      res.status(500).json({ error: "Error fetching currencies from CoinGecko API." });
  }
});



app.get("/api/crypto-history", async (req, res) => {
  const { id, currency, days } = req.body;

  if (!id || !currency || !days) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  try {
    const response = await axios.get(
      `${cryptoAPI}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    res.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    res.status(500).json({ error: "Failed to fetch historical data." });
  
  }
});

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail or another service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-alert", async (req, res) => {
  const { email, crypto, currency, condition, threshold, currentPrice } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Crypto Alert Triggered",
    text: `Alert Triggered!
    
    Cryptocurrency: ${crypto}
    Currency: ${currency}
    Condition: ${condition}
    Threshold: ${threshold}
    Current Price: ${currentPrice}
    
    The alert condition has been satisfied.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    alert("Alert email sent successfully." );
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email." );
  }
});

  
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
