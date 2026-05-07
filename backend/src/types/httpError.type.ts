import { HTTP_CODES } from "../config/httpCodes.config.js";

export type THttpError = {
  code: HTTP_CODES;
  msg: string;
};
