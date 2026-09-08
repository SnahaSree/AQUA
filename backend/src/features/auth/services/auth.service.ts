import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../../models/index.js";
import { env } from "../../../config/env.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

const SALT_ROUNDS = 12;

function createToken(user: AuthenticatedUser) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    },
  );
}

export async function registerUser(
  input: RegisterInput,
) {
  const existingUser = await User.findOne({
    email: input.email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(
    input.password,
    SALT_ROUNDS,
  );

  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
    role: "viewer",
  });

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    user: authenticatedUser,
    token: createToken(authenticatedUser),
  };
}

export async function loginUser(input: LoginInput) {
  const user = await User.findOne({
    email: input.email.toLowerCase(),
  }).select("+passwordHash");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  if (!user.isActive) {
    throw new Error("This account is inactive.");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const authenticatedUser: AuthenticatedUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    user: authenticatedUser,
    token: createToken(authenticatedUser),
  };
}