import { Express } from "express";
import { connectToDb } from "../config/db.config.js";
import { ENV } from "../config/env.config.js";

export const startServer = async (app: Express) => {
  try {
    await connectToDb();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (err: any) {
    console.error("Error starting the server:", err);
  }
};
