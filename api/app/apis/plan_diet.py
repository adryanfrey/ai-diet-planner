import logging
from exceptions.plan_diet import PlanDietGuardrailException
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.api_response_models import BaseResponseModel, ErrorResponseModel
from schemas.plan_diet import PostPlanDietRequest
from schemas.diet import DietPlan
from services.plan_diet import DietGeneratorService, get_diet_generator_service

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/",
    responses={
        403: {
            "description": "Request blocked by security guardrail",
            "model": ErrorResponseModel,
        },
        408: {"description": "Request timeout", "model": ErrorResponseModel},
        500: {"description": "Internal server error", "model": ErrorResponseModel},
    },
    summary="AI Diet Planner",
    description="Plan a diet based on the user's information with AI-powered diet planning. Provide the user's information and the diet plan will be generated.",
)
async def plan_diet(
    request: PostPlanDietRequest,
    diet_planner_service: DietGeneratorService = Depends(get_diet_generator_service),
) -> BaseResponseModel[DietPlan]:
    try:
        diet_plan = await diet_planner_service.plan_diet(
            request=request,
        )
        return BaseResponseModel[DietPlan](
            message="Success",
            result=diet_plan,
        )

    except PlanDietGuardrailException as e:
        logger.error(f"Request blocked by input guardrail: {e.message}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Request blocked by input guardrail. Reason: {e.message}",
        )

    except TimeoutError as e:
        logger.error(f"Request timed out: {e}")
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="Request timed out please try again later",
        )

    except Exception:
        logger.exception("Error processing plan diet request")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="There was an internal error",
        )
