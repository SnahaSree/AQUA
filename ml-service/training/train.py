from pathlib import Path

import tensorflow as tf
from sklearn.model_selection import train_test_split

from app.models.lstm_model import build_lstm_model
from training.preprocess import (
    create_sequences,
    load_dataset,
    save_scaler,
)


DATASET_PATH = (
    "training/data/synthetic_sensor_data.csv"
)

MODEL_PATH = (
    "artifacts/aqua_lstm.keras"
)

SCALER_PATH = (
    "artifacts/scaler.joblib"
)

SEQUENCE_LENGTH = 24


def main() -> None:
    dataframe = load_dataset(
        DATASET_PATH,
    )

    x, y, scaler = create_sequences(
        dataframe,
        sequence_length=SEQUENCE_LENGTH,
    )

    x_train, x_test, y_train, y_test = (
        train_test_split(
            x,
            y,
            test_size=0.2,
            random_state=42,
            stratify=y,
        )
    )

    model = build_lstm_model(
        sequence_length=SEQUENCE_LENGTH,
        feature_count=x.shape[2],
    )

    early_stopping = tf.keras.callbacks.EarlyStopping(
        monitor="val_loss",
        patience=3,
        restore_best_weights=True,
    )

    model.fit(
        x_train,
        y_train,
        validation_split=0.2,
        epochs=15,
        batch_size=32,
        callbacks=[early_stopping],
        verbose=1,
    )

    results = model.evaluate(
        x_test,
        y_test,
        verbose=0,
    )

    print(
        "Evaluation:",
        dict(
            zip(
                model.metrics_names,
                results,
            )
        ),
    )

    Path(MODEL_PATH).parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    model.save(MODEL_PATH)

    save_scaler(
        scaler,
        SCALER_PATH,
    )

    print(
        f"Model saved to {MODEL_PATH}"
    )

    print(
        f"Scaler saved to {SCALER_PATH}"
    )


if __name__ == "__main__":
    main()