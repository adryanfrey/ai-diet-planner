from enum import Enum
from typing import Annotated, List
from pydantic import BaseModel, Field
from schemas.diet import DailyMealPlan, NutritionPlan


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"


class ActivityLevel(str, Enum):
    SEDENTARY = "Sedentary (little or no exercise)"
    LIGHTLY_ACTIVE = "Lightly active (light exercise 1-3 days/week)"
    MODERATELY_ACTIVE = "Moderately active (moderate exercise 3-5 days/week)"
    VERY_ACTIVE = "Very active (hard exercise 6-7 days/week)"


class DesiredPace(str, Enum):
    SLOW = "Slow and steady"
    MODERATE = "Moderate and consistent"
    FAST = "Fast and aggressive"


class PostPlanDietRequest(BaseModel):
    """Request schema for requesting a plan diet"""

    gender: Annotated[Gender, Field(..., description="Gender")]
    age: Annotated[
        int, Field(ge=16, le=80, description="Age in years between 16 and 80")
    ]
    height: Annotated[
        float,
        Field(ge=90, le=250, description="Height in centimeters between 90 and 250"),
    ]
    activity_level: Annotated[ActivityLevel, Field(..., description="Activity level")]
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
        DesiredPace,
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


class InputGuardrailAgentOutput(BaseModel):
    is_input_safe: bool
    reasoning: str


class DietPlannerAgentOutput(NutritionPlan):
    pass


class MealPlannerAgentOutput(BaseModel):
    daily_meal_plans: Annotated[
        List[DailyMealPlan],
        Field(
            min_length=3,
            max_length=3,
            description="The 3 daily meal plans for the diet. Fixed value of 3 daily meal plans",
        ),
    ]
