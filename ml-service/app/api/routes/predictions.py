from fastapi import APIRouter

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.prediction_service import (
    prediction_service,
)


router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
)
async def predict(
    request: PredictionRequest,
):
    return prediction_service.predict(
        request,
    )