import express from "express";
import pino from "pino";
import { pinoHttp} from "pino-http";

import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { configureSecurity } from "./middleware/security.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { startPredictionJob } from "./jobs/prediction.job.js";
import apiRoutes from "./routes/index.js";
const logger = pino({
  level: env.LOG_LEVEL,
});

import {
  startSensorSimulationJob,
  generateSensorReadings,
} from "./jobs/sensor-simulation.job.js";

const app = express();

configureSecurity(app);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(pinoHttp({ logger }));

app.get("/", (_request, response) => {
  response.json({
    success: true,
    service: "Aqua API",
    message: "Aqua backend is running.",
  });
});

app.use("/api/v1", apiRoutes);

app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
  await connectDatabase();
startPredictionJob();

  app.listen(env.PORT, () => {
    logger.info(
      `Aqua API running on port ${env.PORT}`,
    );
  });
}

bootstrap().catch((error) => {
  logger.error(error);
  process.exit(1);
});

if (env.ENABLE_SENSOR_SIMULATION) {
  await generateSensorReadings();
  startSensorSimulationJob();
}