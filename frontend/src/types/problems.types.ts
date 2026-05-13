export type TDifficulty = "easy" | "medium" | "hard";

type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type TCreateProblem = {
  title: string;
  difficulty: TDifficulty;
  category?: string;
  description: {
    text: string;
    notes: string[];
  };
  examples: Example[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  expectedOutput: {
    javascript: string;
    python: string;
    java: string;
  };
};
export type TProblem = TCreateProblem & { _id: string };

export const LANGUAGE_TO_EXTENSION = {
  javascript: "js",
  python: "py",
  java: "java",
} as const;

export type Language = keyof typeof LANGUAGE_TO_EXTENSION;
export type Extensions = (typeof LANGUAGE_TO_EXTENSION)[Language];
export const LANGUAGES = Object.keys(LANGUAGE_TO_EXTENSION) as Language[];
export const EXTENSIONS = Object.values(LANGUAGE_TO_EXTENSION);
export const LANG_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
};
