import type { Request, Response } from "express";

import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator.js";

import {
  loginUser,
  registerUser,
} from "../services/auth.service.js";

export async function register(
  request: Request,
  response: Response,
) {
  const input = registerSchema.parse(request.body);

  const result = await registerUser(input);

  response.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: result,
  });
}

export async function login(
  request: Request,
  response: Response,
) {
  const input = loginSchema.parse(request.body);

  const result = await loginUser(input);

  response.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
}