import os
import tempfile
import pytest
from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError

from app.core.database import Base
from app.models.learning import LearningModule, LearningLesson
from app.models.faq import FAQ
from app.models.source import KnowledgeSource
from app.seed.seed_data import seed_all_data


def test_sqlite_foreign_keys_and_cascade():
    """Verify that foreign keys and cascade deletions are strictly enforced by SQLite."""
    temp_fd, temp_path = tempfile.mkstemp(suffix=".db")
    os.close(temp_fd)

    engine = create_engine(f"sqlite:///{temp_path}", connect_args={"check_same_thread": False})

    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSession()

    # 1. Test invalid foreign key raises IntegrityError
    with pytest.raises(IntegrityError):
        invalid_lesson = LearningLesson(
            module_id=9999,  # Does not exist
            title="Orphan Lesson",
            slug="orphan-lesson",
            content="Content",
        )
        db.add(invalid_lesson)
        db.commit()
    db.rollback()

    # 2. Test valid module + lesson, then cascade deletion
    mod = LearningModule(
        title="Test Cascade Module",
        slug="test-cascade-module",
        description="Desc",
        category="Test",
    )
    db.add(mod)
    db.commit()
    db.refresh(mod)

    lesson = LearningLesson(
        module_id=mod.id,
        title="Valid Child Lesson",
        slug="valid-child-lesson",
        content="Lesson body",
    )
    db.add(lesson)
    db.commit()

    # Verify lesson exists
    saved_lesson = db.query(LearningLesson).filter(LearningLesson.module_id == mod.id).first()
    assert saved_lesson is not None

    # Delete parent module
    db.delete(mod)
    db.commit()

    # Verify cascade deleted child lesson
    orphans = db.query(LearningLesson).filter(LearningLesson.module_id == mod.id).all()
    assert len(orphans) == 0

    db.close()
    if os.path.exists(temp_path):
        os.remove(temp_path)


def test_seed_idempotency_and_persistence():
    """Verify seed script runs repeatedly without duplicating or deleting records."""
    temp_fd, temp_path = tempfile.mkstemp(suffix=".db")
    os.close(temp_fd)

    engine = create_engine(f"sqlite:///{temp_path}")
    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSession()

    # First seed
    res1 = seed_all_data(db)
    assert res1["faqs"] == 15
    assert res1["modules"] == 10
    assert res1["journey"] == 7
    assert res1["glossary"] == 20
    assert res1["sources"] == 5

    # Second seed
    res2 = seed_all_data(db)
    assert res2["faqs"] == 0
    assert res2["modules"] == 0
    assert res2["journey"] == 0
    assert res2["glossary"] == 0
    assert res2["sources"] == 0

    # Counts verify no duplicate rows
    assert db.query(FAQ).count() == 15
    assert db.query(LearningModule).count() == 10
    assert db.query(KnowledgeSource).count() == 5

    # Knowledge sources must have verification_status pending_official_review_phase3
    sources = db.query(KnowledgeSource).all()
    for s in sources:
        assert s.verification_status == "pending_official_review_phase3"

    db.close()
    if os.path.exists(temp_path):
        os.remove(temp_path)
