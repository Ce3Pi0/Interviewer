import { z } from "zod";

export const executeCodeSchema = z.object({
  language: z.enum(["javascript", "python", "java"]),
  code: z.string().min(1, "Code is required"),
});
