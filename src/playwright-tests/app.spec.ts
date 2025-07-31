import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Zendesk Contact Center/);
});

test("navigates to the application", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
});
