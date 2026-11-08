import uuid
from typing import List
from sqlalchemy.orm import Session
from app.models.conversation import Conversation, ConversationMessage
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatHistoryResponse,
    ChatMessageSchema,
)


class ChatService:
    def __init__(self, db: Session):
        self.db = db

    def process_message(self, request: ChatRequest) -> ChatResponse:
        session_id = request.session_id or f"session_{uuid.uuid4().hex[:12]}"

        # Find or create conversation
        conversation = (
            self.db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .first()
        )
        if not conversation:
            conversation = Conversation(
                session_id=session_id,
                conversation_title="Educational SIP Inquiry",
            )
            self.db.add(conversation)
            self.db.commit()
            self.db.refresh(conversation)

        # Store user message
        user_msg = ConversationMessage(
            conversation_id=conversation.id,
            role="user",
            message_content=request.message,
        )
        self.db.add(user_msg)

        # In Phase 2: return standard contract response noting Phase 5 AI grounding
        placeholder_reply = (
            "GROWWW SIP Confidence Coach is an educational platform. "
            "The AI retrieval and citation engine will be connected in Phase 5. "
            "To learn SIP fundamentals right now, explore our 10-module curriculum, "
            "the 7-stage SIP journey, or the beginner FAQ on the homepage."
        )

        assistant_msg = ConversationMessage(
            conversation_id=conversation.id,
            role="assistant",
            message_content=placeholder_reply,
        )
        self.db.add(assistant_msg)
        self.db.commit()

        return ChatResponse(
            session_id=session_id,
            message=placeholder_reply,
            status="phase_5_pending",
            disclaimer=(
                "GROWWW is an educational assistant. It does not provide investment advice "
                "or recommend stocks, mutual funds or securities. Full RAG AI Coach scheduled for Phase 5."
            ),
        )

    def get_history(self, session_id: str) -> ChatHistoryResponse:
        conversation = (
            self.db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .first()
        )
        if not conversation:
            return ChatHistoryResponse(session_id=session_id, messages=[])

        messages = [
            ChatMessageSchema(
                role=m.role,
                message_content=m.message_content,
                created_at=m.created_at,
            )
            for m in conversation.messages
        ]
        return ChatHistoryResponse(session_id=session_id, messages=messages)
