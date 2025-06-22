import express from "express";
import {
  createAd,
  getAllAds,
  getNearbyAds,
} from "../controllers/adController.js";

const router = express.Router();

router.post("/create", createAd);
router.get("/", getAllAds);
router.get("/nearby", getNearbyAds);

export default router;
