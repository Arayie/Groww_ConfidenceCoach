from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from app.core.database import Base


class GlossaryTerm(Base):
    __tablename__ = "glossary_terms"

    id = Column(Integer, primary_key=True, index=True)
    term = Column(String(100), nullable=False, index=True)
    slug = Column(String(120), unique=True, nullable=False, index=True)
    definition = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    related_terms = Column(Text, nullable=True)  # Comma-separated or JSON string
    is_published = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )
