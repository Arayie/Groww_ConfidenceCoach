from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.journey import JourneyStage
from app.schemas.journey import JourneyStageResponse


class JourneyService:
    def __init__(self, db: Session):
        self.db = db

    def get_stages(self) -> List[JourneyStageResponse]:
        stages = (
            self.db.query(JourneyStage)
            .filter(JourneyStage.is_published.is_(True))
            .order_by(JourneyStage.stage_number.asc())
            .all()
        )
        return [JourneyStageResponse.model_validate(s) for s in stages]

    def get_stage_by_id(self, stage_id: int) -> Optional[JourneyStageResponse]:
        stage = (
            self.db.query(JourneyStage)
            .filter(JourneyStage.id == stage_id, JourneyStage.is_published.is_(True))
            .first()
        )
        if not stage:
            return None
        return JourneyStageResponse.model_validate(stage)
