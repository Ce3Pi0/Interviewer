import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { TCreateProblem, TProblem } from "../types/problems.types";

interface ProblemsState {
  problems: TProblem[] | null;
  problemsLoading: boolean;
  createProblemLoading: boolean;

  fetchProblems: () => Promise<void>;
  createProblem: (problem: TCreateProblem) => Promise<boolean>;
}

export const problemsStore = create<ProblemsState>()((set, get) => ({
  problems: null,
  problemsLoading: false,
  createProblemLoading: false,

  fetchProblems: async () => {
    set({ problemsLoading: true });
    try {
      const res = await axiosInstance.get("/problem/");
      set({ problems: res.data.problems });
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Problem fetching error",
      );
    } finally {
      set({ problemsLoading: false });
    }
  },
  createProblem: async (problem) => {
    set({ createProblemLoading: true });
    try {
      const res = await axiosInstance.post("/problem/", problem);
      toast.success("Problem created successfully!");

      set({ problems: [...(get().problems || []), res.data.problem] });
      return true;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Problem creation error",
      );
      return false;
    } finally {
      set({ createProblemLoading: false });
    }
  },
}));
