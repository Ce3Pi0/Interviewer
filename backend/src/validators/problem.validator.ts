import { z } from "zod";

export const problemIdParamsSchema = z.object({
  id: z.string().min(1, "Problem id not provided"),
});

const exampleSchema = z.object({
  input: z.string().min(1, "Example input is required"),
  output: z.string().min(1, "Example output is required"),
  explanation: z.string().optional(),
});

const codeSchema = z.object({
  javascript: z.string().min(1, "JavaScript starter code is required"),
  python: z.string().min(1, "Python starter code is required"),
  java: z.string().min(1, "Java starter code is required"),
});

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.string().optional().default("Programming Problems"),
  description: z.object({
    text: z.string().min(1, "Description text is required"),
    notes: z.array(z.string()).optional().default([]),
  }),
  examples: z.array(exampleSchema).optional().default([]),
  constraints: z.array(z.string()).optional().default([]),
  starterCode: codeSchema,
  expectedOutput: codeSchema,
});

export type CreateProblemSchemaType = z.infer<typeof createProblemSchema>;
