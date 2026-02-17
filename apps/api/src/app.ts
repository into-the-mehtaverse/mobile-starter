import { Hono } from "hono";
import { logger } from "hono/logger";

import { jsonError } from "./lib/http.js";
import { v1Router } from "./routes/index.js";

const app = new Hono();

app.use("*", logger());

app.route("/v1", v1Router);

app.notFound((c) => {
  return jsonError(c, {
    code: "not_found",
    message: "Route not found",
    status: 404,
  });
});

app.onError((error, c) => {
  console.error("Unhandled API error", error);
  return jsonError(c, {
    code: "internal_error",
    message: "Unexpected server error",
    status: 500,
  });
});

export { app };
