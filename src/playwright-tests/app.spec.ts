import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title to contain a substring.
  await expect(page).toHaveTitle(/Zendesk Contact Center/);
});

test("navigates to the application", async ({ page }) => {
  await page.goto("/");

  // Basic check that the page loads
  await expect(page.locator("body")).toBeVisible();
});
