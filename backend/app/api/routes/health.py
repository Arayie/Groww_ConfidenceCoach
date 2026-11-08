from datetime import datetime
from fastapi import APIRouter
from app.config import settings
from app.core.database import check_db_connection
from app.schemas.common import HealthResponse

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def get_health():
    """
    Health check returning service status, API version, and SQLite database connectivity.
    """
    db_connected = check_db_connection()
    return HealthResponse(
        status="healthy" if db_connected else "degraded",
        version=settings.VERSION,
        database="connected" if db_connected else "disconnected",
        environment=settings.ENVIRONMENT,
        timestamp=datetime.utcnow(),
    )
