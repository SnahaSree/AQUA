from datetime import datetime, timezone
from pathlib import Path

import joblib
import numpy as np

from app.core.config import settings
from app.services.risk_service import (
    calculate_risk_level,
    calculate_risk_score,
)
from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)


FEATURE_COLUMNS = [
    "water_level",
    "rainfall",
    "flow_rate",
    "temperature",
]


class PredictionService:
    def __init__(self) -> None:
        self.model = None
        self.scaler = None
        self._artifacts_loaded = False

    def _load_artifacts(self) -> None:
        if self._artifacts_loaded:
            return

        # Import TensorFlow only when prediction is actually requested.
        from tensorflow import keras

        model_path = Path(settings.model_path)
        scaler_path = Path(settings.scaler_path)

        if model_path.exists():
            self.model = keras.models.load_model(
                model_path,
            )

        if scaler_path.exists():
            self.scaler = joblib.load(
                scaler_path,
            )

        self._artifacts_loaded = True

    def predict(
        self,
        request: PredictionRequest,
    ) -> PredictionResponse:
        latest = request.observations[-1]

        risk_score = calculate_risk_score(
            water_level=latest.water_level,
            rainfall=latest.rainfall,
            flow_rate=latest.flow_rate,
        )

        confidence = 0.60

        # Only load the ML artifacts when they are actually needed.
        if len(request.observations) >= 24:
            self._load_artifacts()

        if (
            self.model is not None
            and self.scaler is not None
            and len(request.observations) >= 24
        ):
            values = np.array(
                [
                    [
                        observation.water_level,
                        observation.rainfall,
                        observation.flow_rate,
                        observation.temperature,
                    ]
                    for observation in request.observations[-24:]
                ],
                dtype=np.float32,
            )

            scaled = self.scaler.transform(
                values,
            )

            model_input = np.expand_dims(
                scaled,
                axis=0,
            )

            probability = float(
                self.model.predict(
                    model_input,
                    verbose=0,
                )[0][0]
            )

            risk_score = round(
                probability * 100,
                2,
            )

            confidence = round(
                abs(probability - 0.5) * 2,
                3,
            )

            confidence = max(
                confidence,
                0.5,
            )

        risk_level = calculate_risk_level(
            risk_score,
        )

        return PredictionResponse(
            sensor_id=request.sensor_id,
            river=request.river,
            risk_score=risk_score,
            risk_level=risk_level,
            forecast_hours=request.forecast_hours,
            predicted_water_level=round(
                latest.water_level,
                2,
            ),
            confidence=confidence,
            model_version=settings.model_version,
            generated_at=datetime.now(
                timezone.utc,
            ),
        )


prediction_service = PredictionService()