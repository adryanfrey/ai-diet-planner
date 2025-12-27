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
              maxHeight: "300px",
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
                      • {ingredient.name} ({ingredient.quantity})
                    </Text>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Divider />

        <Group justify="flex-end" mt="auto">
          <Button variant="light">View Details</Button>
        </Group>
      </Stack>
    </Card>
  );
}
