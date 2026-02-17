import {
  authCheckEmailRequestSchema,
  authCheckEmailResponseSchema,
  healthResponseSchema,
  type AuthCheckEmailResponse,
  type HealthResponse,
} from "@packages/contracts";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`Health request failed with status ${response.status}`);
  }

  return healthResponseSchema.parse(await response.json());
}

export async function checkEmailAvailability(
  email: string
): Promise<AuthCheckEmailResponse> {
  const payload = authCheckEmailRequestSchema.parse({ email });
  const response = await fetch(`${API_BASE_URL}/auth/check-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Check email failed with status ${response.status}`);
  }

  return authCheckEmailResponseSchema.parse(await response.json());
}
