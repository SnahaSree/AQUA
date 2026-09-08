from datetime import datetime, timedelta, timezone

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def build_observations():
    start = datetime(
        2026,
        9,
        8,
        tzinfo=timezone.utc,
    )

    observations = []

    for index in range(8):
        observations.append(
            {
                "timestamp": (
                    start
                    + timedelta(hours=index)
                ).isoformat(),
                "water_level": 14.0 + index * 0.1,
                "rainfall": 30.0 + index,
                "flow_rate": 2000.0 + index * 25,
                "temperature": 28.0,
            }
        )

    return observations


def test_prediction():
    response = client.post(
        "/api/v1/predictions/predict",
        json={
            "sensor_id": "AQ-JAM-001",
            "river": "Jamuna",
            "forecast_hours": 12,
            "observations": build_observations(),
        },
    )

    assert response.status_code == 200

    body = response.json()

    assert body["sensor_id"] == "AQ-JAM-001"
    assert body["river"] == "Jamuna"

    assert 0 <= body["risk_score"] <= 100
    assert body["risk_level"] in {
        "low",
        "moderate",
        "high",
        "critical",
    }

    assert 0 <= body["confidence"] <= 1