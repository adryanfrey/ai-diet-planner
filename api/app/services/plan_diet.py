import asyncio
from typing import Any, cast
from agents import (
    Agent,
    GuardrailFunctionOutput,
    InputGuardrail,
    RunContextWrapper,
    Runner,
    input_guardrail,
    trace,
)
from app.schemas.plan_diet import (
    DietPlannerAgentConfig,
    DietPlannerInputGuardrailResult,
    DietPlannerResult,
    PostPlanDietRequest,
)
from app.schemas.plan_diet import DietPlannerResult
from app.prompts.plan_diet import (
    DIET_PLANNER_INPUT_GUARDRAIL_INSTRUCTIONS,
    DIET_PLANNER_PROMPT_TEMPLATE,
)
from app.config import settings
from app.utils.run_with_timeout import run_with_timeout


class DietPlannerService:
    def __init__(
        self,
        agent_config: DietPlannerAgentConfig,
    ):
        self._agent_config = agent_config
        self._agent = self._create_agent()

    def _create_agent(self) -> Agent[DietPlannerResult]:
        return Agent[DietPlannerResult](
            name=self._agent_config.name,
            instructions=self._agent_config.instructions,
            model=self._agent_config.model,
            output_type=DietPlannerResult,
            input_guardrails=[self._create_input_guardrail()],
        )

    def _create_input_guardrail(self) -> InputGuardrail[Any]:
        agent = Agent[DietPlannerInputGuardrailResult](
            name="Diet planner input guardrail agent",
            instructions=DIET_PLANNER_INPUT_GUARDRAIL_INSTRUCTIONS,
            model=settings.GLOBAL_LLM_MODEL,
            output_type=DietPlannerInputGuardrailResult,
        )

        @input_guardrail  # type: ignore[arg-type]
        async def input_guardrail_fn(
            _: RunContextWrapper[Any], _agent: Agent[DietPlannerResult], input: str
        ) -> GuardrailFunctionOutput:
            result = await run_with_timeout(
                lambda: Runner.run(agent, input), self._agent_config.timeout
            )
            return GuardrailFunctionOutput(
                output_info=result.final_output,
                tripwire_triggered=not result.final_output.is_input_safe,
            )

        return input_guardrail_fn

    def _build_prompt(self, request: PostPlanDietRequest) -> str:
        return DIET_PLANNER_PROMPT_TEMPLATE.format(
            **request.model_dump(),
        )

    async def plan_diet(self, request: PostPlanDietRequest) -> DietPlannerResult:
        prompt = self._build_prompt(request)

        with trace("plan-diet"):
            result = await run_with_timeout(
                lambda: Runner.run(self._agent, prompt), self._agent_config.timeout
            )

        return cast(DietPlannerResult, result.final_output)


def get_diet_planner_service() -> DietPlannerService:
    return DietPlannerService(DietPlannerAgentConfig())


if __name__ == "__main__":
    preferences = {
        "gender": "Male",
        "height": 183.0,
        "current_weight": 76.0,
        "age": 23,
        "activity_level": "Moderately active (moderate exercise 3-5 days/week)",
        "target_weight": 80.0,
        "desired_pace": "Slow and steady",
        "number_of_meals_per_day": 4,
        "foods_to_include": "",
        "foods_to_exclude": "",
        "medical_condition": "no",
        "dietary_restrictions": "no",
    }
    request = PostPlanDietRequest(**preferences)  # type: ignore[arg-type]
    service = get_diet_planner_service()
    result = asyncio.run(service.plan_diet(request))
    print(result.model_dump_json())
