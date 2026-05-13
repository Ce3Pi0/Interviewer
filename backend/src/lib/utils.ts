import { ENV } from "../config/env.config.js";
import { HttpError } from "../config/httpError.config.js";
import { Language, StatusCodes } from "../types/code.types.js";
import { HTTP_CONFLICT } from "./httpError.js";

export const checkStreamEnvVars = (): void => {
  if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
  }
};

export const checkRapidApiEnvVars = (): void => {
  if (!ENV.RAPIDAPI_HOST || !ENV.RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_HOST or RAPIDAPI_KEY is missing");
  }
};

export const LANGUAGE_MAP: Record<Language, string> = {
  javascript: "javascript",
  python: "python3",
  java: "java",
};

export const enum EXIT_CODES {
  SUCCESS = 0,
  FAIL = -1,
}

export const getErrMessage = (status: StatusCodes, stderr: string) => {
  switch (status) {
    case "completed":
      throw new HttpError(
        "getErrMessage called with completed status",
        HTTP_CONFLICT.code,
      );
    case "wrong_answer":
      return stderr || "Wrong Answer";
    case "memory_exceeded":
      return stderr || "Memory Exceeded";
    case "timeout":
      return stderr || "Execution timed out";
    case "error":
      return stderr || "Error";
    default:
      console.warn(`Unknown status code from RapidAPI: ${status}`);
      return stderr || "Unknown Error";
  }
};
