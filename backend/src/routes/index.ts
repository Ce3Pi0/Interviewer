import { Router } from "express";
import serverStatusRoutes from "./server.route.js";
import chatRoutes from "./chat.route.js";
import sessionRoutes from "./session.route.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import userRoutes from "./user.routes.js";
import problemRoutes from "./problems.route.js";

const router = Router();
router.use("/server", serverStatusRoutes);
router.use("/user", userRoutes);
router.use("/session", sessionRoutes);
router.use("/problem", problemRoutes);

router.use("/chat", protectRoute, chatRoutes);

export default router;
