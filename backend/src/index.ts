import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.config.js";
import { inngest, functions } from "./config/inngest.config.js";
import { startServer } from "./lib/startServer.js";
import { serveStatic } from "./lib/serveStatic.js";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { middleware404 } from "./middleware/404.middleware.js";
import {
  rateLimiter,
  rateSlowDown,
} from "./middleware/rateLimiter.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(`${ENV.API_SUB_DOMAIN}/inngest`, serve({ client: inngest, functions }));
app.use(clerkMiddleware()); // This adds auth field to req - req.auth()

// Rate limiters
app.use(`${ENV.API_SUB_DOMAIN}`, rateLimiter);
app.use(`${ENV.API_SUB_DOMAIN}`, rateSlowDown);

app.use(`${ENV.API_SUB_DOMAIN}`, router);
// Throw not found for non-existent routes
app.use(`${ENV.API_SUB_DOMAIN}/{*any}`, middleware404);

serveStatic(app);

//Custom Express Error Handling (Goes after everything)
app.use(errorHandler);

await startServer(app);
