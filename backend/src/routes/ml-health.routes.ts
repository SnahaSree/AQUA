import { Router } from "express";

import { mlHealth } from "../controllers/ml-health.controller.js";

const router = Router();

router.get("/", mlHealth);

export default router;