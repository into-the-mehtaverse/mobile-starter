import { Hono } from "hono";

import { authRouter } from "./auth.js";
import { healthRouter } from "./health.js";
import { usersRouter } from "./users.js";

const v1Router = new Hono();

v1Router.route("/health", healthRouter);
v1Router.route("/auth", authRouter);
v1Router.route("/users", usersRouter);

export { v1Router };
