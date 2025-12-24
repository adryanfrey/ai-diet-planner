import { Card, Title, Text } from "@mantine/core";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="3rem" mb="md" style={{ textAlign: "center" }}>
        {icon}
      </Text>
      <Title order={3} size="h4" mb="xs" style={{ textAlign: "center" }}>
        {title}
      </Title>
      <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
        {description}
      </Text>
    </Card>
  );
}
