import {
  authCheckEmailRequestSchema,
  authCheckEmailResponseSchema,
} from "@packages/contracts";
import { Hono } from "hono";

import { jsonError, jsonSuccess } from "../lib/http.js";

const authRouter = new Hono();

authRouter.post("/check-email", async (c) => {
  const json = await c.req.json().catch(() => null);
  const input = authCheckEmailRequestSchema.safeParse(json);

  if (!input.success) {
    return jsonError(c, {
      code: "invalid_request",
      message: "Invalid request body",
      status: 400,
      details: input.error.issues,
    });
  }

  // Placeholder behavior until user persistence is wired in.
  return jsonSuccess(c, authCheckEmailResponseSchema, {
    email: input.data.email,
    available: true,
  });
});

export { authRouter };
