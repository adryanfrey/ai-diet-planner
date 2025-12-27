import { Stack, Title, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useImperativeHandle } from "react";
import type { StepRef } from "./types";
import type { UserRestrictionsData } from "~/types/questionnaire-data";

interface RestrictionsStepProps {
  localStorageKey: string;
  ref?: React.Ref<StepRef>;
}

export function RestrictionsStep({
  ref,
  localStorageKey,
}: RestrictionsStepProps) {
  const form = useForm<UserRestrictionsData>({
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
