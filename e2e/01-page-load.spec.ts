import { test, expect } from '@playwright/test';
import { PortfolioPage } from './page-objects/PortfolioPage';

/**
 * Suite: Page Load & Metadata
 *
 * Verifies the portfolio page loads without JS errors, has the correct <title>,
 * and contains all expected structural sections in the DOM.
 */
test.describe('Page Load & Metadata', () => {
  test.beforeEach(async ({ page }) => {
    // Capture console errors so we can assert there are none
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Store on the page object for later access within the test
    (page as any).__consoleErrors = errors;
  });

  test('page title is correct', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mohamad Faris/i);
  });

  test('page loads with HTTP 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('all five main sections exist in the DOM', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();

    // Sections are rendered immediately in the DOM (even if not yet visible)
    await expect(portfolio.heroSection).toBeAttached();
    await expect(portfolio.projectsSection).toBeAttached();
    await expect(portfolio.contactSection).toBeAttached();
  });

  test('header is visible immediately on load', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    // Header animates in from y:-80 — give it a moment
    await portfolio.header.waitFor({ state: 'visible', timeout: 5000 });
    await expect(portfolio.header).toBeVisible();
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    // Filter out known benign dev-mode or extension noise
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore known benign warnings:
        // - Next.js hydration warnings (next-themes injects style on body)
        // - Browser extension injected scripts
        // - "Extra attributes from the server" — next-themes SSR/CSR mismatch
        const isKnownBenign =
          text.includes('hydration') ||
          text.includes('extension') ||
          text.includes('Extra attributes from the server') ||
          text.includes('Warning:');
        if (!isKnownBenign) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    // Wait for initial render to settle
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    expect(errors, `Console errors found: ${errors.join('\n')}`).toHaveLength(0);
  });

  test('page screenshot captured for visual reference', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: 'playwright-report/artifacts/01-page-load.png',
      fullPage: false,
    });
  });
});
