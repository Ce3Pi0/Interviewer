import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { executeCodeService } from "../services/execute.service.js";
import { executeCodeSchema } from "../validators/execute.validator.js";
import { HTTP_OK } from "../lib/httpError.js";

export const executeCodeController = asyncHandler(
  async (req: Request, res: Response) => {
    const { language, code } = executeCodeSchema.parse(req.body);
    const result = await executeCodeService(language, code);
    return res.status(HTTP_OK.code).json(result);
  },
);
