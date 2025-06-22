import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    profession: String,
    availability: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", adSchema);
export default Ad;
