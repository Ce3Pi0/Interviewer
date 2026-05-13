import { ENV } from "../config/env.config.js";
import { HttpError } from "../config/httpError.config.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_CONTENT_TOO_LARGE,
} from "../lib/httpError.js";
import { EXIT_CODES, getErrMessage, LANGUAGE_MAP } from "../lib/utils.js";
import { Language, RapidAPIResponse } from "../types/code.types.js";

const MAX_FILE_SIZE = 100000; // 100KB

export const executeCodeService = async (language: Language, code: string) => {
  if (!code || !code.trim()) {
    throw new HttpError("Code cannot be empty", HTTP_BAD_REQUEST.code);
  }
  if (code.length > MAX_FILE_SIZE) {
    throw new HttpError(
      "Code exceeds maximum size",
      HTTP_CONTENT_TOO_LARGE.code,
    );
  }
  const languageId = LANGUAGE_MAP[language];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(`https://${ENV.RAPIDAPI_HOST!}/v1/execute`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": ENV.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": ENV.RAPIDAPI_HOST!,
    },
    body: JSON.stringify({
      language: languageId,
      code,
    }),
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const errorBody = await response
      .text()
      .catch(() => "Unable to read response");
    throw new HttpError(
      `SandboxAPI error: ${response.status} - ${errorBody}`,
      HTTP_INTERNAL_SERVER_ERROR.code,
    );
  }

  let result: RapidAPIResponse;
  try {
    result = await response.json();
  } catch (error) {
    throw new HttpError(
      `Failed to parse SandboxAPI response: ${error instanceof Error ? error.message : "Unknown error"}`,
      HTTP_INTERNAL_SERVER_ERROR.code,
    );
  }

  const { status, stdout, stderr, exit_code } = result;

  if (status === "completed" && exit_code === EXIT_CODES.SUCCESS) {
    return { success: true as const, output: stdout || "No output" };
  }

  const errorMsg = getErrMessage(status, stderr);

  return {
    success: false as const,
    error: errorMsg,
    output: stdout || "No output",
  };
};
