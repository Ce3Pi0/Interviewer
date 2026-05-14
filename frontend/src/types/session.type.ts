import type { TDifficulty } from "./problems.types";
import type { TUser } from "./user.types";

export type TReturnSessions = {
  sessions: TSession[];
};

export type TReturnSession = {
  session: TSession;
};

export type TStreamToken = {
  token: string;
  userId: string;
  userName: string;
  userImage: string;
};

export type TSendSession = {
  problem: string;
  difficulty: TDifficulty;
};

export type TSessionStatus = "active" | "completed";

export type TSession = {
  _id: string;
  problem: string;
  difficulty: TDifficulty;
  host: TUser;
  participant?: TUser | null;
  status: TSessionStatus;
  callId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TStreamUser = {
  id: string;
  name: string;
  image: string;
};
