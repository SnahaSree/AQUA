import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import { env } from "../../../config/env.js";
import type {
  AuthenticatedUser,
} from "../types/auth.types.js";

export interface AuthenticatedRequest
  extends Request {
  user?: AuthenticatedUser;
}

export function requireAuth(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  const authorization =
    request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    response.status(401).json({
      success: false,
      message: "Authentication required.",
    });

    return;
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(
      token,
      env.JWT_SECRET,
    );

    if (
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      !isValidRole(payload.role)
    ) {
      response.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });

      return;
    }

    request.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    response.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
  
}
export function requireRole(
  ...allowedRoles: AuthenticatedUser["role"][]
) {
  return (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction,
  ) => {
    if (!request.user) {
      response.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    if (!allowedRoles.includes(request.user.role)) {
      response.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });

      return;
    }

    next();
  };
}

function isValidRole(
  role: unknown,
): role is AuthenticatedUser["role"] {
  return (
    role === "admin" ||
    role === "analyst" ||
    role === "viewer"
  );
}