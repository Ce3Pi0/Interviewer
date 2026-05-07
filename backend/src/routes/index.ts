import { Router } from "express";
import serverStatusRoutes from "./server.route.js";

const router = Router();
router.use("/server", serverStatusRoutes);

export default router;
