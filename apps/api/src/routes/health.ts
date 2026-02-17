import { healthResponseSchema } from "@packages/contracts";
import { Hono } from "hono";

import { jsonSuccess } from "../lib/http.js";

const healthRouter = new Hono();

healthRouter.get("/", (c) => {
  return jsonSuccess(c, healthResponseSchema, {
    ok: true,
    service: "api",
  });
});

export { healthRouter };
