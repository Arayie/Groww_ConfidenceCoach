import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.config import settings
from app.core.database import init_db
from app.api.router import api_router
from app.api.routes import health

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("growww_api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan context manager.
    Initializes SQLite tables and seeds initial educational data.
    """
    logger.info("Starting GROWWW SIP Confidence Coach API...")
    try:
        init_db(auto_seed=True)
        logger.info("Database initialized and verified.")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise e
    yield
    logger.info("Shutting down GROWWW SIP Confidence Coach API.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Official-source backed educational REST API for GROWWW SIP Confidence Coach. "
        "Compliant with Indian financial regulations (SEBI, AMFI, RBI). "
        "Strictly educational — no stock/fund tips, no transaction execution."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# CORS Middleware Configuration
origins = settings.CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Session-ID"],
)


# Global Exception Handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Clean, structured validation error responses."""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "detail": exc.errors(),
            "code": "INVALID_INPUT",
        },
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """Safe generic error handler protecting internal SQL or stack traces."""
    logger.error(f"Unhandled exception on {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "detail": "An unexpected error occurred. Please try again later.",
            "code": "INTERNAL_ERROR",
        },
    )


# Root health probe
app.include_router(health.router)

# Versioned API routes under /api/v1
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Root"])
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "status": "online",
        "docs_url": "/docs",
        "statutory_notice": (
            "GROWWW SIP Confidence Coach is an educational platform. "
            "It does not provide investment advice or recommend securities."
        ),
    }
