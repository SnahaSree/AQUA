from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Aqua ML Intelligence Service"
    environment: str = "development"

    host: str = "127.0.0.1"
    port: int = 8000

    model_version: str = "aqua-lstm-v1"
    model_path: str = "artifacts/aqua_lstm.keras"
    scaler_path: str = "artifacts/scaler.joblib"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()