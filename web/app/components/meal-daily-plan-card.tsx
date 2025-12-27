import {
  Card,
  Stack,
  Group,
  Title,
  Text,
  Divider,
  Badge,
  HoverCard,
  ActionIcon,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import type { DailyMealPlan } from "~/types/diet";

interface MealDailyPlanCardProps {
  title: string;
  plan: DailyMealPlan;
}

export function MealDailyPlanCard({ plan, title }: MealDailyPlanCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={3} size="h4">
            {title}
          </Title>
          <Group gap="xs">
            <Badge size="lg" variant="light">
              {plan.meals.length} meals
            </Badge>
            <HoverCard width={280} shadow="md" withArrow>
              <HoverCard.Target>
                <ActionIcon variant="subtle" size="sm" color="blue">
                  <IconInfoCircle size={18} />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="sm">{plan.description}</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
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
            {plan.meals.map((meal) => (
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
      </Stack>
    </Card>
  );
}
