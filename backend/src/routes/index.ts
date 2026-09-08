import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "../features/auth/auth.routes.js";
import intelligenceRoutes from "../features/intelligence/intelligence.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/intelligence", intelligenceRoutes);

export default router;