from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class SIPFutureValueRequest(BaseModel):
    monthly_investment: float = Field(..., ge=500, le=1000000)
    expected_return_rate: float = Field(..., ge=0, le=30)
    time_period_years: int = Field(..., ge=1, le=40)
    contribution_timing: str = Field(default="beginning", pattern="^(beginning|end)$")


class GoalSIPRequest(BaseModel):
    target_amount: float = Field(..., ge=10000, le=100000000)
    time_period_years: int = Field(..., ge=1, le=40)
    expected_return_rate: float = Field(..., ge=0, le=30)


class ContributionRequest(BaseModel):
    amount: float = Field(..., ge=100, le=1000000)
    frequency: str = Field(default="monthly", pattern="^(weekly|monthly|quarterly)$")
    duration_years: int = Field(..., ge=1, le=40)


class UnitsRequest(BaseModel):
    investment_amount: float = Field(..., ge=100, le=1000000)
    nav_per_installment: List[float] = Field(..., min_length=1, max_length=120)


class CalculatorResponse(BaseModel):
    status: str = "phase_4_pending"
    message: str = (
        "Server-side calculation engine scheduled for Phase 4. "
        "Deterministic illustrative formulas are currently rendered on the client."
    )
    calculator_type: str
    request_data: Dict[str, Any]
