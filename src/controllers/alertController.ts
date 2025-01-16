import { Request, Response } from "express";
import { Alert } from "../models/alertModel";

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
