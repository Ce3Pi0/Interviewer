import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  countUsersService,
  selectUserTypeService,
} from "../services/user.service.js";
import { HTTP_OK } from "../lib/httpError.js";
import { updateUserTypeSchema } from "../validators/user.validator.js";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    return res.status(HTTP_OK.code).json({ user });
  },
);

export const countUsersController = asyncHandler(
  async (_: Request, res: Response) => {
    const count = await countUsersService();

    return res.status(HTTP_OK.code).json({ count });
  },
);

export const selectUserTypeController = asyncHandler(
  async (req: Request, res: Response) => {
    const currentUserId = req.user!._id!;
    const { userType } = updateUserTypeSchema.parse(req.body);

    const user = await selectUserTypeService(currentUserId, userType);

    return res.status(HTTP_OK.code).json({ user });
  },
);
