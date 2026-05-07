import { Router, Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { HTTP_OK } from "../lib/httpError.js";

const serverStatusRoutes = Router().get(
  "/health",
  asyncHandler(async (_: Request, res: Response) => {
    res.status(HTTP_OK.code).json({
      msg: "Server is running",
      status: HTTP_OK.msg,
    });
  }),
);

export default serverStatusRoutes;
