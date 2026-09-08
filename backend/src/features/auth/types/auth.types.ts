import type { UserRole } from "../../../models/User.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest {
  user?: AuthenticatedUser;
}