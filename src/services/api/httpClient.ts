import { API_BASE_URL } from "@/services/api/config";
import { getAccessToken } from "@/services/api/tokenStorage";

type ApiRequestOptions = RequestInit & {
  requiresAuth?: boolean;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    requiresAuth = true,
    headers,
    ...requestOptions
  } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Accept", "application/json");

  if (requiresAuth) {
    const accessToken = await getAccessToken();

    if (accessToken) {
      requestHeaders.set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...requestOptions,
      headers: requestHeaders,
    });
  } catch {
    throw new ApiError(
      "Could not connect to the MangoCare API. Check that the backend is running and the phone is on the same network.",
      0,
      null
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  const responseData = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    const message =
      typeof responseData === "string" && responseData
        ? responseData
        : responseData &&
            typeof responseData === "object" &&
            "message" in responseData &&
            typeof responseData.message === "string"
          ? responseData.message
          : `Request failed with status ${response.status}.`;

    throw new ApiError(message, response.status, responseData);
  }

  return responseData as T;
}


/*
apiFetch(...)
→ uses API_BASE_URL from config.ts
→ reads the saved access token
→ adds Authorization: Bearer <token> automatically
*/