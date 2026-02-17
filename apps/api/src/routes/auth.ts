import {
  authCheckEmailRequestSchema,
  authCheckEmailResponseSchema,
} from "@packages/contracts";
import { db } from "@packages/db";
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

  const existingUser = await db.query.usersTable.findFirst({
    columns: { id: true },
    where: (users, { eq }) => eq(users.email, input.data.email),
  });

  return jsonSuccess(c, authCheckEmailResponseSchema, {
    email: input.data.email,
    available: !existingUser,
  });
});

export { authRouter };
