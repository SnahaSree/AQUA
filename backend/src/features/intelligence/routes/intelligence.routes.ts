import { Router } from "express";

import {
  overview,
  river,
  riverTrend,
  getStationIntelligenceController,
  getRiverSummaryController,
} from "../controllers/intelligence.controller.js";

import {
  status,
} from "../controllers/status.controller.js";

const router = Router();

router.get(
  "/overview",
  overview,
);

router.get(
  "/rivers/:river",
  river,
);

router.get(
  "/status",
  status,
);

router.get(
  "/rivers/:river/trend",
  riverTrend,
);

router.get(
  "/stations/:sensorId",
  getStationIntelligenceController,
);
router.get(
  "/rivers/:river/summary",
  getRiverSummaryController,
);
export default router;