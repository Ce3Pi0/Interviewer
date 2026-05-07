import mongoose from "mongoose";

import { ENV } from "./env.config.js";

export const connectToDb = async () => {
  if (!ENV.DB_URL)
    throw new Error("DB_URL is not defined in environment variables");

  const db = await mongoose.connect(ENV.DB_URL);
  console.log("Connected to MongoDB successfully!", db.connection.host);
};
