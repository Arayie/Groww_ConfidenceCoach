from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.faq import FAQ
from app.schemas.faq import FAQResponse, FAQListResponse


class FAQService:
    def __init__(self, db: Session):
        self.db = db

    def get_faqs(
        self,
        category: Optional[str] = None,
        difficulty_level: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> FAQListResponse:
        query = self.db.query(FAQ).filter(FAQ.is_published.is_(True))

        if category and category.lower() != "all":
            query = query.filter(FAQ.category == category)

        if difficulty_level and difficulty_level.lower() != "all":
            query = query.filter(FAQ.difficulty_level == difficulty_level)

        total = query.count()
        items = (
            query.order_by(FAQ.display_order.asc(), FAQ.id.asc())
            .offset(offset)
            .limit(limit)
            .all()
        )

        return FAQListResponse(
            items=[FAQResponse.model_validate(f) for f in items],
            total=total,
            limit=limit,
            offset=offset,
            category=category,
        )

    def get_faq_by_id(self, faq_id: int) -> Optional[FAQResponse]:
        faq = (
            self.db.query(FAQ)
            .filter(FAQ.id == faq_id, FAQ.is_published.is_(True))
            .first()
        )
        if not faq:
            return None
        return FAQResponse.model_validate(faq)

    def search_faqs(self, search_query: str, limit: int = 20) -> List[FAQResponse]:
        q = f"%{search_query.strip()}%"
        items = (
            self.db.query(FAQ)
            .filter(
                FAQ.is_published.is_(True),
                or_(
                    FAQ.question.ilike(q),
                    FAQ.answer.ilike(q),
                    FAQ.category.ilike(q),
                ),
            )
            .order_by(FAQ.display_order.asc())
            .limit(limit)
            .all()
        )
        return [FAQResponse.model_validate(f) for f in items]
