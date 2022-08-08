import { expect, test } from '@playwright/test';

const BASE_URL = process.env.URL ?? '';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test.describe('App', () => {
  test('shows message', async ({ page }) => {
    await expect(page.locator('app au-viewport')).toHaveText('Map works!');
  });
});
