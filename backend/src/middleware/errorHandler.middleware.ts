import { ErrorRequestHandler } from "express";
import { HttpError } from "../config/httpError.config.js";
import { HTTP_INTERNAL_SERVER_ERROR } from "../lib/httpError.js";

export const errorHandler: ErrorRequestHandler = (
  err: HttpError | Error,
  req,
  res,
  _,
) => {
  console.error(`Error occurred: ${req.path}`, err);

  if (err instanceof HttpError)
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status });

  return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
    message: HTTP_INTERNAL_SERVER_ERROR.message,
    status: HTTP_INTERNAL_SERVER_ERROR.code,
  });
};
