import { Card, Title, Text, Badge, Box } from "@mantine/core";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  comingSoon,
}: FeatureCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        position: "relative",
        backgroundColor: comingSoon ? "var(--mantine-color-gray-1)" : "white",
      }}
    >
      {comingSoon && (
        <Badge
          variant="filled"
          color="orange"
          size="sm"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          Coming Soon
        </Badge>
      )}
      <Box style={{ filter: comingSoon ? "grayscale(50%)" : "none" }}>
        <Text size="3rem" mb="md" style={{ textAlign: "center" }}>
          {icon}
        </Text>
        <Title order={3} size="h4" mb="xs" style={{ textAlign: "center" }}>
          {title}
        </Title>
        <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
          {description}
        </Text>
      </Box>
    </Card>
  );
}
