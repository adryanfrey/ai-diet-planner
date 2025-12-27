import { Container, Title, Text, SimpleGrid } from "@mantine/core";
import type { Route } from "./+types/my-diet";
import { planDiet } from "../services/plan-diet";
import { MealDailyPlanCard } from "../components/meal-daily-plan-card";
import { useLoaderData } from "react-router";
import { NutritionOverview } from "../components/nutrition-overview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Diet - AI Diet Planner" },
    {
      name: "description",
      content: "View your personalized diet plan",
    },
  ];
}

export const loader = async () => {
  const dietPlan = planDiet();
  return { dietPlan };
};

export default function MyDiet() {
  const { dietPlan } = useLoaderData<typeof loader>();

  return (
    <Container size="lg" py={40}>
      <Title order={1} size="3rem">
        My Diet Plan
      </Title>
      <Text size="xl" c="dimmed" mb={30}>
        Your personalized diet
      </Text>
      <NutritionOverview
        nutritionInfo={dietPlan.nutrition_info}
        description={dietPlan.description}
      />

      <Title order={2} size="h3" mb="lg">
        Meal Plan Options
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {dietPlan.daily_meal_plans.map((plan, index) => (
          <MealDailyPlanCard
            key={index}
            plan={plan}
            title={`Option ${index + 1}`}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
