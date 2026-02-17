import {
  apiErrorResponseSchema,
  apiSuccessSchema,
  type ApiErrorCode,
} from "@packages/contracts";
import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { z } from "zod";

export function jsonSuccess<TSchema extends z.ZodType>(
  c: Context,
  dataSchema: TSchema,
  data: z.infer<TSchema>,
  status: ContentfulStatusCode = 200
) {
  const payload = apiSuccessSchema(dataSchema).parse({
    ok: true,
    data,
  });

  return c.json(payload, status);
}

export function jsonError(
  c: Context,
  {
    code,
    message,
    status,
    details,
  }: {
    code: ApiErrorCode;
    message: string;
    status: ContentfulStatusCode;
    details?: unknown;
  }
) {
  const payload = apiErrorResponseSchema.parse({
    ok: false,
    error: {
      code,
      message,
      details,
    },
  });

  return c.json(payload, status);
}
