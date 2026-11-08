from fastapi import APIRouter
from app.schemas.calculator import (
    SIPFutureValueRequest,
    GoalSIPRequest,
    ContributionRequest,
    UnitsRequest,
    CalculatorResponse,
)

router = APIRouter(prefix="/calculators", tags=["Calculators"])


@router.post("/sip", response_model=CalculatorResponse)
def calculate_sip_future_value(payload: SIPFutureValueRequest):
    """
    SIP Future Value calculation interface.
    Server calculation engine scheduled for Phase 4.
    """
    return CalculatorResponse(
        status="phase_4_pending",
        message="Backend deterministic calculation engine is scheduled for implementation in Phase 4. Use client-side illustrative computation.",
        calculator_type="sip_future_value",
        request_data=payload.model_dump(),
    )


@router.post("/goal", response_model=CalculatorResponse)
def calculate_goal_sip(payload: GoalSIPRequest):
    """
    Goal-based SIP calculation interface.
    Server calculation engine scheduled for Phase 4.
    """
    return CalculatorResponse(
        status="phase_4_pending",
        message="Backend goal SIP calculation engine is scheduled for implementation in Phase 4. Use client-side illustrative computation.",
        calculator_type="goal_sip",
        request_data=payload.model_dump(),
    )


@router.post("/contribution", response_model=CalculatorResponse)
def calculate_contribution(payload: ContributionRequest):
    """
    Total contribution calculation interface.
    Server calculation engine scheduled for Phase 4.
    """
    return CalculatorResponse(
        status="phase_4_pending",
        message="Backend contribution accumulator is scheduled for implementation in Phase 4. Use client-side computation.",
        calculator_type="contribution_summary",
        request_data=payload.model_dump(),
    )


@router.post("/units", response_model=CalculatorResponse)
def calculate_units(payload: UnitsRequest):
    """
    Unit allocation & rupee-cost averaging demo calculation interface.
    Server calculation engine scheduled for Phase 4.
    """
    return CalculatorResponse(
        status="phase_4_pending",
        message="Backend unit allocation demo engine is scheduled for implementation in Phase 4. Use client-side illustrative computation.",
        calculator_type="unit_allocation",
        request_data=payload.model_dump(),
    )
