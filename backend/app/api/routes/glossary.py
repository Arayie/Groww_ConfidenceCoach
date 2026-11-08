from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.glossary_service import GlossaryService
from app.schemas.glossary import GlossaryTermResponse, GlossaryListResponse

router = APIRouter(prefix="/glossary", tags=["Glossary"])


@router.get("", response_model=GlossaryListResponse)
def list_glossary_terms(
    category: Optional[str] = Query(None, description="Filter by category (e.g. Fundamentals, Costs)"),
    db: Session = Depends(get_db),
):
    """List all published financial glossary terms."""
    service = GlossaryService(db)
    return service.get_terms(category=category)


@router.get("/search", response_model=List[GlossaryTermResponse])
def search_glossary(
    q: str = Query(..., min_length=1, max_length=100, description="Search term or acronym"),
    db: Session = Depends(get_db),
):
    """Search glossary terms by keyword."""
    service = GlossaryService(db)
    return service.search_terms(q)


@router.get("/{slug}", response_model=GlossaryTermResponse)
def get_glossary_term(slug: str, db: Session = Depends(get_db)):
    """Get a specific glossary term by slug."""
    service = GlossaryService(db)
    term = service.get_term_by_slug(slug)
    if not term:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Glossary term '{slug}' not found.",
        )
    return term
