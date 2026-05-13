import { axiosInstance } from "../lib/axios";
import type {
  TReturnSession,
  TReturnSessions,
  TSession,
} from "../types/session.type";

interface SessionState {
  createSession: (data: TSession) => Promise<TReturnSession>;
  getActiveSessions: () => Promise<TReturnSessions>;
  getMyRecentSessions: () => Promise<TReturnSessions>;
  getSessionById: (id: string) => Promise<TReturnSession>;
  joinSession: (id: string) => Promise<TReturnSession>;
  endSession: (id: string) => Promise<TReturnSession>;
  getStreamToken: () => Promise<string>;
}
export const sessionApi: SessionState = {
  createSession: async (data) => {
    const res = await axiosInstance.post("/session", data);
    return res.data;
  },
  getActiveSessions: async () => {
    const res = await axiosInstance.get("/session/active");
    return res.data;
  },
  getMyRecentSessions: async () => {
    const res = await axiosInstance.get("/session/my-recent");
    return res.data;
  },
  getSessionById: async (id) => {
    const res = await axiosInstance.get(`/session/${id}`);
    return res.data;
  },
  joinSession: async (id) => {
    const res = await axiosInstance.post(`/session/${id}/join`);
    return res.data;
  },
  endSession: async (id) => {
    const res = await axiosInstance.post(`/session/${id}/end`);
    return res.data;
  },

  getStreamToken: async () => {
    const res = await axiosInstance.get("/chat/token");
    return res.data;
  },
};
