import { Link, useLocation } from "react-router";
import { AppShell, Group, Anchor, Image } from "@mantine/core";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/questionnaire", label: "Questionnaire" },
    { path: "/my-diet", label: "My diet" },
  ];

  return (
    <AppShell
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--mantine-color-teal-6) 5%, transparent), color-mix(in srgb, var(--mantine-color-cyan-6) 40%, transparent))",
      }}
      header={{ height: 80 }}
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          style={{ position: "relative", width: "100%" }}
          visibleFrom="xs"
        >
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/ai-diet-logo.png"
              alt="AI Diet Planner"
              h={50}
              w="auto"
            />
          </Link>
          <Group
            gap="xl"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navigationItems.map((item) => (
              <Anchor
                key={item.path}
                component={Link}
                to={item.path}
                style={{
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path)
                    ? "var(--mantine-color-blue-6)"
                    : "inherit",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
