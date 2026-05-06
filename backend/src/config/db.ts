import mongoose from "mongoose";

import { ENV } from "./env.config.js";

export const connectToDb = async () => {
  try {
    const db = await mongoose.connect(ENV.DB_URL!);
    console.log("Connected to MongoDB successfully!", db.connection.host);
  } catch (err: any) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
