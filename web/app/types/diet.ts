export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Meal {
  name: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  ingredients: Ingredient[];
}

export interface DailyMealPlan {
  description: string;
  meals: Meal[];
}

export interface NutritionInfo {
  protein: number;
  carbohydrates: number;
  fats: number;
  calories: number;
}

export interface DietPlan {
  nutrition_info: NutritionInfo;
  description: string;
  daily_meal_plans: DailyMealPlan[];
}
