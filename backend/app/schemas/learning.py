from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class LessonResponse(BaseModel):
    id: int
    module_id: int
    title: str
    slug: str
    content: str
    display_order: int
    estimated_minutes: int
    is_published: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LearningModuleResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    category: str
    difficulty_level: str
    estimated_minutes: int
    display_order: int
    is_published: bool
    lessons_count: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LearningModuleDetailResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    category: str
    difficulty_level: str
    estimated_minutes: int
    display_order: int
    is_published: bool
    created_at: datetime
    lessons: List[LessonResponse] = []

    model_config = ConfigDict(from_attributes=True)
