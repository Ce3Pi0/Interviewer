import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

interface StatsState {
  usersCount: number | null;
  sessionsCount: number | null;
  problemsCount: number | null;
  usersCountLoading: boolean;
  sessionsCountLoading: boolean;
  problemsCountLoading: boolean;

  fetchCount: (
    endpoint: string,
    statKey: "usersCount" | "sessionsCount" | "problemsCount",
    loadingKey:
      | "usersCountLoading"
      | "sessionsCountLoading"
      | "problemsCountLoading",
    errorLabel: string,
  ) => Promise<void>;

  fetchUsersCount: () => Promise<void>;
  fetchSessionsCount: () => Promise<void>;
  fetchProblemsCount: () => Promise<void>;
}

interface CountResponse {
  count: number;
}

export const statsStore = create<StatsState>()((set, get) => ({
  usersCount: null,
  sessionsCount: null,
  problemsCount: null,

  usersCountLoading: false,
  sessionsCountLoading: false,
  problemsCountLoading: false,

  fetchCount: async (
    endpoint: string,
    statKey: "usersCount" | "sessionsCount" | "problemsCount",
    loadingKey:
      | "usersCountLoading"
      | "sessionsCountLoading"
      | "problemsCountLoading",
    errorLabel: string,
  ) => {
    set({ [loadingKey]: true });
    try {
      const res = await axiosInstance.get<CountResponse>(endpoint);
      set({ [statKey]: res.data.count });
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || `${errorLabel} count error`,
      );
    } finally {
      set({ [loadingKey]: false });
    }
  },

  fetchUsersCount: async () => {
    return get().fetchCount(
      "/user/count",
      "usersCount",
      "usersCountLoading",
      "User",
    );
  },
  fetchSessionsCount: async () => {
    return get().fetchCount(
      "/session/count",
      "sessionsCount",
      "sessionsCountLoading",
      "Session",
    );
  },
  fetchProblemsCount: async () => {
    return get().fetchCount(
      "/problem/count",
      "problemsCount",
      "problemsCountLoading",
      "Problem",
    );
  },
}));
