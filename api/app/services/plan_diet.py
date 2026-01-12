from typing import cast
from agents import (
    Agent,
    Runner,
    WebSearchTool,
    trace,
)
from pydantic import BaseModel
from schemas.plan_diet import (
    MealPlannerAgentOutput,
    PostPlanDietRequest,
    InputGuardrailAgentOutput,
    DietPlannerAgentOutput,
)
from prompts.plan_diet import (
    INPUT_GUARDRAIL_AGENT_INSTRUCTIONS,
    DIET_PLANNER_AGENT_INSTRUCTIONS,
    DIET_PLANNER_PROMPT_TEMPLATE,
    MEAL_PLANNER_AGENT_INSTRUCTIONS,
    MEAL_PLANNER_PROMPT_TEMPLATE,
)
from config import settings
from utils.calculate_targets_tool import (
    calculate_calorie_targets_tool,
)
from utils.run_with_timeout import run_with_timeout
from exceptions.plan_diet import PlanDietGuardrailException
from schemas.diet import DietPlan


class DietGeneratorServiceConfig(BaseModel):
    timeout: float = 30
    low_cost_llm_model: str = settings.LOW_COST_LLM_MODEL
    high_cost_llm_model: str = settings.HIGH_COST_LLM_MODEL


class DietGeneratorService:
    def __init__(
        self,
        agent_config: DietGeneratorServiceConfig,
    ):
        self.config = agent_config
        self._input_guardrail_agent = self._create_input_guardrail_agent()
        self._meal_planner_agent = self._create_meal_planner_agent()
        self._diet_planner_agent = self._create_diet_planner_agent()

    def _create_input_guardrail_agent(self) -> Agent[InputGuardrailAgentOutput]:
        return Agent[InputGuardrailAgentOutput](
            name="Input guardrail agent",
            instructions=INPUT_GUARDRAIL_AGENT_INSTRUCTIONS,
            model=self.config.low_cost_llm_model,
            output_type=InputGuardrailAgentOutput,
        )

    def _create_meal_planner_agent(self) -> Agent[MealPlannerAgentOutput]:
        return Agent[MealPlannerAgentOutput](
            name="Meal planner agent",
            instructions=MEAL_PLANNER_AGENT_INSTRUCTIONS,
            model=self.config.high_cost_llm_model,
            output_type=MealPlannerAgentOutput,
        )

    def _create_diet_planner_agent(self) -> Agent[DietPlannerAgentOutput]:
        return Agent[DietPlannerAgentOutput](
            name="Diet planner agent",
            instructions=DIET_PLANNER_AGENT_INSTRUCTIONS,
            model=self.config.high_cost_llm_model,
            output_type=DietPlannerAgentOutput,
            tools=[WebSearchTool(), calculate_calorie_targets_tool],
        )

    async def _run_input_guardrail_agent(
        self, request: PostPlanDietRequest
    ) -> InputGuardrailAgentOutput:
        result = await run_with_timeout(
            lambda: Runner.run(self._input_guardrail_agent, request.model_dump_json()),
            self.config.timeout,
        )
        return cast(InputGuardrailAgentOutput, result.final_output)

    async def _run_meal_planner_agent(
        self, diet_plan: DietPlannerAgentOutput, request: PostPlanDietRequest
    ) -> MealPlannerAgentOutput:
        prompt = MEAL_PLANNER_PROMPT_TEMPLATE.format(
            calories=diet_plan.nutrition_info.calories,
            protein=diet_plan.nutrition_info.protein,
            carbohydrates=diet_plan.nutrition_info.carbohydrates,
            fats=diet_plan.nutrition_info.fats,
            description=diet_plan.description,
            medical_condition=request.medical_condition,
            dietary_restrictions=request.dietary_restrictions,
            foods_to_include=request.foods_to_include,
            foods_to_exclude=request.foods_to_exclude,
            number_of_meals_per_day=request.number_of_meals_per_day,
        )
        result = await run_with_timeout(
            lambda: Runner.run(self._meal_planner_agent, prompt),
            self.config.timeout,
        )
        return cast(MealPlannerAgentOutput, result.final_output)

    async def _run_diet_planner_agent(
        self,
        request: PostPlanDietRequest,
    ) -> DietPlannerAgentOutput:
        prompt = DIET_PLANNER_PROMPT_TEMPLATE.format(**request.model_dump())
        result = await run_with_timeout(
            lambda: Runner.run(self._diet_planner_agent, prompt),
            self.config.timeout,
        )
        return cast(DietPlannerAgentOutput, result.final_output)

    async def plan_diet(
        self,
        request: PostPlanDietRequest,
    ) -> DietPlan:
        with trace("plan-diet"):
            guardrail_result = await self._run_input_guardrail_agent(request)
            if not guardrail_result.is_input_safe:
                raise PlanDietGuardrailException(guardrail_result.reasoning)

            diet_plan = await self._run_diet_planner_agent(request)
            meal_plans = await self._run_meal_planner_agent(diet_plan, request)

            return DietPlan(
                nutrition_info=diet_plan.nutrition_info,
                description=diet_plan.description,
                daily_meal_plans=meal_plans.daily_meal_plans,
            )


def get_diet_generator_service() -> DietGeneratorService:
    return DietGeneratorService(DietGeneratorServiceConfig())
