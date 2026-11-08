from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.journey_service import JourneyService
from app.schemas.journey import JourneyStageResponse

router = APIRouter(prefix="/journey", tags=["SIP Journey"])


@router.get("/stages", response_model=List[JourneyStageResponse])
def list_journey_stages(db: Session = Depends(get_db)):
    """List all 7 stages of the SIP investment lifecycle in sequential order."""
    service = JourneyService(db)
    return service.get_stages()


@router.get("/stages/{stage_id}", response_model=JourneyStageResponse)
def get_journey_stage(stage_id: int, db: Session = Depends(get_db)):
    """Get a specific journey stage by stage number or ID."""
    service = JourneyService(db)
    stage = service.get_stage_by_id(stage_id)
    if not stage:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Journey stage {stage_id} not found.",
        )
    return stage
