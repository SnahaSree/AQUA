import { Router } from "express";

import {
  getCaseStudy,
  listCaseStudies,
} from "./case-study.controller.js";

const router = Router();

router.get("/", listCaseStudies);
router.get("/:slug", getCaseStudy);

export default router;