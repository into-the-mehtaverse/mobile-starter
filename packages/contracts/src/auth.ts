import { z } from "zod";

export const emailSchema = z.email().trim().toLowerCase();

export const authCheckEmailRequestSchema = z.object({
  email: emailSchema,
});
export type AuthCheckEmailRequest = z.infer<typeof authCheckEmailRequestSchema>;

export const authCheckEmailResponseSchema = z.object({
  email: emailSchema,
  available: z.boolean(),
});
export type AuthCheckEmailResponse = z.infer<typeof authCheckEmailResponseSchema>;
