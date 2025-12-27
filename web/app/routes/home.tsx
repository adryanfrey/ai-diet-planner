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
import { IconTarget, IconRobot, IconMessageChatbot } from "@tabler/icons-react";
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
      icon: (
        <IconTarget
          size={48}
          stroke={1.5}
          color="var(--mantine-color-teal-6)"
        />
      ),
      title: "Personalized",
      description: "Plans tailored to your goals and preferences",
    },
    {
      icon: (
        <IconRobot size={48} stroke={1.5} color="var(--mantine-color-cyan-6)" />
      ),
      title: "AI-Powered",
      description: "Smart meal suggestions with full nutrition info",
    },
    {
      icon: (
        <IconMessageChatbot
          size={48}
          stroke={1.5}
          color="var(--mantine-color-orange-6)"
        />
      ),
      title: "Adjustable",
      description: "Chat with AI to refine your plan",
      comingSoon: true,
    },
  ];

  return (
    <Container size="lg" py={60}>
      <Stack align="center" mb={40}>
        <Title order={1} size="3rem" mb="md">
          AI DIET PLANNER
        </Title>
        <Text size="xl">Get personalized meal plans in 2 minutes</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb={40}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            comingSoon={feature.comingSoon}
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
