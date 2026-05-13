import { axiosInstance } from "./axios";
import type { TExecuteCode } from "../types/executeCode.types";
import type { Language } from "../types/problems.types";

export async function executeCode(
  language: Language,
  code: string,
): Promise<TExecuteCode> {
  try {
    const { data } = await axiosInstance.post<TExecuteCode>("/execute", {
      language,
      code,
    });
    return data;
  } catch (error) {
    console.error("Code execution failed:", error);

    if (error instanceof Error) {
      const message = error.message || "Code execution failed";
      return { success: false, error: message };
    }

    return { success: false, error: "Code execution failed" };
  }
}
