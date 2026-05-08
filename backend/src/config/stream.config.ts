import { StreamChat, UserResponse } from "stream-chat";
import { ENV } from "./env.config.js";

export const chatClient = () => {
  if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
  }

  return StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);
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

// TODO: Add another method to generate token
