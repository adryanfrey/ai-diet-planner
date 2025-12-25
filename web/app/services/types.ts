interface Macros {
  protein: number;
  carbohydrates: number;
  fats: number;
}

interface Ingredient {
  name: string;
  quantity: number;
  macros: Macros;
}

export interface Meal {
  name: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  ingredients: Ingredient[];
}

interface DailyMealPlan {
  meals: Meal[];
}

export interface DietPlan {
  calories_per_day: number;
  macros: Macros;
  daily_meal_plans: DailyMealPlan[];
}
