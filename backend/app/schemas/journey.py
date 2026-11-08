from datetime import datetime
from pydantic import BaseModel, ConfigDict


class JourneyStageResponse(BaseModel):
    id: int
    stage_number: int
    title: str
    description: str
    detailed_explanation: str
    display_order: int
    is_published: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
