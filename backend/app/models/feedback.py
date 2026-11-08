from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.core.database import Base


class UserFeedback(Base):
    __tablename__ = "user_feedback"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    page = Column(String(100), nullable=False)
    feedback_type = Column(String(50), nullable=False)  # "clarity", "suggestion", "bug", "content"
    feedback_text = Column(Text, nullable=False)
    rating = Column(Integer, nullable=True)  # 1-5
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
