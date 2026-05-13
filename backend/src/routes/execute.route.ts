import { Router } from "express";
import { executeCodeController } from "../controllers/execute.controller.js";

const executeRoutes = Router();

executeRoutes.post("/", executeCodeController);

export default executeRoutes;
