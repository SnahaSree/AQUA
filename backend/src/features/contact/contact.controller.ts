import type { Request, Response } from "express";

import { createContactRequest } from "./contact.service.js";
import { createContactRequestSchema } from "./contact.validator.js";

export async function submitContactRequest(
  req: Request,
  res: Response,
) {
  const input = createContactRequestSchema.parse(req.body);

  const result = await createContactRequest(input);

  res.status(201).json({
    success: true,
    data: result,
  });
}