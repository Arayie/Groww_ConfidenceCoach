from fastapi import APIRouter
from app.api.routes import (
    health,
    faqs,
    learning,
    journey,
    glossary,
    calculators,
    chat,
    feedback,
)

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(faqs.router)
api_router.include_router(learning.router)
api_router.include_router(journey.router)
api_router.include_router(glossary.router)
api_router.include_router(calculators.router)
api_router.include_router(chat.router)
api_router.include_router(feedback.router)
