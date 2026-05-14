import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { User, IUserDocument } from "../models/User.model.js";
import { HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } from "../lib/httpError.js";
import { HttpError } from "../config/httpError.config.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = getAuth(req);

  if (!userId)
    throw new HttpError(HTTP_UNAUTHORIZED.message, HTTP_UNAUTHORIZED.code);

  const user: IUserDocument | null = await User.findOne({
    clerkId: userId,
  });

  if (!user) throw new HttpError("User not found", HTTP_NOT_FOUND.code);

  req.user = user;

  next();
};
