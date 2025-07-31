import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/playwright-tests",
  retries: 2,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
