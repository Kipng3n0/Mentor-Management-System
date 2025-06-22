import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME, 
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(
      `Database connected. Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed with ${error}`);
    process.exit(1);
  }
};

export { connectDB };