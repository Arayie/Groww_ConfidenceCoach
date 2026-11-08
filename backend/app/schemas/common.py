from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, ConfigDict


class HealthResponse(BaseModel):
    status: str
    version: str
    database: str
    environment: str
    timestamp: datetime = datetime.utcnow()

    model_config = ConfigDict(from_attributes=True)


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
    code: Optional[str] = None
