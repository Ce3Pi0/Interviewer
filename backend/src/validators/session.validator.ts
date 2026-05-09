import { z } from "zod";

export const createSessionSchema = z.object({
  problem: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

export type CreateSessionSchemaType = z.infer<typeof createSessionSchema>;
