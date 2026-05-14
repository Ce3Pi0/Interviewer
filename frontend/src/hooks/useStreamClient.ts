import { useEffect, useState } from "react";
import { Channel, StreamChat } from "stream-chat";
import type { TSession } from "../types/session.type";
import { sessionApi } from "../api/session";
import { disconnectStreamClient, initializeClient } from "../lib/stream";
import type { Call, StreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useStreamClient = (
  session: TSession | undefined,
  loadingSession: boolean,
  isHost: boolean,
  isParticipant: boolean,
) => {
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(
    null,
  );
  const [call, setCall] = useState<Call | null>(null);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall: Call | null = null;
    let chatClientInstance: StreamChat | null = null;

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status !== "active") return;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        const client = await initializeClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );

        setStreamClient(client);
        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );

        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId,
        );
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (err: unknown) {
        toast.error("Failed to join video call");
        console.error("Error init call: ", err);
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    return () => {
      //iife
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (err: unknown) {
          console.error("Cleanup error: ", err);
        }
      })();
    };
  }, [session?.callId, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
};

export default useStreamClient;
