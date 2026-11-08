import os
import tempfile
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from app.main import app
from app.seed.seed_data import seed_all_data


@pytest.fixture(scope="session")
def test_db_setup():
    # Create temporary file for SQLite
    temp_db_fd, temp_db_path = tempfile.mkstemp(suffix=".db")
    os.close(temp_db_fd)

    test_db_url = f"sqlite:///{temp_db_path}"
    engine = create_engine(test_db_url, connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Create tables and seed data
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_all_data(db)
    db.close()

    yield TestingSessionLocal, engine

    # Cleanup temp db
    if os.path.exists(temp_db_path):
        os.remove(temp_db_path)


@pytest.fixture(scope="function")
def db_session(test_db_setup):
    TestingSessionLocal, _ = test_db_setup
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="function")
def client(test_db_setup):
    TestingSessionLocal, _ = test_db_setup

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
