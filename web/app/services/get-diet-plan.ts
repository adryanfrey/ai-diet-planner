import type { DietPlan } from "~/types/diet";

export const dietPlanStorageKey = "dietPlan";

export function getDietPlan(): DietPlan | null {
  const dietPlan = localStorage.getItem(dietPlanStorageKey);
  return dietPlan ? JSON.parse(dietPlan) : null;
}
