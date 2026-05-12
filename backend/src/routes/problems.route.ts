import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import {
  createProblemController,
  getAllProblemsController,
  getCountProblemsController,
  getProblemByIdController,
} from "../controllers/problem.controller.js";

const problemRoutes = Router();

problemRoutes.get("/count", getCountProblemsController);

problemRoutes.get("/", protectRoute, getAllProblemsController);
problemRoutes.post("/", protectRoute, createProblemController);
problemRoutes.get("/:id", protectRoute, getProblemByIdController);

export default problemRoutes;
