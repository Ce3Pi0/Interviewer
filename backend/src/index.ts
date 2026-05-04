import express from "express";
import { ENV } from "./config/env.config";
import { HTTP_CODES } from "./config/httpCodes.config";

const app = express();

app.get("/health", (req, res) => {
  res.status(HTTP_CODES.OK).json({ msg: "API is healthy" });
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
