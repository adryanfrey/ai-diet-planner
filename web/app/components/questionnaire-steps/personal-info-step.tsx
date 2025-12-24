import { Stack, Title, Select, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useImperativeHandle } from "react";
import type { StepRef } from "./types";

interface PersonalInfoData {
  gender: string;
  height: string;
  currentWeight: string;
  age: string;
  activityLevel: string;
}

interface PersonalInfoStepProps {
  localStorageKey: string;
  ref?: React.Ref<StepRef>;
}

export function PersonalInfoStep({
  ref,
  localStorageKey,
}: PersonalInfoStepProps) {
  const form = useForm<PersonalInfoData>({
    initialValues: {
      gender: "",
      height: "",
      currentWeight: "",
      age: "",
      activityLevel: "",
    },
    validate: {
      gender: (value) => (!value ? "Gender is required" : null),
      height: (value) => {
        if (!value) return "Height is required";
        const num = Number(value);
        if (isNaN(num) || num < 90 || num > 250)
          return "Height must be between 90 and 250 cm";
        return null;
      },
      currentWeight: (value) => {
        if (!value) return "Current weight is required";
        const num = Number(value);
        if (isNaN(num) || num < 40 || num > 200)
          return "Weight must be between 40 and 200 kg";
        return null;
      },
      age: (value) => {
        if (!value) return "Age is required";
        const num = Number(value);
        if (isNaN(num) || num <= 16 || num > 80)
          return "Age must be between 16 and 80 years";
        return null;
      },
      activityLevel: (value) => (!value ? "Activity level is required" : null),
    },
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
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
      <Title order={3}>Personal Information</Title>
      <Select
        label="Gender"
        required
        placeholder="Select your gender"
        data={["Male", "Female"]}
        {...form.getInputProps("gender")}
      />
      <NumberInput
        label="Height (cm)"
        required
        placeholder="Enter your height"
        {...form.getInputProps("height")}
      />
      <NumberInput
        label="Current Weight (kg)"
        required
        placeholder="Enter your current weight"
        {...form.getInputProps("currentWeight")}
      />
      <NumberInput
        label="Age"
        required
        placeholder="Enter your age"
        {...form.getInputProps("age")}
      />
      <Select
        label="Activity Level"
        required
        placeholder="Select your activity level"
        data={[
          "Sedentary (little or no exercise)",
          "Lightly active (light exercise 1-3 days/week)",
          "Moderately active (moderate exercise 3-5 days/week)",
          "Very active (hard exercise 6-7 days/week)",
        ]}
        {...form.getInputProps("activityLevel")}
      />
    </Stack>
  );
}
