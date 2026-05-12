import { Router } from "express";
import {
  createSessionController,
  endSessionController,
  getActiveSessionsController,
  getCountSessionsController,
  getMyRecentSessionsController,
  getSessionByIdController,
  joinSessionController,
} from "../controllers/session.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const sessionRoutes = Router();

sessionRoutes.get("/count", getCountSessionsController);

sessionRoutes.post("/", protectRoute, createSessionController);
sessionRoutes.get("/active", protectRoute, getActiveSessionsController);
sessionRoutes.get("/my-recent", protectRoute, getMyRecentSessionsController);
sessionRoutes.get("/:id", protectRoute, getSessionByIdController);
sessionRoutes.post("/:id/join", protectRoute, joinSessionController);
sessionRoutes.post("/:id/end", protectRoute, endSessionController);

export default sessionRoutes;
