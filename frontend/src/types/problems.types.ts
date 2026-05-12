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

export const LANGUAGES = ["javascript", "python", "java"] as const;
export type Language = (typeof LANGUAGES)[number];
export const LANG_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
};
