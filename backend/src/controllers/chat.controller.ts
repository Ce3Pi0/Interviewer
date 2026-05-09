import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { HTTP_OK } from "../lib/httpError.js";
import { getStreamTokenService } from "../services/chat.service.js";

export const getStreamTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const clerkId = req.user!.clerkId;

    const token = getStreamTokenService(clerkId);

    return res.status(HTTP_OK.code).json({
      token,
      userId: req.user!.clerkId,
      userName: req.user!.name,
      userImage: req.user!.profileImage,
    });
  },
);
