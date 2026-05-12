import type { AxiosError } from "axios";
import { create } from "zustand";
import type { TUser } from "../types/user.types";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface UserState {
  user: TUser | null;
  loading: boolean;

  selectUserType: (userType: "interviewer" | "interviewee") => void;
  fetchUser: () => void;
}

export const userStore = create<UserState>()((set, get) => ({
  user: null,
  loading: false,

  selectUserType: async (userType) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/user/type", { userType });

      set({ user: res.data.user });

      toast.success("User type selected successfully!");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "User type selection error!",
      );
    } finally {
      set({ loading: false });
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/user/");

      set({ user: res.data.user });
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "User fetching error");
    } finally {
      set({ loading: false });
    }
  },
}));
