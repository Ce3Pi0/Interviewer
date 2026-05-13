import type { TDifficulty, TProblem } from "./problems.types";

export type TReturnSessions = {
  sessions: TSession[];
};

export type TReturnSession = {
  session: TSession;
};

export type TSession = {
  _id?: string;
  problem: TProblem;
  difficulty: TDifficulty;
};
