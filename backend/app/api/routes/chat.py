from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.chat_service import ChatService
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse,
)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("", response_model=ChatResponse)
def post_chat_message(
    payload: ChatRequest,
    db: Session = Depends(get_db),
):
    """
    Foundational chat contract for SIP Confidence Coach.
    RAG-grounded generative answering scheduled for Phase 5.
    """
    service = ChatService(db)
    return service.process_message(payload)


@router.get("/history/{session_id}", response_model=ChatHistoryResponse)
def get_chat_history(
    session_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve ephemeral conversation history for a given session."""
    service = ChatService(db)
    return service.get_history(session_id)
