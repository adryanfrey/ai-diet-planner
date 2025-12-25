import {
  Card,
  Stack,
  Group,
  Button,
  Title,
  Text,
  Divider,
  Badge,
} from "@mantine/core";
import type { Meal } from "../services/types";

interface MealDailyPlanCardProps {
  meals: Meal[];
  planIndex: number;
}

export function MealDailyPlanCard({
  meals,
  planIndex,
}: MealDailyPlanCardProps) {
  const totalMacros = meals
    .flatMap((meal) => meal.ingredients)
    .reduce(
      (acc, ingredient) => ({
        protein: acc.protein + ingredient.macros.protein,
        carbohydrates: acc.carbohydrates + ingredient.macros.carbohydrates,
        fats: acc.fats + ingredient.macros.fats,
      }),
      { protein: 0, carbohydrates: 0, fats: 0 }
    );

  const totalCalories = Math.round(
    totalMacros.protein * 4 +
      totalMacros.carbohydrates * 4 +
      totalMacros.fats * 9
  );

  const stats = [
    {
      label: "Calories",
      value: totalCalories.toString(),
      size: "lg" as const,
      fw: 700,
    },
    {
      label: "Protein",
      value: `${totalMacros.protein.toFixed(1)}g`,
    },
    {
      label: "Carbs",
      value: `${totalMacros.carbohydrates.toFixed(1)}g`,
    },
    {
      label: "Fats",
      value: `${totalMacros.fats.toFixed(1)}g`,
    },
  ];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3} size="h4">
            Option {planIndex + 1}
          </Title>
          <Badge size="lg" variant="light">
            {meals.length} meals
          </Badge>
        </Group>

        <Divider />

        <Stack gap="md">
          <Text size="sm" fw={600} c="dimmed" tt="uppercase">
            Meals & Ingredients
          </Text>
          <Stack
            gap="md"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {meals.map((meal) => (
              <Stack key={meal.name} gap={4}>
                <Text size="sm" fw={600}>
                  {meal.name}
                </Text>
                <Stack gap={2} pl="md">
                  {meal.ingredients.map((ingredient, idx) => (
                    <Text key={idx} size="xs" c="dimmed">
                      • {ingredient.name} ({ingredient.quantity}g)
                    </Text>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Divider />

        <Stack gap="xs">
          <Text size="sm" fw={600} c="dimmed" tt="uppercase">
            Nutrition Summary
          </Text>
          <Group gap="md">
            {stats.map((item) => (
              <Stack key={item.label} gap={4}>
                <Text size="xs" c="dimmed">
                  {item.label}
                </Text>
                <Text size={item.size || "sm"} fw={item.fw || 600}>
                  {item.value}
                </Text>
              </Stack>
            ))}
          </Group>
        </Stack>

        <Group justify="flex-end" mt="auto">
          <Button variant="light">View Details</Button>
        </Group>
      </Stack>
    </Card>
  );
}
