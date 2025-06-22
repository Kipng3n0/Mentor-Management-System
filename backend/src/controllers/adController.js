import Ad from "../models/Ad.js";

// POST /ads/create
export const createAd = async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ad" });
  }
};

// GET /ads
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("userId", "name email");
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
};

// GET /ads/nearby?lat=...&lng=...&radius=...
export const getNearbyAds = async (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng || !radius)
    return res.status(400).json({ error: "Missing params" });

  try {
    const R = 6371; // km
    const ads = await Ad.find();
    const nearbyAds = ads.filter((ad) => {
      if (!ad.coordinates?.lat || !ad.coordinates?.lng) return false;
      const dLat = ((lat - ad.coordinates.lat) * Math.PI) / 180;
      const dLng = ((lng - ad.coordinates.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((ad.coordinates.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c <= radius;
    });

    res.json(nearbyAds);
  } catch (err) {
    res.status(500).json({ error: "Failed to find nearby ads" });
  }
};
