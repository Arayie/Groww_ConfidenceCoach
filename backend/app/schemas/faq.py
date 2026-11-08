from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class FAQBase(BaseModel):
    question: str
    answer: str
    category: str
    difficulty_level: str = "Beginner"
    display_order: int = 1
    is_published: bool = True


class FAQResponse(FAQBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class FAQListResponse(BaseModel):
    items: List[FAQResponse]
    total: int
    limit: int
    offset: int
    category: Optional[str] = None
