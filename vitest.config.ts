import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".next", "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        // Общие слои и папки, которые не покрываются тестами
        "src/shared/**",
        // Папки модулей без необходимости покрытия
        "src/**/constants/**",
        "src/**/schemas/**",
        "src/**/model/**",
        "src/**/types/**",
        // Баррели и реэкспорты
        "src/**/index.ts",
        "src/**/index.tsx",
        // Источники Storybook и собранные статики
        ".storybook/**",
        "storybook-static/**",
        "src/**/*.stories.*",
        // Файлы app router и middleware (не цель unit coverage)
        "src/app/**",
        "src/middleware.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        "**/dist/**",
        "**/.next/**",
        "**/tests/e2e/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
});
