import { Container, Title, Text, SimpleGrid } from "@mantine/core";
import type { Route } from "./+types/my-diet";
import { planDiet } from "../services/plan-diet";
import { MealDailyPlanCard } from "../components/meal-daily-plan-card";
import { useLoaderData } from "react-router";

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
      {/* TODO: Add calories goal and user pace */}
      <Title order={1} size="3rem">
        My Diet Plan
      </Title>
      <Text size="xl" c="dimmed" mb={40}>
        Your personalized meal plans
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {dietPlan.daily_meal_plans.map((plan, index) => (
          <MealDailyPlanCard
            key={index}
            meals={plan.meals}
            planIndex={index}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
