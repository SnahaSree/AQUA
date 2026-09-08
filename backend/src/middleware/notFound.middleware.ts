import type { Request, Response } from "express";

export function notFound(
  request: Request,
  response: Response,
) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}