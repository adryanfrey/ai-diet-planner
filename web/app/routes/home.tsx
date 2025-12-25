import { Link } from "react-router";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Button,
  Stack,
  Center,
} from "@mantine/core";
import type { Route } from "./+types/home";
import { FeatureCard } from "../components/feature-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Diet - Personalized Meal Plans" },
    {
      name: "description",
      content:
        "Get personalized meal plans in 2 minutes with AI-powered nutrition suggestions tailored to your goals and preferences.",
    },
  ];
}

export default function Home() {
  const features = [
    {
      icon: "🎯",
      title: "Personalized",
      description: "Plans tailored to your goals and preferences",
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description: "Smart meal suggestions with full nutrition info",
    },
    {
      icon: "💬",
      title: "Adjustable",
      description: "Chat with AI to refine your plan",
    },
  ];

  return (
    <Container size="lg" py={60}>
      <Stack align="center" mb={40}>
        <Title order={1} size="3rem" mb="md">
          AI DIET PLANNER
        </Title>
        <Text size="xl" c="dimmed">
          Get personalized meal plans in 2 minutes
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb={40}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </SimpleGrid>

      <Center>
        <Button component={Link} to="/questionnaire" size="lg" variant="filled">
          GET STARTED →
        </Button>
      </Center>
    </Container>
  );
}
