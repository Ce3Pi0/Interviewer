import { StreamChat, UserResponse } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.config.js";
import { checkStreamEnvVars } from "../lib/utils.js";

// Chat features
export const chatClient = () => {
  checkStreamEnvVars();
  return StreamChat.getInstance(ENV.STREAM_API_KEY!, ENV.STREAM_API_SECRET!);
};

// Video features
export const streamClient = () => {
  checkStreamEnvVars();
  return new StreamClient(ENV.STREAM_API_KEY!, ENV.STREAM_API_SECRET!);
};

export const upsertStreamUser = async (userData: UserResponse) => {
  try {
    await chatClient().upsertUser(userData);
    console.log("Stream user upserted successfully", userData.id);
  } catch (err: unknown) {
    console.error("Error upserting stream user", err);
  }
};

export const deleteStreamUser = async (userId: string) => {
  try {
    await chatClient().deleteUser(userId);
    console.log("Stream user deleted successfully");
  } catch (err: unknown) {
    console.error("Error deleting stream user", err);
  }
};
