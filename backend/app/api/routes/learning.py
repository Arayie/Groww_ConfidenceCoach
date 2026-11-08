from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.learning_service import LearningService
from app.schemas.learning import (
    LearningModuleResponse,
    LearningModuleDetailResponse,
    LessonResponse,
)

router = APIRouter(prefix="/learning", tags=["Learning"])


@router.get("/modules", response_model=List[LearningModuleResponse])
def list_learning_modules(db: Session = Depends(get_db)):
    """List all published learning modules in syllabus order."""
    service = LearningService(db)
    return service.get_modules()


@router.get("/modules/{slug}", response_model=LearningModuleDetailResponse)
def get_learning_module(slug: str, db: Session = Depends(get_db)):
    """Get a learning module by slug, including its constituent lessons."""
    service = LearningService(db)
    module = service.get_module_by_slug(slug)
    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Learning module with slug '{slug}' not found.",
        )
    return module


@router.get("/modules/{slug}/lessons", response_model=List[LessonResponse])
def get_module_lessons(slug: str, db: Session = Depends(get_db)):
    """Get all lessons under a specific learning module."""
    service = LearningService(db)
    lessons = service.get_module_lessons(slug)
    if not lessons:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No lessons found for module with slug '{slug}'.",
        )
    return lessons


@router.get("/lessons/{lesson_id}", response_model=LessonResponse)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    """Get a specific lesson by ID."""
    service = LearningService(db)
    lesson = service.get_lesson_by_id(lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lesson with ID {lesson_id} not found.",
        )
    return lesson
