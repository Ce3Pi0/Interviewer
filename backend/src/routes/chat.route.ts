import { Router } from "express";
import { getStreamTokenController } from "../controllers/chat.controller.js";

const chatRoutes = Router();

chatRoutes.get("/token", getStreamTokenController);

export default chatRoutes;
