from typing import Annotated, List, Literal
from pydantic import BaseModel, Field


class Macros(BaseModel):
    protein: Annotated[
        float,
        Field(
            ...,
            description="The amount of protein the user should consume per day in grams",
        ),
    ]
    carbohydrates: Annotated[
        float,
        Field(
            ...,
            description="The amount of carbohydrates the user should consume per day in grams",
        ),
    ]
    fats: Annotated[
        float,
        Field(
            ...,
            description="The amount of fats the user should consume per day in grams",
        ),
    ]


class Ingredient(BaseModel):
    name: Annotated[
        str,
        Field(
            ...,
            description="The name of the ingredient example: 'Chicken', 'Rice', 'Eggs', etc.",
        ),
    ]
    quantity: Annotated[
        float, Field(..., description="The quantity of the ingredient in grams")
    ]
    macros: Annotated[
        Macros,
        Field(
            ...,
            description="The macro nutrients for the ingredient in grams",
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
    meals: Annotated[
        List[Meal],
        Field(
            min_length=2,
            max_length=6,
            description="All meals planned for the day",
        ),
    ]
