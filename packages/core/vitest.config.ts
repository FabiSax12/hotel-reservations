import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@hotel/core": path.resolve(__dirname, "./src"),
      "@hotel/db": path.resolve(__dirname, "../db/src"),
    },
  },
});
