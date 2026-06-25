"""
Application settings loaded from environment variables.
Values are read from a .env file in development; set directly in staging/production.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    app_env: str = "development"
    debug: bool = False

    jwt_secret: str
    jwt_algorithm: str
    jwt_access_token_expiry_minutes: int
    jwt_refresh_token_expire_minutes: int

    litellm_api_key: str
    litellm_api_base: str
    litellm_model: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
