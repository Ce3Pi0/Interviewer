import { Router } from "express";
import serverStatusRoutes from "./server.route.js";
import chatRoutes from "./chat.route.js";
import sessionRoutes from "./session.route.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = Router();
router.use("/server", serverStatusRoutes);
router.use("/chat", protectRoute, chatRoutes);
router.use("/session", protectRoute, sessionRoutes);

export default router;
