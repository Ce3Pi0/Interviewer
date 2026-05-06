import path from "path";
import express from "express";
import { ENV } from "./config/env.config.js";
import { HTTP_CODES } from "./config/httpCodes.config.js";
import { connectToDb } from "./config/db.js";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(HTTP_CODES.OK).json({ msg: "API is healthy" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    if (!ENV.DB_URL)
      throw new Error("DB_URL is not defined in environment variables");

    await connectToDb();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (err: any) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

startServer();
