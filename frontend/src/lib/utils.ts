import jsIcon from "../assets/javascript.png";
import pyIcon from "../assets/python.png";
import javaIcon from "../assets/java.png";
import type { TCreateProblem } from "../types/problems.types";

export const getDifficultyBadgeClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export const getDifficultyTextColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-success";
    case "medium":
      return "text-warning";
    case "hard":
      return "text-error";
    default:
      return "text-ghost";
  }
};

export const getUserTypeBadgeClass = (type: string) => {
  switch (type.toLowerCase()) {
    case "interviewer":
      return "from-info";
    case "interviewee":
      return "from-warning";
    default:
      return "from-primary";
  }
};

export const getCorrectStatData = (
  stat: "users" | "sessions" | "problems",
  usersCount: number | null,
  sessionsCount: number | null,
  problemsCount: number | null,
) => {
  switch (stat) {
    case "users":
      return usersCount;
    case "sessions":
      return sessionsCount;
    case "problems":
      return problemsCount;
    default:
      return 0;
  }
};

export const getCorrectStatLoading = (
  stat: "users" | "sessions" | "problems",
  usersCountLoading: boolean,
  sessionsCountLoading: boolean,
  problemsCountLoading: boolean,
) => {
  switch (stat) {
    case "users":
      return usersCountLoading;
    case "sessions":
      return sessionsCountLoading;
    case "problems":
      return problemsCountLoading;
    default:
      return false;
  }
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Updating field in the form for creating new problems
export const updateField = <K extends keyof TCreateProblem>(
  key: K,
  value: TCreateProblem[K],
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>,
) => setFormData((prev) => ({ ...prev, [key]: value }));

export const initialFormData: TCreateProblem = {
  title: "",
  difficulty: "easy",
  category: "",
  description: {
    text: "",
    notes: [""],
  },
  examples: [],
  constraints: [""],
  starterCode: {
    javascript: "",
    python: "",
    java: "",
  },
  expectedOutput: {
    javascript: "",
    python: "",
    java: "",
  },
};

export const LANGUAGE_CONFIG = {
  javascript: { name: "JavaScript", icon: jsIcon, monacoLang: "javascript" },
  python: { name: "Python", icon: pyIcon, monacoLang: "python" },
  java: { name: "Java", icon: javaIcon, monacoLang: "java" },
};

export const normalizeOutput = (output?: string) => {
  return output
    ?.trim()
    .split("\n")
    .flatMap((line) => {
      const normalized = line
        .trim()
        .replace(/\[\s+/g, "[")
        .replace(/\s+\]/g, "]")
        .replace(/\s*,\s*/g, ",");
      const matches = normalized.match(/\[[^\]]*\]/g);
      if (matches && matches.length > 1) return matches;
      return [normalized];
    })
    .filter((line) => line.length > 0)
    .join("\n");
};

export const getFirstName = (fullName?: string) => {
  if (!fullName?.trim()) return "Unknown";
  return fullName.trim().split(" ").at(0);
};
