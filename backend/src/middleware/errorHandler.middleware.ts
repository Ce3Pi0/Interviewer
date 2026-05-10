import { ErrorRequestHandler } from "express";
import { HttpError } from "../config/httpError.config.js";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_UNPROCESSABLE_ENTITY,
} from "../lib/httpError.js";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

export const errorHandler: ErrorRequestHandler = (
  err: HttpError | Error,
  req,
  res,
  _,
) => {
  console.error(`Error occurred: ${req.path}`, err);

  if (err instanceof ZodError) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY.code).json({
      message: fromError(err).message,
      status: HTTP_UNPROCESSABLE_ENTITY.code,
    });
  }

  if (err instanceof HttpError)
    return res
      .status(err.status)
      .json({ message: err.message, status: err.status });

  return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
    message: HTTP_INTERNAL_SERVER_ERROR.message,
    status: HTTP_INTERNAL_SERVER_ERROR.code,
  });
};
