from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.database import Base


class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"

    id = Column(Integer, primary_key=True, index=True)
    organisation = Column(String(150), nullable=False, index=True)
    source_title = Column(String(300), nullable=False)
    source_url = Column(String(500), nullable=False)
    source_type = Column(String(100), nullable=False, default="regulatory_guideline")
    publication_date = Column(String(50), nullable=True)
    last_verified_at = Column(DateTime, nullable=True)
    verification_status = Column(
        String(100),
        nullable=False,
        default="pending_official_review_phase3",
    )
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )
