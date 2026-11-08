from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from app.core.database import Base


class FAQ(Base):
    __tablename__ = "faqs"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(500), nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    difficulty_level = Column(String(50), nullable=False, default="Beginner")
    display_order = Column(Integer, nullable=False, default=1, index=True)
    is_published = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )
