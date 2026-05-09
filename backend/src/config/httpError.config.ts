import { HTTP_CODES } from "./httpCodes.config.js";

export class HttpError extends Error {
  public status: HTTP_CODES;
  constructor(message: string, status: HTTP_CODES) {
    super(message);
    this.status = status;
  }
}
