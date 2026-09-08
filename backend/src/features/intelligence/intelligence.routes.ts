import { Router } from "express";

import { intelligenceController } from "./intelligence.controller.js";

const router = Router();

/**
 * Sensor endpoints
 */
router.get(
  "/sensors",
  intelligenceController.getSensors.bind(
    intelligenceController,
  ),
);

router.get(
  "/sensors/readings",
  intelligenceController.getReadings.bind(
    intelligenceController,
  ),
);

router.get(
  "/sensors/:sensorId/latest",
  intelligenceController.getLatestReading.bind(
    intelligenceController,
  ),
);

router.get(
  "/sensors/:sensorId/readings",
  intelligenceController.getReadings.bind(
    intelligenceController,
  ),
);

router.get(
  "/sensors/:sensorId",
  intelligenceController.getSensor.bind(
    intelligenceController,
  ),
);

/**
 * River endpoints
 */
router.get(
  "/rivers",
  intelligenceController.getRivers.bind(
    intelligenceController,
  ),
);

router.get(
  "/rivers/:river",
  intelligenceController.getRiver.bind(
    intelligenceController,
  ),
);

/**
 * Prediction endpoints
 */
router.get(
  "/predictions/latest",
  intelligenceController.getLatestPredictions.bind(
    intelligenceController,
  ),
);

router.get(
  "/predictions/:sensorId",
  intelligenceController.getPredictionsForSensor.bind(
    intelligenceController,
  ),
);

router.get(
  "/predictions",
  intelligenceController.getPredictions.bind(
    intelligenceController,
  ),
);

export default router;