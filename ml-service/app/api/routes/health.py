from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/health")
async def health():
    return {
        "success": True,
        "service": settings.app_name,
        "environment": settings.environment,
        "model_version": settings.model_version,
        "status": "healthy",
    }