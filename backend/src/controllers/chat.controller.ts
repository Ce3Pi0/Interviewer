import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { chatClient } from "../config/stream.config.js";
import { HTTP_OK } from "../lib/httpError.js";

export const getStreamTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = chatClient().createToken(req.user!.clerkId);

    return res.status(HTTP_OK.code).json({
      token,
      userId: req.user!.clerkId,
      userName: req.user!.name,
      userImage: req.user!.profileImage,
    });
  },
);
