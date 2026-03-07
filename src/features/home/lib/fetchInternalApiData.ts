import type { ZodType } from "zod";

type InternalApiSuccess<T> = {
  status: "ok";
  data: T;
};

type InternalApiUnavailable = {
  status: "unavailable";
};

type InternalApiError = {
  status: "error";
  message: string;
};

type InternalApiResponse<T> =
  | InternalApiSuccess<T>
  | InternalApiUnavailable
  | InternalApiError;

export async function fetchInternalApiData<T>(
  url: string,
  schema: ZodType<InternalApiResponse<T>>
): Promise<T | null> {
  const response = await fetch(url);
  const payload = schema.parse(await response.json());

  if (payload.status === "ok") {
    return payload.data;
  }

  if (payload.status === "unavailable") {
    return null;
  }

  throw new Error(payload.message);
}
