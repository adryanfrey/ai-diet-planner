import {
  Text,
  Paper,
  Group,
  Stack,
  RingProgress,
  ThemeIcon,
  Spoiler,
} from "@mantine/core";
import {
  IconFlame,
  IconMeat,
  IconBread,
  IconDroplet,
} from "@tabler/icons-react";
import type { NutritionInfo } from "~/types/diet";

interface NutritionOverviewProps {
  nutritionInfo: NutritionInfo;
  description: string;
}

export function NutritionOverview({
  nutritionInfo,
  description,
}: NutritionOverviewProps) {
  const totalMacros =
    nutritionInfo.protein + nutritionInfo.carbohydrates + nutritionInfo.fats;

  const macros = [
    {
      label: "Protein",
      value: nutritionInfo.protein,
      percentage: (nutritionInfo.protein / totalMacros) * 100,
      color: "red",
      icon: IconMeat,
    },
    {
      label: "Fats",
      value: nutritionInfo.fats,
      percentage: (nutritionInfo.fats / totalMacros) * 100,
      color: "yellow",
      icon: IconDroplet,
    },
    {
      label: "Carbs",
      value: nutritionInfo.carbohydrates,
      percentage: (nutritionInfo.carbohydrates / totalMacros) * 100,
      color: "blue",
      icon: IconBread,
    },
  ];

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder mb={40}>
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="xl">
        <Stack gap="xs">
          <Group gap="xs">
            <ThemeIcon size="lg" variant="light" color="orange">
              <IconFlame size={20} />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              {nutritionInfo.calories.toLocaleString()} kcal
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            Daily calorie target
          </Text>
        </Stack>

        <Group gap="xl" wrap="wrap">
          <RingProgress
            size={120}
            thickness={12}
            roundCaps
            sections={macros.map((macro) => ({
              value: macro.percentage,
              color: macro.color,
            }))}
            label={
              <Text ta="center" size="xs" fw={600}>
                Macros
              </Text>
            }
          />

          <Stack gap="sm">
            {macros.map((macro) => (
              <Group key={macro.label} gap="xs">
                <ThemeIcon size="sm" variant="light" color={macro.color}>
                  <macro.icon size={14} />
                </ThemeIcon>
                <Text size="sm">
                  <Text span fw={600}>
                    {macro.value}g
                  </Text>{" "}
                  {macro.label}
                </Text>
              </Group>
            ))}
          </Stack>
        </Group>
      </Group>

      <Spoiler maxHeight={80} showLabel="View more" hideLabel="View less">
        <Text size="sm" c="dimmed" mt="lg">
          {description}
        </Text>
      </Spoiler>
    </Paper>
  );
}
