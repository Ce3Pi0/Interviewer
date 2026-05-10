import { ENV } from "../config/env.config.js";

export const checkStreamEnvVars = (): void => {
  if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
  }
};
