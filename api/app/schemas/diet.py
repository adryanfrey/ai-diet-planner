from typing import Annotated, List, Literal
from pydantic import BaseModel, Field


class Ingredient(BaseModel):
    name: Annotated[
        str,
        Field(
            ...,
            description="The name of the ingredient example: 'Chicken', 'Rice', 'Eggs', etc.",
        ),
    ]
    quantity: Annotated[
        str,
        Field(
            ...,
            pattern=r"^\d{1,3}%\s*-\s*\d{1,3}%$",
            description="The recommended relative quantity of the ingredient in percentage of the total meal. Format: '20% - 30%'",
        ),
    ]


class Meal(BaseModel):
    name: Annotated[
        Literal["Breakfast", "Lunch", "Dinner", "Snack"],
        Field(..., description="The type of the meal"),
    ]
    ingredients: Annotated[
        List[Ingredient],
        Field(
            ...,
            description="The ingredients for the meal",
        ),
    ]


class DailyMealPlan(BaseModel):
    description: Annotated[
        str,
        Field(
            ...,
            description="The description of the daily meal plan. Contains detailed explanation and reasoning for the daily meal plan",
        ),
    ]
    meals: Annotated[
        List[Meal],
        Field(
            min_length=2,
            max_length=6,
            description="All meals planned for the day",
        ),
    ]


class NutritionInfo(BaseModel):
    protein: Annotated[
        float,
        Field(
            ...,
            description="The amount of protein the pacient should consume per day",
        ),
    ]
    carbohydrates: Annotated[
        float,
        Field(
            ...,
            description="The amount of carbohydrates the pacient should consume per day",
        ),
    ]
    fats: Annotated[
        float,
        Field(
            ...,
            description="The amount of fats the pacient should consume per day",
        ),
    ]
    calories: Annotated[
        float,
        Field(
            ..., description="The amount of calories the pacient should consume per day"
        ),
    ]


class NutritionPlan(BaseModel):
    nutrition_info: Annotated[
        NutritionInfo,
        Field(
            ...,
            description="The nutrition information of the diet",
        ),
    ]
    description: Annotated[
        str,
        Field(
            ...,
            description="Contains detailed explanation and reasoning about the planning of the diet",
        ),
    ]


class DietPlan(NutritionPlan):
    daily_meal_plans: Annotated[
        List[DailyMealPlan],
        Field(
            min_length=3,
            max_length=3,
            description="The daily meal plans for the diet. Fixed value of 3 daily meal plans",
        ),
    ]
