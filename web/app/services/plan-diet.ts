import { fetchFromAPI } from "~/utils/fetch-api.server";
import type { DietPlan } from "~/types/diet";
import type {
  UserGoalsData,
  UserPersonalInfoData,
  UserPreferencesData,
  UserRestrictionsData,
} from "~/types/questionnaire-data";

export type PlanDietData = UserPersonalInfoData &
  UserGoalsData &
  UserPreferencesData &
  UserRestrictionsData;

export async function planDiet(data: PlanDietData): Promise<DietPlan | null> {
  const response = await fetchFromAPI<DietPlan>({
    url: "/plan-diet",
    method: "POST",
    data: {
      gender: data.gender,
      age: data.age,
      height: data.height,
      activity_level: data.activityLevel,
      current_weight: data.currentWeight,
      target_weight: data.targetWeight,
      desired_pace: data.goalTimeline,
      medical_condition: data.medicalCondition,
      dietary_restrictions: data.dietaryRestriction,
      number_of_meals_per_day: data.mealsPerDay,
      foods_to_exclude: data.foodsToExclude,
      foods_to_include: data.foodsToInclude,
    },
  });
  return response.result;
}
