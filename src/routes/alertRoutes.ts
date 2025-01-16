import { Router } from "express";
import { createAlert, getAlerts } from "../controllers/alertController";

const router = Router();

router.post("/", createAlert);
router.get("/", getAlerts);

export default router;
