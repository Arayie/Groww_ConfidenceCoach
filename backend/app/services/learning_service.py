from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.learning import LearningModule, LearningLesson
from app.schemas.learning import (
    LearningModuleResponse,
    LearningModuleDetailResponse,
    LessonResponse,
)


class LearningService:
    def __init__(self, db: Session):
        self.db = db

    def get_modules(self) -> List[LearningModuleResponse]:
        modules = (
            self.db.query(LearningModule)
            .filter(LearningModule.is_published.is_(True))
            .order_by(LearningModule.display_order.asc())
            .all()
        )
        result = []
        for mod in modules:
            lessons_count = len(mod.lessons) if mod.lessons else 0
            mod_dict = {
                "id": mod.id,
                "title": mod.title,
                "slug": mod.slug,
                "description": mod.description,
                "category": mod.category,
                "difficulty_level": mod.difficulty_level,
                "estimated_minutes": mod.estimated_minutes,
                "display_order": mod.display_order,
                "is_published": mod.is_published,
                "lessons_count": lessons_count,
                "created_at": mod.created_at,
            }
            result.append(LearningModuleResponse(**mod_dict))
        return result

    def get_module_by_slug(self, slug: str) -> Optional[LearningModuleDetailResponse]:
        module = (
            self.db.query(LearningModule)
            .filter(LearningModule.slug == slug, LearningModule.is_published.is_(True))
            .first()
        )
        if not module:
            return None

        lessons = [
            LessonResponse.model_validate(l)
            for l in module.lessons
            if l.is_published
        ]
        return LearningModuleDetailResponse(
            id=module.id,
            title=module.title,
            slug=module.slug,
            description=module.description,
            category=module.category,
            difficulty_level=module.difficulty_level,
            estimated_minutes=module.estimated_minutes,
            display_order=module.display_order,
            is_published=module.is_published,
            created_at=module.created_at,
            lessons=lessons,
        )

    def get_module_lessons(self, slug: str) -> List[LessonResponse]:
        module = (
            self.db.query(LearningModule)
            .filter(LearningModule.slug == slug, LearningModule.is_published.is_(True))
            .first()
        )
        if not module:
            return []
        return [
            LessonResponse.model_validate(l)
            for l in module.lessons
            if l.is_published
        ]

    def get_lesson_by_id(self, lesson_id: int) -> Optional[LessonResponse]:
        lesson = (
            self.db.query(LearningLesson)
            .filter(LearningLesson.id == lesson_id, LearningLesson.is_published.is_(True))
            .first()
        )
        if not lesson:
            return None
        return LessonResponse.model_validate(lesson)
