import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

export function parseError(error: unknown) {
  if (error instanceof ZodError) {
    return {
      message: "Invalid request payload",
      details: error.flatten(),
      status: 422,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 400,
    };
  }

  return {
    message: "Unexpected server error",
    status: 500,
  };
}
