import os
from pathlib import Path
from typing import Generator
from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.config import settings

# Ensure SQLite directory exists
db_path_str = settings.DATABASE_PATH
db_path = Path(db_path_str)
db_dir = db_path.parent
db_dir.mkdir(parents=True, exist_ok=True)

# Create engine
database_url = settings.get_database_url()
is_sqlite = database_url.startswith("sqlite")

connect_args = {"check_same_thread": False} if is_sqlite else {}

engine = create_engine(
    database_url,
    connect_args=connect_args,
    echo=False,
)

# Enforce SQLite foreign keys, WAL mode, and busy_timeout
if is_sqlite:
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA busy_timeout=5000")
        cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency yielding a managed database session.
    Automatically closes the session upon request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_db_connection() -> bool:
    """Check whether the database is responsive."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception:
        return False


def init_db(auto_seed: bool = True) -> None:
    """
    Create tables if they don't exist and optionally seed initial data.
    Idempotent and safe to run on startup.
    """
    # Import all models to register with Base.metadata
    from app import models  # noqa: F401

    # Create directory if not exists
    db_path.parent.mkdir(parents=True, exist_ok=True)

    # Create tables
    Base.metadata.create_all(bind=engine)

    if auto_seed:
        from app.seed.seed_data import seed_all_data
        db = SessionLocal()
        try:
            seed_all_data(db)
        finally:
            db.close()
