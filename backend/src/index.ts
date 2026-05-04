import path from "path";
import express from "express";
import { ENV } from "./config/env.config";
import { HTTP_CODES } from "./config/httpCodes.config";

const app = express();

const __dirname = path.resolve();

app.get("/health", (req, res) => {
  res.status(HTTP_CODES.OK).json({ msg: "API is healthy" });
});

// Deployment ready
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
