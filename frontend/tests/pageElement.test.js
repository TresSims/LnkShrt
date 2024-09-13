const { test, expect } = require("@playwright/test");

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:3001");
  });

  test("check metadata", async ({ page }) => {
    await expect(page).toHaveTitle("LnkShrt");
  });
});
