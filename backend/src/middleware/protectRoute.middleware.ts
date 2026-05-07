import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { User, IUserDocument } from "../models/User.model.js";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
} from "../lib/httpError.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId)
      return res
        .status(HTTP_UNAUTHORIZED.code)
        .json({ msg: HTTP_UNAUTHORIZED.msg });

    const user: IUserDocument | null = await User.findOne({ clerkId: userId });

    if (!user)
      return res.status(HTTP_NOT_FOUND.code).json({ msg: HTTP_NOT_FOUND.msg });

    req.user = user;

    next();
  } catch (err: any) {
    console.error({
      status: HTTP_INTERNAL_SERVER_ERROR.code,
      msg: HTTP_INTERNAL_SERVER_ERROR.msg,
      err,
    });
  }
};
