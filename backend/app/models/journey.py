from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from app.core.database import Base


class JourneyStage(Base):
    __tablename__ = "journey_stages"

    id = Column(Integer, primary_key=True, index=True)
    stage_number = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    detailed_explanation = Column(Text, nullable=False)
    display_order = Column(Integer, nullable=False, default=1, index=True)
    is_published = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )
