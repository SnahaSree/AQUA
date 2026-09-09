from fastapi import APIRouter, Header, HTTPException, status

from app.core.config import settings
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.prediction_service import prediction_service


router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
)
def predict(
    payload: PredictionRequest,
    x_ml_service_key: str | None = Header(default=None),
) -> PredictionResponse:
    if x_ml_service_key != settings.ml_service_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid ML service credentials",
        )

    return prediction_service.predict(payload)