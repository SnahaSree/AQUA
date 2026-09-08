import type {
  ErrorRequestHandler,
  Request,
  Response,
} from "express";

import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: error.flatten().fieldErrors,
    });

    return;
  }

  if (
    error instanceof Error &&
    error.message ===
      "An account with this email already exists."
  ) {
    response.status(409).json({
      success: false,
      message: error.message,
    });

    return;
  }

  if (
    error instanceof Error &&
    (
      error.message ===
        "Invalid email or password." ||
      error.message ===
        "This account is inactive."
    )
  ) {
    response.status(401).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};