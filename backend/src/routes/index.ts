import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "../features/auth/auth.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);


export default router;