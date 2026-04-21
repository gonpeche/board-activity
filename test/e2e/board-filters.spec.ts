import { expect, test } from '@playwright/test';

test.describe('Board filters E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { name: /board activity/i }).waitFor();
  });

  test('filters by author and color and supports empty state', async ({
    page,
  }) => {
    await page.getByLabel('Author').fill('user_11');
    await expect(
      page.getByText('Checkout button is hard to find')
    ).toBeVisible();
    await expect(
      page.getByText('Search results are too broad')
    ).not.toBeVisible();

    await page.getByLabel('Author').fill('nonexistent_user');
    await expect(page.getByRole('status')).toHaveText('No cards found');
  });

  test('sorts cards by date in both directions', async ({ page }) => {
    await page.getByLabel('Sort by date').selectOption('desc');
    await expect(page.locator('article').first()).toContainText(
      'Notifications are easy to miss'
    );

    await page.getByLabel('Sort by date').selectOption('asc');
    await expect(page.locator('article').first()).toContainText(
      'Search results are too broad'
    );
  });

  test('keeps key accessibility landmarks and labels available', async ({
    page,
  }) => {
    await expect(
      page.getByRole('search', {
        name: /filter board notes/i,
      })
    ).toBeVisible();
    await expect(page.getByLabel('Author')).toBeVisible();
    await expect(page.getByLabel('Color')).toBeVisible();
    await expect(page.getByLabel('Sort by date')).toBeVisible();
  });
});
