import { StreamVideoClient } from "@stream-io/video-react-sdk";
import type { TStreamUser } from "../types/session.type";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client: StreamVideoClient | null = null;

export const initializeClient = async (user: TStreamUser, token: string) => {
  if (client && client?.state.connectedUser?.id === user.id) return client;

  if (client) await client.disconnectUser();

  if (!apiKey) throw new Error("Client API key not provided");

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) return;
  try {
    await client.disconnectUser();
    client = null;
  } catch (err: unknown) {
    console.error("Error disconnecting Stream Client: ", err);
  }
};
