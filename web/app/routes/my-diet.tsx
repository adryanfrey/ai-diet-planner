import {
  SimpleGrid,
  Container,
  Title,
  Text,
  Stack,
  Button,
  Box,
} from "@mantine/core";
import { IconSalad, IconClock } from "@tabler/icons-react";
import { Link } from "react-router";
import type { Route } from "./+types/my-diet";
import { MealDailyPlanCard } from "../components/meal-daily-plan-card";
import { NutritionOverview } from "../components/nutrition-overview";
import { useEffect, useState } from "react";
import type { DietPlan } from "~/types/diet";
import { getDietPlan } from "~/services/get-diet-plan";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Diet - AI Diet Planner" },
    {
      name: "description",
      content: "View your personalized diet plan",
    },
  ];
}

export default function MyDiet() {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  useEffect(() => {
    const dietPlan = getDietPlan();
    setDietPlan(dietPlan);
  }, []);

  if (!dietPlan) {
    return <EmptyState />;
  }

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

function EmptyState() {
  return (
    <Container size="sm" py={80}>
      <Stack align="center" gap="xl">
        <Box
          style={{
            filter: "drop-shadow(0 4px 12px rgba(34, 139, 34, 0.3))",
          }}
        >
          <IconSalad size={80} stroke={1.5} color="#228B22" />
        </Box>

        <Stack align="center" gap="xs">
          <Title order={2} ta="center" c="dark.6">
            No Diet Plan Yet
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={360}>
            Answer a few quick questions and let our AI create a personalized
            diet just for you
          </Text>
        </Stack>

        <Button
          bg="linear-gradient(135deg, var(--mantine-color-teal-6), var(--mantine-color-cyan-6))"
          component={Link}
          to="/questionnaire"
          size="lg"
          variant="filled"
        >
          Create My Diet Plan →
        </Button>

        <Text size="sm" c="dimmed" ta="center">
          <IconClock
            size={16}
            style={{ verticalAlign: "middle", marginRight: 4 }}
          />
          Takes only 2 minutes
        </Text>
      </Stack>
    </Container>
  );
}
