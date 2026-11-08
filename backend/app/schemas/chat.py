from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ChatMessageSchema(BaseModel):
    role: str = Field(..., pattern="^(user|assistant|system)$")
    message_content: str
    created_at: Optional[datetime] = None


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    message: str
    status: str = "phase_5_pending"
    disclaimer: str = (
        "GROWWW is an educational assistant. It does not provide investment advice "
        "or recommend stocks, mutual funds or securities. Full RAG AI Coach scheduled for Phase 5."
    )


class ChatHistoryResponse(BaseModel):
    session_id: str
    messages: List[ChatMessageSchema]
