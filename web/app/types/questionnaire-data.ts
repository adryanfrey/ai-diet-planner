export interface UserPersonalInfoData {
  gender: "Male" | "Female";
  height: string;
  currentWeight: string;
  age: string;
  activityLevel:
    | "Sedentary (little or no exercise)"
    | "Lightly active (light exercise 1-3 days/week)"
    | "Moderately active (moderate exercise 3-5 days/week)"
    | "Very active (hard exercise 6-7 days/week)";
}

export interface UserGoalsData {
  targetWeight: string;
  goalTimeline:
    | "Slow and steady"
    | "Moderate and consistent"
    | "Fast and aggressive";
}

export interface UserPreferencesData {
  mealsPerDay: "2" | "3" | "4" | "5" | "6";
  foodsToInclude: string;
  foodsToExclude: string;
}

export interface UserRestrictionsData {
  medicalCondition: string;
  dietaryRestriction: string;
}
