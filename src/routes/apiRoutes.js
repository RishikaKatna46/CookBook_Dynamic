import express from "express";
import { getStats } from "../controllers/apiController.js";
const router = express.Router();

router.get("/stats", getStats);

export default router;
