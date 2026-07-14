import "server-only";

import { getUserToken } from "@/lib/core/session";

const apiUrl = (
  process.env.SERVER_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

type MutationMethod =
  | "POST"
  | "PATCH"
  | "DELETE";

const getApiUrl = (endpoint: string) => {
  const cleanEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  return `${apiUrl}${cleanEndpoint}`;
};

export const handleResponse = async <T>(
  response: Response,
): Promise<T> => {
  const contentType =
    response.headers.get("content-type");

  let data: unknown;

  if (
    contentType?.includes("application/json")
  ) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data
        ? String(data.message)
        : "Something went wrong.";

    throw new Error(message);
  }

  return data as T;
};

export const authHeader = async () => {
  const token = await getUserToken();

  if (!token) {
    throw new Error(
      "You must be logged in.",
    );
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const serverFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(
    getApiUrl(endpoint),
    {
      ...options,
      cache: options.cache || "no-store",
    },
  );

  return handleResponse<T>(response);
};

export const protectedFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const authHeaders = await authHeader();

  const requestHeaders = new Headers(
    options.headers,
  );

  requestHeaders.set(
    "Authorization",
    authHeaders.Authorization,
  );

  const response = await fetch(
    getApiUrl(endpoint),
    {
      ...options,
      headers: requestHeaders,
      cache: options.cache || "no-store",
    },
  );

  return handleResponse<T>(response);
};

export const serverMutation = async <T>(
  endpoint: string,
  method: MutationMethod,
  body?: unknown,
): Promise<T> => {
  const requestHeaders = new Headers();

  if (body !== undefined) {
    requestHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  return protectedFetch<T>(endpoint, {
    method,
    headers: requestHeaders,
    body:
      body === undefined
        ? undefined
        : JSON.stringify(body),
  });
};