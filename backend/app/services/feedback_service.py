from sqlalchemy.orm import Session
from app.models.feedback import UserFeedback
from app.schemas.feedback import FeedbackCreate, FeedbackResponse


class FeedbackService:
    def __init__(self, db: Session):
        self.db = db

    def submit_feedback(self, data: FeedbackCreate) -> FeedbackResponse:
        feedback = UserFeedback(
            page=data.page,
            feedback_type=data.feedback_type,
            feedback_text=data.feedback_text,
            rating=data.rating,
            session_id=data.session_id,
        )
        self.db.add(feedback)
        self.db.commit()
        self.db.refresh(feedback)
        return FeedbackResponse(
            id=feedback.id,
            status="received",
            message="Feedback received successfully. Thank you for helping improve SIP Confidence Coach.",
            created_at=feedback.created_at,
        )
