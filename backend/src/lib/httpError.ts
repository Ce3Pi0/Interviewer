import { HTTP_CODES } from "../config/httpCodes.config.js";
import { THttpError } from "../types/httpError.type.js";

export const HTTP_OK: THttpError = {
  code: HTTP_CODES.OK,
  message: "OK",
};

export const HTTP_CREATED: THttpError = {
  code: HTTP_CODES.CREATED,
  message: "CREATED",
};

export const HTTP_BAD_REQUEST: THttpError = {
  code: HTTP_CODES.BAD_REQUEST,
  message: "BAD_REQUEST",
};

export const HTTP_UNAUTHORIZED: THttpError = {
  code: HTTP_CODES.UNAUTHORIZED,
  message: "UNAUTHORIZED",
};

export const HTTP_FORBIDDEN: THttpError = {
  code: HTTP_CODES.FORBIDDEN,
  message: "FORBIDDEN",
};

export const HTTP_NOT_FOUND: THttpError = {
  code: HTTP_CODES.NOT_FOUND,
  message: "NOT FOUND",
};

export const HTTP_NOT_ALLOWED: THttpError = {
  code: HTTP_CODES.NOT_ALLOWED,
  message: "NOT ALLOWED",
};

export const HTTP_CONFLICT: THttpError = {
  code: HTTP_CODES.CONFLICT,
  message: "CONFLICT",
};

export const HTTP_INTERNAL_SERVER_ERROR: THttpError = {
  code: HTTP_CODES.INTERNAL_SERVER_ERROR,
  message: "INTERNAL SERVER ERROR",
};

export const HTTP_NOT_IMPLEMENTED: THttpError = {
  code: HTTP_CODES.NOT_IMPLEMENTED,
  message: "NOT IMPLEMENTED",
};
