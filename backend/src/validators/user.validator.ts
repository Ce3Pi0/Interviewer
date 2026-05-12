import z from "../config/zod.config.js";

export const updateUserTypeSchema = z.object({
  userType: z.enum(["interviewer", "interviewee"]),
});

export type UpdateUserTypeSchema = z.infer<typeof updateUserTypeSchema>;
