import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
});
export type User = z.infer<typeof userSchema>;

export const usersMeResponseSchema = z.object({
  user: userSchema.nullable(),
});
export type UsersMeResponse = z.infer<typeof usersMeResponseSchema>;
