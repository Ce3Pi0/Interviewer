import path from "path";
import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { ENV } from "./config/env.config.js";
import { HTTP_CODES } from "./config/httpCodes.config.js";
import { connectToDb } from "./config/db.config.js";
import { inngest, functions } from "./config/inngest.config.js";

const app = express();

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(`${ENV.API_SUB_DOMAIN}/inngest`, serve({ client: inngest, functions }));

app.get(`${ENV.API_SUB_DOMAIN}/health`, (req, res) => {
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
    await connectToDb();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (err: any) {
    console.error("Error starting the server:", err);
  }
};

startServer();
