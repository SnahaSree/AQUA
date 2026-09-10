import { z } from "zod";

export const createContactRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  requestType: z.enum([
    "demo",
    "partnership",
    "research",
    "general",
  ]),
  message: z.string().trim().min(10).max(3000),
});

export type CreateContactRequestInput = z.infer<
  typeof createContactRequestSchema
>;