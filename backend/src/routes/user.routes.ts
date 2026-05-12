import { Router } from "express";
import {
  countUsersController,
  getCurrentUserController,
  selectUserTypeController,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const userRoutes = Router();

userRoutes.get("/count", countUsersController);

userRoutes.get("/", protectRoute, getCurrentUserController);
userRoutes.post("/type", protectRoute, selectUserTypeController);

export default userRoutes;
