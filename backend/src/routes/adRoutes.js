import express from "express";
import {
  createAd,
  getAllAds,
  getNearbyAds,
} from "../controllers/adController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createAd);
//router.post("/create", createAd);
router.get("/", getAllAds);
router.get("/nearby", getNearbyAds);

export default router;
