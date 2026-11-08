from __future__ import annotations
from typing import List, Optional, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings
import os
from pathlib import Path


class Settings(BaseSettings):
    PROJECT_NAME: str = "GROWWW SIP Confidence Coach API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database configuration
    # For Render persistent disk, default is /var/data/growww.db
    # For local development, default is ./data/growww.db
    DATABASE_PATH: str = Field(
        default_factory=lambda: os.getenv(
            "DATABASE_PATH",
            str(Path(__file__).resolve().parent.parent / "data" / "growww.db"),
        )
    )
    DATABASE_URL: Optional[str] = None

    # CORS configuration
    CORS_ALLOWED_ORIGINS: Optional[str] = None
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    # Rate limiting for public feedback submission
    FEEDBACK_RATE_LIMIT_PER_MINUTE: int = 30

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Optional[Union[str, List[str]]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:8000",
            "http://127.0.0.1:8000",
        ]

    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        # Resolve SQLite path
        db_path = Path(self.DATABASE_PATH).resolve()
        return f"sqlite:///{db_path}"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
        "extra": "ignore",
    }


settings = Settings()
