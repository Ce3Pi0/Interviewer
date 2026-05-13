export type Language = "javascript" | "python" | "java";

export type StatusCodes =
  | "completed"
  | "wrong_answer"
  | "error"
  | "timeout"
  | "memory_exceeded";

type ExitCodes = 0 | -1;

export type RapidAPIResponse = {
  status: StatusCodes;
  stdout: string;
  stderr: string;
  exit_code: ExitCodes;
};
