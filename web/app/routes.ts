import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("questionnaire", "routes/questionnaire.tsx"),
  route("my-diet", "routes/my-diet.tsx")
] satisfies RouteConfig;
