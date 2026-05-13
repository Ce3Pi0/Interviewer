export type TExecuteCode =
  | {
      success: true;
      output: string;
    }
  | { success: false; error: string; output?: string };
