import { Hono } from "hono";
import { logger } from "hono/logger";

import { jsonError } from "./lib/http.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { usersRouter } from "./routes/users.js";

const app = new Hono();

app.use("*", logger());

app.route("/health", healthRouter);
app.route("/auth", authRouter);
app.route("/users", usersRouter);

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
