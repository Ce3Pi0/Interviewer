import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.config.js";
import { inngest, functions } from "./config/inngest.config.js";
import { startServer } from "./lib/startServer.js";
import { serveStatic } from "./lib/serveStatic.js";
import router from "./routes/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(`${ENV.API_SUB_DOMAIN}/inngest`, serve({ client: inngest, functions }));
app.use(clerkMiddleware()); // This adds auth field to req - req.auth()
app.use(`${ENV.API_SUB_DOMAIN}`, router);

serveStatic(app);

await startServer(app);
