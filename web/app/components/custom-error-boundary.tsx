import { isRouteErrorResponse } from "react-router";
import {
  Container,
  Button,
  Group,
  Stack,
  Text,
  Paper,
  Title,
  Box,
} from "@mantine/core";
import { IconAlertTriangle, IconHome, IconRefresh } from "@tabler/icons-react";

interface ErrorsConfig {
  statusCode: number;
  icon: React.ComponentType<{ size?: number; stroke?: number; color?: string }>;
  title: string;
  message: string;
  color: string;
}

export function CustomErrorBoundary({
  error,
  errorsConfig,
}: {
  error: unknown;
  errorsConfig: ErrorsConfig[];
}) {
  let statusCode = 500;
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
  }

  const defaultInternalError = {
    icon: IconAlertTriangle,
    color: "var(--mantine-color-red-6)",
    title: "Internal Error",
    message: "Something went wrong on our end. Please try again later.",
  };
  const displayError =
    errorsConfig.find((error) => error.statusCode === statusCode) ||
    defaultInternalError;

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "90vh",
      }}
    >
      <Container size="sm">
        <Paper radius="lg" p="xl" shadow="sm" withBorder maw={400}>
          <Stack align="center" gap="xl" py="xl">
            <Box
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `color-mix(in srgb, ${displayError.color} 10%, transparent)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <displayError.icon
                size={64}
                stroke={1.5}
                color={displayError.color}
              />
            </Box>

            <Stack align="center" gap="sm">
              <Text
                size="sm"
                fw={600}
                tt="uppercase"
                lts={"0.1em"}
                c={displayError.color}
              >
                Error {statusCode}
              </Text>
              <Title order={2} ta="center" fw={700}>
                {displayError.title}
              </Title>
              <Box mah={150} style={{ overflowY: "auto" }}>
                <Text c="dimmed" size="md" ta="center" lh={1.6}>
                  {displayError.message}
                </Text>
              </Box>
            </Stack>

            <Group gap="md" mt="md">
              <Button
                variant="light"
                color="gray"
                size="md"
                leftSection={<IconHome size={18} />}
                component="a"
                href="/"
              >
                Go Home
              </Button>
              <Button
                variant="filled"
                size="md"
                leftSection={<IconRefresh size={18} />}
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Text c="dimmed" size="xs" ta="center" mt="xl">
          If this problem persists, please contact support
        </Text>
      </Container>
    </Box>
  );
}
