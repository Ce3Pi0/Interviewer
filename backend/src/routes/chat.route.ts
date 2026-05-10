import { Router } from "express";
import { getStreamTokenController } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const chatRoutes = Router();

chatRoutes.get("/token", getStreamTokenController);

export default chatRoutes;
