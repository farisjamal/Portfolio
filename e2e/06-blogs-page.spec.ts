import { test, expect } from '@playwright/test';

/**
 * Suite: Blogs Page
 *
 * The portfolio has a /blogs route served by Next.js.
 * Covers basic rendering without diving into individual blog post content.
 */
test.describe('Blogs Page', () => {
  test('blogs page returns HTTP 200', async ({ page }) => {
    const response = await page.goto('/blogs');
    expect(response?.status()).toBe(200);
  });

  test('blogs page has correct title "Blog | Portfolio"', async ({ page }) => {
    await page.goto('/blogs');
    // The /blogs route has its own metadata: title = "Blog | Portfolio"
    await expect(page).toHaveTitle(/Blog \| Portfolio/i);
  });

  test('blogs page loads without JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('hydration') && !text.includes('extension')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/blogs');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    expect(errors, `Console errors: ${errors.join('\n')}`).toHaveLength(0);
  });

  test('header is visible on blogs page', async ({ page }) => {
    await page.goto('/blogs');
    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 8000 });
  });

  test('blogs page screenshot captured', async ({ page }) => {
    await page.goto('/blogs');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'playwright-report/artifacts/06-blogs-page.png',
    });
  });
});
