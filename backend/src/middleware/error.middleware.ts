import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
};