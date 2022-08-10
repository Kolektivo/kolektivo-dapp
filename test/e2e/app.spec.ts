import { expect, test } from '@playwright/test';

const BASE_URL = process.env.URL ?? 'http://localhost:9000/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test.describe('App', () => {
  test('correct URL', ({ page }) => {
    expect(page.url()).toBe(BASE_URL);
  });
});
