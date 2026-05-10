import { Router } from "express";
import {
  createSessionController,
  endSessionController,
  getActiveSessionsController,
  getMyRecentSessionsController,
  getSessionByIdController,
  joinSessionController,
} from "../controllers/session.controller.js";

const sessionRoutes = Router();

sessionRoutes.post("/", createSessionController);
sessionRoutes.get("/active", getActiveSessionsController);
sessionRoutes.get("/my-recent", getMyRecentSessionsController);
sessionRoutes.get("/:id", getSessionByIdController);
sessionRoutes.post("/:id/join", joinSessionController);
sessionRoutes.post("/:id/end", endSessionController);

export default sessionRoutes;
