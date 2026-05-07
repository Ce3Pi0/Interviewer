import { HTTP_CODES } from "../config/httpCodes.config.js";
import { THttpError } from "../types/httpError.type.js";

export const HTTP_OK: THttpError = {
  code: HTTP_CODES.OK,
  msg: "OK",
};

export const HTTP_UNAUTHORIZED: THttpError = {
  code: HTTP_CODES.UNAUTHORIZED,
  msg: "UNAUTHORIZED",
};

export const HTTP_NOT_FOUND: THttpError = {
  code: HTTP_CODES.NOT_FOUND,
  msg: "NOT FOUND",
};
export const HTTP_INTERNAL_SERVER_ERROR: THttpError = {
  code: HTTP_CODES.INTERNAL_SERVER_ERROR,
  msg: "INTERNAL SERVER ERROR",
};
