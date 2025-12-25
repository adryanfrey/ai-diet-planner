import { Stack, Title, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useImperativeHandle } from "react";
import type { StepRef } from "./types";

interface PreferencesData {
  mealsPerDay: string;
  foodsToInclude: string;
  foodsToExclude: string;
}

interface PreferencesStepProps {
  localStorageKey: string;
  ref?: React.Ref<StepRef>;
}

export function PreferencesStep({
  ref,
  localStorageKey,
}: PreferencesStepProps) {
  const form = useForm<PreferencesData>({
    initialValues: {
      mealsPerDay: "",
      foodsToInclude: "",
      foodsToExclude: "",
    },
    validate: {
      mealsPerDay: (value) =>
        !value ? "Number of meals per day is required" : null,
      foodsToInclude: () => null,
      foodsToExclude: () => null,
    },
  });

  useImperativeHandle(ref, () => ({
    validateAndSave: () => {
      const result = form.validate();
      if (!result.hasErrors) {
        localStorage.setItem(localStorageKey, JSON.stringify(form.values));
        return true;
      }
      return false;
    },
  }));

  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      form.setValues(parsed);
    }
  }, []);

  return (
    <Stack gap="md" mt="xl">
      <Title order={3}>Meal Preferences</Title>
      <Select
        label="How many meals a day"
        placeholder="Select number of meals"
        required
        // TODO: Add enum values
        data={["2", "3", "4", "5", "6"]}
        {...form.getInputProps("mealsPerDay")}
      />
      <Textarea
        label="Foods to include"
        placeholder="List any foods you'd like to include in your meal plan"
        minRows={3}
        {...form.getInputProps("foodsToInclude")}
      />
      <Textarea
        label="Foods to exclude"
        placeholder="List any foods you'd like to exclude from your meal plan"
        minRows={3}
        {...form.getInputProps("foodsToExclude")}
      />
    </Stack>
  );
}
