from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class LearningModule(Base):
    __tablename__ = "learning_modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, default="Fundamentals")
    difficulty_level = Column(String(50), nullable=False, default="Beginner")
    estimated_minutes = Column(Integer, nullable=False, default=10)
    display_order = Column(Integer, nullable=False, default=1, index=True)
    is_published = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )

    lessons = relationship(
        "LearningLesson",
        back_populates="module",
        cascade="all, delete-orphan",
        order_by="LearningLesson.display_order",
    )


class LearningLesson(Base):
    __tablename__ = "learning_lessons"

    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(
        Integer,
        ForeignKey("learning_modules.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, index=True)
    content = Column(Text, nullable=False)
    display_order = Column(Integer, nullable=False, default=1)
    estimated_minutes = Column(Integer, nullable=False, default=5)
    is_published = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
        onupdate=datetime.utcnow,
    )

    module = relationship("LearningModule", back_populates="lessons")
