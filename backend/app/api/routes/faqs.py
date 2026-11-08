from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.faq_service import FAQService
from app.schemas.faq import FAQResponse, FAQListResponse

router = APIRouter(prefix="/faqs", tags=["FAQs"])


@router.get("", response_model=FAQListResponse)
def list_faqs(
    category: Optional[str] = Query(None, description="Filter by category (e.g. Basics, Mechanics)"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty (Beginner, Intermediate)"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    """List published FAQs with optional category filtering and pagination."""
    service = FAQService(db)
    return service.get_faqs(
        category=category,
        difficulty_level=difficulty,
        limit=limit,
        offset=offset,
    )


@router.get("/search", response_model=List[FAQResponse])
def search_faqs(
    q: str = Query(..., min_length=1, max_length=100, description="Keyword search in FAQs"),
    limit: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
):
    """Search FAQs by keyword across question, answer, and category."""
    service = FAQService(db)
    return service.search_faqs(q, limit=limit)


@router.get("/{faq_id}", response_model=FAQResponse)
def get_faq(
    faq_id: int,
    db: Session = Depends(get_db),
):
    """Get a single FAQ by ID."""
    service = FAQService(db)
    faq = service.get_faq_by_id(faq_id)
    if not faq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"FAQ with ID {faq_id} not found.",
        )
    return faq
