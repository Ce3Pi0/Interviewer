import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { createSessionSchema } from "../validators/session.validator.js";
import { HTTP_CREATED } from "../lib/httpError.js";
import { createSessionService } from "../services/session.service.js";

export const createSessionController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createSessionSchema.parse(req.body);

    const userId = req.user!._id;
    const clerkId = req.user!.clerkId;

    const callId = createSessionService(userId, clerkId, body);

    res.status(HTTP_CREATED.code).json({ msg: "Session created", callId });
  },
);

export const getActiveSessionsController = asyncHandler(
  async (req: Request, res: Response) => {},
);

export const getMyRecentSessionsController = asyncHandler(
  async (req: Request, res: Response) => {},
);

export const getSessionByIdController = asyncHandler(
  async (req: Request, res: Response) => {},
);

export const joinSessionController = asyncHandler(
  async (req: Request, res: Response) => {},
);

export const endSessionController = asyncHandler(
  async (req: Request, res: Response) => {},
);
