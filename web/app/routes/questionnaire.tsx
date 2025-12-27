import {
  Container,
  Stepper,
  Button,
  Group,
  Stack,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import type { Route } from "../+types/root";
import { useState, useRef, useEffect } from "react";
import { PersonalInfoStep } from "../components/questionnaire-steps/personal-info-step";
import { GoalsStep } from "../components/questionnaire-steps/goals-step";
import { PreferencesStep } from "../components/questionnaire-steps/preferences-step";
import { RestrictionsStep } from "../components/questionnaire-steps/restrictions-step";
import type { StepRef } from "../components/questionnaire-steps/types";
import { useFetcher, useNavigate, type ActionFunctionArgs } from "react-router";
import { planDiet, type PlanDietData } from "~/services/plan-diet";
import { dietPlanStorageKey } from "~/services/get-diet-plan";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Questionnaire - AI Diet Planner" },
    {
      name: "description",
      content: "Answer a few questions to get your personalized meal plan",
    },
  ];
}

export default function Questionnaire() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const personalInfoRef = useRef<StepRef>(null);
  const goalsRef = useRef<StepRef>(null);
  const preferencesRef = useRef<StepRef>(null);
  const restrictionsRef = useRef<StepRef>(null);
  const isSubmitting = fetcher.state === "submitting";
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Personal Info",
      description: "Tell us about yourself",
      component: PersonalInfoStep,
      localStorageKey: "questionnaire-personal-info",
      ref: personalInfoRef,
    },
    {
      label: "Goals",
      description: "What are your goals?",
      component: GoalsStep,
      localStorageKey: "questionnaire-goals",
      ref: goalsRef,
    },
    {
      label: "Restrictions",
      description: "Any restrictions or conditions",
      component: RestrictionsStep,
      localStorageKey: "questionnaire-restrictions",
      ref: restrictionsRef,
    },
    {
      label: "Preferences",
      description: "Your meal preferences",
      component: PreferencesStep,
      localStorageKey: "questionnaire-preferences",
      ref: preferencesRef,
    },
  ];
  const totalSteps = steps.length;
  const isLastStep = activeStep === totalSteps - 1;
  const currentStepRef = steps[activeStep].ref;

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStepRef?.current?.validateAndSave()) {
      if (activeStep < totalSteps) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleSubmit = () => {
    if (currentStepRef?.current?.validateAndSave()) {
      const personalInfo = JSON.parse(
        localStorage.getItem("questionnaire-personal-info") || "{}"
      );
      const goals = JSON.parse(
        localStorage.getItem("questionnaire-goals") || "{}"
      );
      const preferences = JSON.parse(
        localStorage.getItem("questionnaire-preferences") || "{}"
      );
      const restrictions = JSON.parse(
        localStorage.getItem("questionnaire-restrictions") || "{}"
      );
      const questionnaireData = {
        ...personalInfo,
        ...goals,
        ...preferences,
        ...restrictions,
      };
      fetcher.submit(
        { questionnaireData: JSON.stringify(questionnaireData) },
        { method: "post" }
      );
    }
  };

  useEffect(() => {
    if (fetcher.data?.success) {
      localStorage.setItem(
        dietPlanStorageKey,
        JSON.stringify(fetcher.data.dietPlan)
      );
      navigate("/my-diet");
    }
  }, [fetcher.data, navigate]);

  if (isSubmitting) {
    return (
      <Center h="80vh">
        <Stack align="center" gap="lg">
          <Loader size="xl" type="dots" />
          <Text size="lg" c="dimmed">
            Creating your personalized diet plan, this may take a minute...
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Container size="md" py={40}>
      <Stack gap="xl">
        <Stepper active={activeStep}>
          {steps.map((step, index) => {
            const StepComponent = step.component;
            return (
              <Stepper.Step
                key={index}
                label={step.label}
                description={step.description}
              >
                <StepComponent
                  ref={step.ref}
                  localStorageKey={step.localStorageKey}
                />
              </Stepper.Step>
            );
          })}
        </Stepper>

        <Group justify="space-between" mt="xl">
          <Button
            variant="default"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            ← BACK
          </Button>
          <Button
            variant="filled"
            onClick={isLastStep ? handleSubmit : handleNext}
          >
            {isLastStep ? "SUBMIT" : "NEXT →"}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const questionnaireData = JSON.parse(
    formData.get("questionnaireData") as string
  ) as PlanDietData;
  const dietPlan = await planDiet(questionnaireData);
  return { dietPlan, success: true };
};
