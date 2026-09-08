from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.preprocessing import StandardScaler


FEATURE_COLUMNS = [
    "water_level",
    "rainfall",
    "flow_rate",
    "temperature",
]


def load_dataset(
    path: str,
) -> pd.DataFrame:
    dataframe = pd.read_csv(path)

    dataframe["timestamp"] = pd.to_datetime(
        dataframe["timestamp"],
    )

    dataframe = dataframe.sort_values(
        "timestamp",
    )

    dataframe = dataframe.dropna(
        subset=FEATURE_COLUMNS + ["risk"],
    )

    return dataframe


def create_sequences(
    dataframe: pd.DataFrame,
    sequence_length: int = 24,
):
    scaler = StandardScaler()

    features = scaler.fit_transform(
        dataframe[FEATURE_COLUMNS],
    )

    labels = dataframe["risk"].to_numpy()

    sequences = []
    sequence_labels = []

    for index in range(
        sequence_length,
        len(features),
    ):
        sequences.append(
            features[
                index - sequence_length : index
            ]
        )

        sequence_labels.append(
            labels[index]
        )

    x = np.asarray(
        sequences,
        dtype=np.float32,
    )

    y = np.asarray(
        sequence_labels,
        dtype=np.float32,
    )

    return x, y, scaler


def save_scaler(
    scaler,
    path: str,
) -> None:
    Path(path).parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        scaler,
        path,
    )