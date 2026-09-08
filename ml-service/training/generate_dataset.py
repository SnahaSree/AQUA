from pathlib import Path

import numpy as np
import pandas as pd


OUTPUT_PATH = Path("training/data/synthetic_sensor_data.csv")


def generate_dataset(
    rows: int = 3000,
) -> pd.DataFrame:
    rng = np.random.default_rng(42)

    timestamps = pd.date_range(
        start="2025-01-01",
        periods=rows,
        freq="h",
    )

    seasonal = np.sin(
        np.arange(rows) / 24 * 2 * np.pi
    )

    rainfall = np.clip(
        rng.gamma(
            shape=1.5,
            scale=12,
            size=rows,
        )
        + np.maximum(seasonal, 0) * 20,
        0,
        None,
    )

    flow_rate = np.clip(
        1800
        + seasonal * 500
        + rainfall * 18
        + rng.normal(0, 120, rows),
        100,
        None,
    )

    water_level = np.clip(
        10
        + seasonal * 1.8
        + rainfall * 0.025
        + flow_rate * 0.0015
        + rng.normal(0, 0.3, rows),
        0,
        None,
    )

    temperature = (
        27
        + seasonal * 3
        + rng.normal(0, 1.2, rows)
    )

    risk_signal = (
        water_level > 15
    ) | (
        rainfall > 70
    ) | (
        flow_rate > 3000
    )

    risk = risk_signal.astype(int)

    return pd.DataFrame(
        {
            "timestamp": timestamps,
            "water_level": water_level,
            "rainfall": rainfall,
            "flow_rate": flow_rate,
            "temperature": temperature,
            "risk": risk,
        }
    )


if __name__ == "__main__":
    OUTPUT_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    dataset = generate_dataset()

    dataset.to_csv(
        OUTPUT_PATH,
        index=False,
    )

    print(
        f"Generated {len(dataset)} rows "
        f"at {OUTPUT_PATH}"
    )