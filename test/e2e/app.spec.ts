import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:9000');
});

test.describe('App', () => {
  test('shows message', async ({ page }) => {
    await expect(page.locator('app au-viewport')).toHaveText('Map works!');
  });
});