from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class FeedbackCreate(BaseModel):
    page: str = Field(..., max_length=100)
    feedback_type: str = Field(
        ...,
        pattern="^(clarity|suggestion|bug|content|general)$",
    )
    feedback_text: str = Field(..., min_length=3, max_length=2000)
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    session_id: Optional[str] = Field(default=None, max_length=100)


class FeedbackResponse(BaseModel):
    id: int
    status: str = "received"
    message: str = "Feedback received successfully. Thank you for helping improve SIP Confidence Coach."
    created_at: datetime
