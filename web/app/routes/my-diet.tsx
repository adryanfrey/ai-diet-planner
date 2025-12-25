import type { Route } from "./+types/my-diet";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Diet - AI Diet Planner" },
    {
      name: "description",
      content: "View your personalized diet plan",
    },
  ];
}

export default function MyDiet() {
  return <></>;
}

