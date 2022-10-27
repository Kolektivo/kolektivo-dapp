import { expect, test } from '@playwright/test';

const BASE_URL = process.env.URL ?? 'http://localhost:9000/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Treasury' }).click();
  expect(page.locator('k-text:has-text("Current Price") span')).not.toBeNull();
  expect(page.locator('k-text:has-text("Kolektivo Treasury Token (KTT)") span')).not.toBeNull();
  expect(page.locator('k-text:has-text("Kolektivo Network Treasury") span')).not.toBeNull();
});
