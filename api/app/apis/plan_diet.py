import logging
from agents import InputGuardrailTripwireTriggered, OutputGuardrailTripwireTriggered
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from app.schemas.api_response_models import BaseResponseModel, ErrorResponseModel
from app.schemas.plan_diet import DietPlannerResult, PostPlanDietRequest
from app.services.plan_diet import DietPlannerService, get_diet_planner_service

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
    diet_planner_service: DietPlannerService = Depends(get_diet_planner_service),
) -> BaseResponseModel[DietPlannerResult] | JSONResponse:
    try:
        diet_plan = await diet_planner_service.plan_diet(
            request=request,
        )
        return BaseResponseModel[DietPlannerResult](
            message="Success",
            result=diet_plan,
        )

    except InputGuardrailTripwireTriggered as e:
        logger.error(f"Request blocked by input guardrail: {e.guardrail_result}")
        # TODO: Add guardrail reasoning to the response
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={
                "detail": "Request blocked by input guardrail. Reason: ",
            },
        )

    except TimeoutError as e:
        logger.error(f"Request timed out: {e}")
        return JSONResponse(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            content={"detail": "Request timed out please try again later"},
        )

    except Exception:
        logger.exception("Error processing plan diet request")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "There was an internal error"},
        )
