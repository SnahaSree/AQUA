from fastapi import FastAPI

app = FastAPI(
    title="Aqua ML Service",
    description="Flood and riverbank-erosion prediction service",
    version="1.0.0",
)


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "aqua-ml",
        "status": "healthy",
    }