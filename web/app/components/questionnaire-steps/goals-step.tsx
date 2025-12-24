import { Stack, Title, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useImperativeHandle } from "react";
import type { StepRef } from "./types";

interface GoalsData {
  targetWeight: string;
  goalTimeline: string;
}

interface GoalsStepProps {
  localStorageKey: string;
  ref?: React.Ref<StepRef>;
}

export function GoalsStep({ ref, localStorageKey }: GoalsStepProps) {
  const form = useForm<GoalsData>({
    initialValues: {
      targetWeight: "",
      goalTimeline: "",
    },
    validate: {
      targetWeight: (value) => {
        if (!value) return "Target weight is required";
        const num = Number(value);
        if (isNaN(num) || num < 40 || num > 120)
          return "Target weight must be between 40 and 120 kg";
        return null;
      },
      goalTimeline: (value) => (!value ? "Goal timeline is required" : null),
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
      <Title order={3}>Your Goals</Title>
      <NumberInput
        label="Target Weight (kg)"
        required
        placeholder="Enter your target weight"
        {...form.getInputProps("targetWeight")}
      />
      <Select
        label="How fast to achieve that goal"
        placeholder="Select timeline"
        required
        data={[
          "No specific timeline (recommended)",
          "1-2 months",
          "3-4 months",
          "5-6 months",
          "7-12 months",
          "1-2 years",
        ]}
        {...form.getInputProps("goalTimeline")}
      />
    </Stack>
  );
}
