from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.predictions import (
    router as prediction_router,
)
from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description=(
        "Aqua flood and river-risk "
        "prediction service."
    ),
)


app.include_router(
    health_router,
    prefix="/api/v1",
)

app.include_router(
    prediction_router,
    prefix="/api/v1/predictions",
)


@app.get("/")
async def root():
    return {
        "success": True,
        "service": settings.app_name,
        "status": "running",
    }