import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  createSessionSchema,
  sessionIdParamsSchema,
} from "../validators/session.validator.js";
import { HTTP_CREATED, HTTP_OK } from "../lib/httpError.js";
import {
  getCountSessionsService,
  createSessionService,
  endSessionService,
  getActiveSessionsService,
  getMyRecentSessionsService,
  getSessionByIdService,
  joinSessionService,
} from "../services/session.service.js";

export const createSessionController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createSessionSchema.parse(req.body);

    const userId = req.user!._id!.toString();
    const clerkId = req.user!.clerkId;

    const session = await createSessionService(userId, clerkId, body);

    return res
      .status(HTTP_CREATED.code)
      .json({ msg: "Session created", session });
  },
);

export const getCountSessionsController = asyncHandler(
  async (_: Request, res: Response) => {
    const count = await getCountSessionsService();
    return res.status(HTTP_OK.code).json({ count });
  },
);

export const getActiveSessionsController = asyncHandler(
  async (_: Request, res: Response) => {
    const sessions = await getActiveSessionsService();

    return res.status(HTTP_OK.code).json({
      sessions,
    });
  },
);

export const getMyRecentSessionsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id!.toString()!;

    const sessions = await getMyRecentSessionsService(userId);

    return res.status(HTTP_OK.code).json({ sessions });
  },
);

export const getSessionByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = sessionIdParamsSchema.parse(req.params);

    const session = await getSessionByIdService(id.toString());

    return res.status(HTTP_OK.code).json({ session });
  },
);

export const joinSessionController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = sessionIdParamsSchema.parse(req.params);

    const userId = req.user!._id!;
    const clerkId = req.user!.clerkId;

    const session = await joinSessionService(id.toString(), userId, clerkId);

    return res.status(HTTP_OK.code).json({ session });
  },
);

export const endSessionController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = sessionIdParamsSchema.parse(req.params);

    const userId = req.user!._id!;
    const clerkId = req.user!.clerkId;

    const session = await endSessionService(id.toString(), userId, clerkId);

    return res
      .status(HTTP_OK.code)
      .json({ session, message: "Session ended successfully!" });
  },
);
