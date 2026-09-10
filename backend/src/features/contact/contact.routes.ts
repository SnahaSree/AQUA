import { Router } from "express";
import rateLimit from "express-rate-limit";

import { submitContactRequest } from "./contact.controller.js";

const router = Router();

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests. Please try again later.",
  },
});

router.post(
  "/",
  contactRateLimit,
  submitContactRequest,
);

export default router;