import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "../features/auth/auth.routes.js";

import intelligenceRoutes from "../features/intelligence/routes/intelligence.routes.js";
import predictionRoutes from "./prediction.routes.js";
import mlHealthRoutes from "./ml-health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/ml-health", mlHealthRoutes);
router.use("/intelligence", intelligenceRoutes);
router.use(
  "/predictions",
  predictionRoutes,
);

export default router;