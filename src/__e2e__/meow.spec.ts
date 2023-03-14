import { expect, test } from '@playwright/test';

const BASE_URL = process.env.URL ?? 'http://localhost:9000/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Reserve' }).click();
  expect(page.locator('k-text:has-text("Reserve Value") span')).not.toBeNull();
});
