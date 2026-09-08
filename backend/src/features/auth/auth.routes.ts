import { Router } from "express";

import {
  login,
  register,
} from "./controllers/auth.controller.js";

import { authRateLimit } from "./auth.rate-limit.js";

const router = Router();

router.use(authRateLimit);

router.post("/register", register);
router.post("/login", login);

export default router;