import { Router } from "express";

import { generatePrediction } from "../controllers/prediction.controller.js";
import {
  requireAuth,
  requireRole,
} from "../features/auth/middleware/auth.middleware.js";

const router = Router();

router.post(
  "/generate",
  requireAuth,
  requireRole("admin", "analyst"),
  generatePrediction,
);

export default router;