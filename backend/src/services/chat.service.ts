import { chatClient } from "../config/stream.config.js";

export const getStreamTokenService = (clerkId: string) => {
  return chatClient().createToken(clerkId);
};
