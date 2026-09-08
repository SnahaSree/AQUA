def calculate_risk_level(score: float) -> str:
    if score >= 80:
        return "critical"

    if score >= 60:
        return "high"

    if score >= 30:
        return "moderate"

    return "low"


def calculate_risk_score(
    water_level: float,
    rainfall: float,
    flow_rate: float,
) -> float:
    """
    Development risk heuristic.

    This is NOT the final scientific flood model.
    It gives the API a deterministic fallback while
    the trained model is being developed.
    """

    water_component = min(
        max(water_level / 20.0, 0.0),
        1.0,
    )

    rainfall_component = min(
        max(rainfall / 200.0, 0.0),
        1.0,
    )

    flow_component = min(
        max(flow_rate / 5000.0, 0.0),
        1.0,
    )

    score = (
        water_component * 0.55
        + rainfall_component * 0.25
        + flow_component * 0.20
    ) * 100

    return round(
        max(0.0, min(score, 100.0)),
        2,
    )