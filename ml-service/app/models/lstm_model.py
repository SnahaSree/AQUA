from tensorflow import keras
from tensorflow.keras import layers


def build_lstm_model(
    sequence_length: int,
    feature_count: int,
) -> keras.Model:
    inputs = keras.Input(
        shape=(
            sequence_length,
            feature_count,
        ),
        name="sensor_sequence",
    )

    x = layers.LSTM(
        32,
        return_sequences=True,
    )(inputs)

    x = layers.Dropout(0.2)(x)

    x = layers.LSTM(
        16,
        return_sequences=False,
    )(x)

    x = layers.Dropout(0.2)(x)

    x = layers.Dense(
        16,
        activation="relu",
    )(x)

    outputs = layers.Dense(
        1,
        activation="sigmoid",
        name="risk_probability",
    )(x)

    model = keras.Model(
        inputs=inputs,
        outputs=outputs,
        name="aqua_lstm",
    )

    model.compile(
        optimizer=keras.optimizers.Adam(
            learning_rate=0.001,
        ),
        loss="binary_crossentropy",
        metrics=[
            "accuracy",
            keras.metrics.AUC(
                name="auc",
            ),
        ],
    )

    return model