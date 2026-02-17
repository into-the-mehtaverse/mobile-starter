import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  authCheckEmailRequestSchema,
  authCheckEmailResponseSchema,
  healthResponseSchema,
} from "@packages/contracts";

const app = new Hono();

app.get("/health", (c) => {
  const payload = healthResponseSchema.parse({
    ok: true,
    service: "api",
  });
  return c.json(payload);
});

app.post("/auth/check-email", async (c) => {
  const json = await c.req.json().catch(() => null);
  const input = authCheckEmailRequestSchema.safeParse(json);

  if (!input.success) {
    return c.json(
      {
        ok: false,
        error: "Invalid request body",
      },
      400
    );
  }

  // Placeholder behavior until user persistence is wired in.
  const response = authCheckEmailResponseSchema.parse({
    email: input.data.email,
    available: true,
  });

  return c.json(response);
});

const port = Number(process.env.PORT ?? 3001);

serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`API listening on http://localhost:${port}`);
  }
);
