from typing import Annotated, Dict, Literal
from pydantic import BaseModel, Field
from app.schemas.plan_diet import (
    Gender,
    ActivityLevel,
    DesiredPace,
)
from agents import function_tool


class CalorieTargets(BaseModel):
    calories_per_day: Annotated[
        float,
        Field(
            ...,
            description="Target daily calorie intake adjusted for activity level and weight goals",
        ),
    ]
    macros: Annotated[
        Dict[Literal["protein", "carbohydrates", "fats"], float],
        Field(
            ...,
            description="Daily macronutrient targets in grams for protein, carbohydrates, and fats",
        ),
    ]


@function_tool
def calculate_calorie_targets_tool(
    gender: Gender,
    current_weight: float,
    height: float,
    age: int,
    activity_level: ActivityLevel,
    desired_pace: DesiredPace,
    target_weight: float,
    protein_per_kg_of_weight: float,
    fats_per_kg_of_weight: float,
) -> CalorieTargets:
    """
    Calculate daily calorie and macro targets using the Mifflin-St Jeor formula.

    Computes BMR based on gender, weight, height, and age, then adjusts for activity
    level to get TDEE. A caloric adjustment is applied based on the desired pace
    and whether the goal is weight loss or gain.

    Macro calculations:
    - Protein: calculated based desired protein per kg of weight
    - Fats: calculated based desired fats per kg of weight
    - Carbohydrates: calculated based on the remaining calories after protein and fats are accounted for

    Args:
        gender: User's gender for BMR calculation.
        current_weight: Current weight in kilograms.
        height: Height in centimeters.
        age: Age in years.
        activity_level: Physical activity level for TDEE multiplier.
        desired_pace: Pace of weight change (slow/moderate/fast).
        target_weight: Goal weight in kilograms.
        protein_per_kg_of_weight: Protein per kilogram of weight.
        fats_per_kg_of_weight: Fats per kilogram of weight.

    Returns:
        CalorieTargets containing daily calories and macro breakdown (protein, carbs, fats).
    """
    bmr_formula = {
        Gender.MALE: (10 * current_weight) + (6.25 * height) - (5 * age) + 5,
        Gender.FEMALE: (10 * current_weight) + (6.25 * height) - (5 * age) - 161,
    }
    bmr = bmr_formula[gender]

    activity_multipliers = {
        ActivityLevel.SEDENTARY: 1.2,
        ActivityLevel.LIGHTLY_ACTIVE: 1.375,
        ActivityLevel.MODERATELY_ACTIVE: 1.55,
        ActivityLevel.VERY_ACTIVE: 1.725,
    }
    tdee = bmr * activity_multipliers[activity_level]

    pace_adjustments = {
        DesiredPace.SLOW: 350,
        DesiredPace.MODERATE: 500,
        DesiredPace.FAST: 750,
    }
    adjustment = pace_adjustments[desired_pace]

    if current_weight > target_weight:
        calories_per_day = round(tdee - adjustment)
    else:
        calories_per_day = round(tdee + adjustment)

    protein = round(current_weight * protein_per_kg_of_weight, 1)
    fats = round(current_weight * fats_per_kg_of_weight, 1)
    carbs = round((calories_per_day - (protein * 4) - (fats * 9)) / 4, 1)

    return CalorieTargets(
        calories_per_day=calories_per_day,
        macros={
            "protein": protein,
            "carbohydrates": carbs,
            "fats": fats,
        },
    )
