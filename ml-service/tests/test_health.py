from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get(
        "/api/v1/health",
    )

    assert response.status_code == 200

    body = response.json()

    assert body["success"] is True
    assert body["status"] == "healthy"