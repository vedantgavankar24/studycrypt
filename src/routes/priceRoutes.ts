import express from "express";
import { fetchPrices } from "../services/cryptoService";

const router = express.Router();

router.get("/prices", async (req, res) => {
  try {
    const { cryptos, currencies } = req.query;

    const cryptosArray = typeof cryptos === "string" ? cryptos.split(",") : [];
    const currenciesArray = typeof currencies === "string" ? currencies.split(",") : [];

    const data = await fetchPrices(cryptosArray, currenciesArray);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
