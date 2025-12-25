from typing import Annotated, List, Literal
from pydantic import BaseModel, Field
from app.config import settings
from app.prompts.plan_diet import DIET_PLANNER_AGENT_INSTRUCTIONS
from app.schemas.daily_meal import DailyMealPlan, Macros


class PostPlanDietRequest(BaseModel):
    """Request schema for requesting a plan diet"""

    gender: Annotated[Literal["Male", "Female"], Field(..., description="Gender")]
    age: Annotated[
        int, Field(ge=16, le=80, description="Age in years between 16 and 80")
    ]
    height: Annotated[
        float,
        Field(ge=90, le=250, description="Height in centimeters between 90 and 250"),
    ]
    activity_level: Annotated[
        Literal[
            "Sedentary (little or no exercise)",
            "Lightly active (light exercise 1-3 days/week)",
            "Moderately active (moderate exercise 3-5 days/week)",
            "Very active (hard exercise 6-7 days/week)",
        ],
        Field(..., description="Activity level"),
    ]
    current_weight: Annotated[
        float,
        Field(
            ge=40, le=200, description="Current weight in kilograms between 40 and 200"
        ),
    ]
    target_weight: Annotated[
        float,
        Field(
            ge=40, le=120, description="Target weight in kilograms between 40 and 120"
        ),
    ]
    desired_pace: Annotated[
        Literal["Slow and steady", "Moderate and consistent", "Fast and aggressive"],
        Field(
            ...,
            description="Desired pace to reach your goal of weight loss or gain",
        ),
    ]
    medical_condition: Annotated[
        str, Field(..., description="Any medical condition to be considered")
    ]
    dietary_restrictions: Annotated[
        str, Field(..., description="Any dietary restrictions to be considered")
    ]
    number_of_meals_per_day: Annotated[
        int,
        Field(
            ge=2, le=6, description="Desired number of meals per day between 2 and 6"
        ),
    ]
    foods_to_exclude: Annotated[
        str, Field(..., description="Any foods to exclude from the diet")
    ]
    foods_to_include: Annotated[
        str, Field(..., description="Any foods to include in the diet")
    ]


class DietPlannerAgentConfig(BaseModel):
    name: str = "Diet planner agent"
    instructions: str = DIET_PLANNER_AGENT_INSTRUCTIONS
    model: str = settings.GLOBAL_LLM_MODEL
    timeout: float = 35.0


class DietPlannerInputGuardrailResult(BaseModel):
    is_input_safe: bool
    reasoning: str


class DietPlannerResult(BaseModel):
    calories_per_day: Annotated[
        int,
        Field(
            ..., description="The amount of calories the user should consume per day"
        ),
    ]
    macros: Annotated[
        Macros,
        Field(
            ...,
            description="The macros nutrients the user should consume per day in grams",
        ),
    ]
    daily_meal_plans: Annotated[
        List[DailyMealPlan],
        Field(
            min_length=3,
            max_length=3,
            description="The daily meal plans for the user. Fixed value of 3 daily meal plans",
        ),
    ]
