import { defineConfig } from "astro/config";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
export default defineConfig({
  output: "server", // Enable SSR
  integrations: [react()],
  experimental: {
    viewTransitions: true,
  },
});
