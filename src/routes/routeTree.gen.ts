// src/routes/routeTree.gen.ts
import { Route } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import UserDetailsQueryClint from "../components/UserDetailsQueryClint";

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
});

const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "user/$user",
  component: UserDetailsQueryClint,
});

export const routeTree = rootRoute.addChildren([indexRoute, userRoute]);
