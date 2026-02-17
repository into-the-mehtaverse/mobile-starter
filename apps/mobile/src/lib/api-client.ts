import {
  apiErrorResponseSchema,
  apiSuccessSchema,
  authCheckEmailRequestSchema,
  authCheckEmailResponseSchema,
  healthResponseSchema,
  type AuthCheckEmailResponse,
  type HealthResponse,
} from "@packages/contracts";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";
const API_VERSION = "v1";
const API_V1_BASE_URL = `${API_BASE_URL}/${API_VERSION}`;

async function readApiError(response: Response): Promise<Error> {
  const parsed = apiErrorResponseSchema.safeParse(await response.json());
  if (parsed.success) {
    return new Error(parsed.data.error.message);
  }

  return new Error(`Request failed with status ${response.status}`);
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_V1_BASE_URL}/health`);

  if (!response.ok) {
    throw await readApiError(response);
  }

  const parsed = apiSuccessSchema(healthResponseSchema).parse(
    await response.json()
  );
  return parsed.data;
}

export async function checkEmailAvailability(
  email: string
): Promise<AuthCheckEmailResponse> {
  const payload = authCheckEmailRequestSchema.parse({ email });
  const response = await fetch(`${API_V1_BASE_URL}/auth/check-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await readApiError(response);
  }

  const parsed = apiSuccessSchema(authCheckEmailResponseSchema).parse(
    await response.json()
  );
  return parsed.data;
}
