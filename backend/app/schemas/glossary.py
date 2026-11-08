from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class GlossaryTermResponse(BaseModel):
    id: int
    term: str
    slug: str
    definition: str
    category: str
    related_terms: Optional[str] = None
    is_published: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class GlossaryListResponse(BaseModel):
    items: List[GlossaryTermResponse]
    total: int
    category: Optional[str] = None
