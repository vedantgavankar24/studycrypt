import { Request, Response } from "express";
import { Alert } from "../models/alertModel";
import { Cache } from "../models/Cache";

export const createAlert = async (req: Request, res: Response) => {
  try {
    const alert = await Alert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createCache = async (req: Request, res: Response) => {
  try {
    const { cryptos, currency, price } = req.body;

    // Check if a cache entry exists for the given cryptos and currency
    let cache = await Cache.findOne({ cryptos, currency });

    if (cache) {
      // Update the existing cache entry
      cache = await Cache.findOneAndUpdate(
        { cryptos, currency },
        { price },
        { new: true } // Return the updated document
      );
    } else {
      // Create a new cache entry
      cache = await Cache.create({ cryptos, currency, price });
    }

    res.status(200).json(cache);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};