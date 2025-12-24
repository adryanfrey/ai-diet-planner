import { Stack, Title, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useImperativeHandle } from "react";
import type { StepRef } from "./types";

interface RestrictionsData {
  medicalCondition: string;
  dietaryRestriction: string;
}

interface RestrictionsStepProps {
  localStorageKey: string;
  ref?: React.Ref<StepRef>;
}

export function RestrictionsStep({
  ref,
  localStorageKey,
}: RestrictionsStepProps) {
  const form = useForm<RestrictionsData>({
    initialValues: {
      medicalCondition: "",
      dietaryRestriction: "",
    },
    validate: {
      medicalCondition: () => null,
      dietaryRestriction: () => null,
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
      <Title order={3}>Medical Conditions & Restrictions</Title>
      <Textarea
        label="Any medical condition"
        placeholder="Please list any medical conditions that may affect your diet"
        minRows={3}
        {...form.getInputProps("medicalCondition")}
      />
      <Textarea
        label="Any dietary restriction"
        placeholder="Please list any dietary restrictions (allergies, intolerances, etc.)"
        minRows={3}
        {...form.getInputProps("dietaryRestriction")}
      />
    </Stack>
  );
}
