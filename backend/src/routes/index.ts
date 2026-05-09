import { Router } from "express";
import serverStatusRoutes from "./server.route.js";
import chatRoutes from "./chat.route.js";

const router = Router();
router.use("/server", serverStatusRoutes);
router.use("/chat", chatRoutes);

export default router;
