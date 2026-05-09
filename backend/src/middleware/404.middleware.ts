import { NextFunction, Request, Response } from "express";
import { HttpError } from "../config/httpError.config.js";
import { HTTP_CODES } from "../config/httpCodes.config.js";

export const middleware404 = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(
    new HttpError(
      `Route not found: ${req.method} ${req.path}`,
      HTTP_CODES.NOT_FOUND,
    ),
  );
};
