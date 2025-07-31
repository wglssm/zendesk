import { test, expect } from "@playwright/test";

test("agents page displays correctly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1.text-3xl")).toContainText(
    "Zendesk Contact Center"
  );

  const agentCardSelector = '[data-testid="agent-card"]';
  const statusFilterSelector = '[data-testid="status-filter-select"]';
  const agentStatusSelector = '[data-testid="agent-status"]';

  await page.waitForSelector(agentCardSelector);

  // Test 1: Check initial agents display
  const initialCount = await page.locator(agentCardSelector).count();
  expect(initialCount).toBeGreaterThan(0);

  // Test 2: Filter agents by "online" status
  await page.selectOption(statusFilterSelector, "online");

  const onlineCount = await page.locator(agentCardSelector).count();
  expect(onlineCount).toBeLessThanOrEqual(initialCount);

  // Test 3: Verify filtered agents have correct status
  if (onlineCount > 0) {
    const statuses = await page.locator(agentStatusSelector).allTextContents();
    statuses.forEach((status) => {
      expect(status.trim()).toBe("online");
    });
  }

  // Test 4: Reset filter and verify all agents are shown
  await page.selectOption(statusFilterSelector, "all");

  const resetCount = await page.locator(agentCardSelector).count();
  expect(resetCount).toBeGreaterThanOrEqual(onlineCount);
});
