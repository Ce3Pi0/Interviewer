import z from "../config/zod.config.js";

export const createSessionSchema = z.object({
  problem: z.string().trim().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

export const sessionIdParamsSchema = z.object({
  id: z.string().min(1, "Session id not provided"),
});

export type CreateSessionSchemaType = z.infer<typeof createSessionSchema>;
