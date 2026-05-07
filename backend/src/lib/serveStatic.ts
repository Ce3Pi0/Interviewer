import express, { Express } from "express";
import { ENV } from "../config/env.config.js";
import path from "path";

export const serveStatic = (app: Express) => {
  const __dirname = path.resolve();

  if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
  }
};
