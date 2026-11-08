# GROWWW SIP Confidence Coach — Backend Service (Phase 2)

Statutory educational REST API built with **FastAPI**, **SQLAlchemy ORM**, **SQLite**, and **Alembic**.

---

## 1. Architecture & Stack

- **Framework**: FastAPI (Python 3.11+)
- **Database**: SQLite with Write-Ahead Logging (WAL) and enforced Foreign Keys
- **ORM & Migrations**: SQLAlchemy 2.0 & Alembic
- **Validation**: Pydantic v2
- **Testing**: pytest & HTTPX TestClient
- **Production Target**: Render Web Service with Persistent Disk (`/var/data`)

---

## 2. Local Setup & Execution

### A. Environment Setup
```bash
# From repository root:
cd backend

# Create virtual environment (if not already created)
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### B. Database Migrations & Initial Seeding
```bash
# Run Alembic migrations to current head
alembic upgrade head

# The database will automatically initialize and seed on startup,
# or you can test manual seeding:
python -c "from app.core.database import SessionLocal; from app.seed.seed_data import seed_all_data; db=SessionLocal(); print(seed_all_data(db)); db.close()"
```

### C. Run the Backend API Server
```bash
# Run local Uvicorn development server on port 8000
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Swagger Interactive Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc API Reference: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- Health Probe: [http://localhost:8000/health](http://localhost:8000/health)

---

## 3. Running Automated Tests

```bash
cd backend
PYTHONPATH=. .venv/bin/pytest tests -v
```

All 22 unit & integration tests run in an isolated temporary SQLite database, verifying foreign key cascades, migration idempotency, search, and CORS policies.

---

## 4. REST Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service and database connectivity status |
| `GET` | `/api/v1/faqs` | List 15 beginner FAQs with category filtering |
| `GET` | `/api/v1/faqs/{id}` | Get FAQ by primary key |
| `GET` | `/api/v1/faqs/search?q=` | Search FAQ questions, answers, and categories |
| `GET` | `/api/v1/learning/modules` | List all 10 learning modules |
| `GET` | `/api/v1/learning/modules/{slug}` | Module details with structured lessons |
| `GET` | `/api/v1/journey/stages` | 7-stage SIP investment lifecycle |
| `GET` | `/api/v1/journey/stages/{id}` | Specific journey stage deep dive |
| `GET` | `/api/v1/glossary` | 20 financial glossary terms |
| `GET` | `/api/v1/glossary/{slug}` | Glossary term definition |
| `GET` | `/api/v1/glossary/search?q=` | Search glossary terms |
| `POST` | `/api/v1/calculators/sip` | SIP future value schema interface (Phase 4 engine) |
| `POST` | `/api/v1/calculators/goal` | Goal-based SIP schema interface (Phase 4 engine) |
| `POST` | `/api/v1/chat` | Foundational chat contract (Phase 5 engine) |
| `GET` | `/api/v1/chat/history/{id}` | Retrieve session conversation messages |
| `POST` | `/api/v1/feedback` | Optional user clarity & product feedback |

---

## 5. Render Deployment Instructions (Persistent SQLite)

1. Connect your repository to Render as a **Web Service**.
2. Set Root Directory to `backend`.
3. Set Build Command: `pip install -r requirements.txt && alembic upgrade head`
4. Set Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Persistent Disk (Crucial)**:
   - Add a Persistent Disk mounted at `/var/data` (size: 1 GB).
   - Add Environment Variable: `DATABASE_PATH=/var/data/growww.db`
   - Set `ENVIRONMENT=production`.
6. Configure `CORS_ALLOWED_ORIGINS` with your production Vercel frontend URL.
