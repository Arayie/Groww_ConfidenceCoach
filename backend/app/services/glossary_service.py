from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.glossary import GlossaryTerm
from app.schemas.glossary import GlossaryTermResponse, GlossaryListResponse


class GlossaryService:
    def __init__(self, db: Session):
        self.db = db

    def get_terms(self, category: Optional[str] = None) -> GlossaryListResponse:
        query = self.db.query(GlossaryTerm).filter(GlossaryTerm.is_published.is_(True))

        if category and category.lower() != "all":
            query = query.filter(GlossaryTerm.category == category)

        items = query.order_by(GlossaryTerm.term.asc()).all()
        return GlossaryListResponse(
            items=[GlossaryTermResponse.model_validate(t) for t in items],
            total=len(items),
            category=category,
        )

    def get_term_by_slug(self, slug: str) -> Optional[GlossaryTermResponse]:
        term = (
            self.db.query(GlossaryTerm)
            .filter(GlossaryTerm.slug == slug, GlossaryTerm.is_published.is_(True))
            .first()
        )
        if not term:
            return None
        return GlossaryTermResponse.model_validate(term)

    def search_terms(self, query_str: str) -> List[GlossaryTermResponse]:
        q = f"%{query_str.strip()}%"
        items = (
            self.db.query(GlossaryTerm)
            .filter(
                GlossaryTerm.is_published.is_(True),
                or_(
                    GlossaryTerm.term.ilike(q),
                    GlossaryTerm.definition.ilike(q),
                    GlossaryTerm.category.ilike(q),
                    GlossaryTerm.related_terms.ilike(q),
                ),
            )
            .order_by(GlossaryTerm.term.asc())
            .all()
        )
        return [GlossaryTermResponse.model_validate(t) for t in items]
