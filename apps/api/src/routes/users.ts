import { usersMeResponseSchema } from "@packages/contracts";
import { Hono } from "hono";

import { jsonSuccess } from "../lib/http.js";

const usersRouter = new Hono();

usersRouter.get("/me", (c) => {
  return jsonSuccess(c, usersMeResponseSchema, {
    user: null,
  });
});

export { usersRouter };
