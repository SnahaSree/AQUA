from datetime import datetime

from pydantic import BaseModel, Field


class SensorObservation(BaseModel):
    timestamp: datetime

    water_level: float = Field(
        ge=0,
        le=100,
    )

    rainfall: float = Field(
        ge=0,
        le=1000,
    )

    flow_rate: float = Field(
        ge=0,
        le=100000,
    )

    temperature: float = Field(
        ge=-50,
        le=70,
    )


class PredictionRequest(BaseModel):
    sensor_id: str = Field(
        min_length=1,
        max_length=100,
    )

    river: str = Field(
        min_length=1,
        max_length=100,
    )

    observations: list[SensorObservation] = Field(
        min_length=8,
        max_length=500,
    )

    forecast_hours: int = Field(
        default=12,
        ge=1,
        le=72,
    )


class PredictionResponse(BaseModel):
    sensor_id: str
    river: str

    risk_score: float = Field(
        ge=0,
        le=100,
    )

    risk_level: str

    forecast_hours: int

    predicted_water_level: float

    confidence: float = Field(
        ge=0,
        le=1,
    )

    model_version: str

    generated_at: datetime