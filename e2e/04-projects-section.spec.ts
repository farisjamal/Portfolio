import { test, expect } from '@playwright/test';
import { PortfolioPage } from './page-objects/PortfolioPage';

/**
 * Suite: Projects Section
 *
 * The portfolio has 6 security-focused projects rendered as image cards
 * inside a 3-column grid. Each card opens a modal with details.
 *
 * Covers:
 * - "Projects" heading is visible
 * - All 6 project cards are rendered
 * - Each card has an image with a non-empty alt attribute
 * - Each card shows a title and category badge
 * - Clicking a card opens a modal
 * - Modal contains the project title
 * - Modal has Cancel and Visit buttons
 * - Visit button opens an external link (GitHub)
 */

const EXPECTED_PROJECTS = [
  'System e-Prihatin UTHM',
  'Secure AI Property Appointment System',
  'Secure File Management System',
  'Network Security Sandbox',
  'DDoS Mitigation System',
  'Network Design for E-Commerce',
];

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    // Scroll projects into view so images load
    await portfolio.scrollToSection('projects');
    await page.waitForTimeout(800);
  });

  test('"Projects" section heading is visible', async ({ page }) => {
    const heading = page.locator('#projects').getByText(/projects/i).first();
    await expect(heading).toBeVisible({ timeout: 8000 });
  });

  test('renders exactly 6 project cards', async ({ page }) => {
    // Each card is a ModalTrigger wrapping a relative div with an Image
    const cards = page.locator('#projects img');
    await expect(cards).toHaveCount(6, { timeout: 10000 });
  });

  test('all project images have non-empty alt attributes', async ({ page }) => {
    const images = page.locator('#projects img');
    const count = await images.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} should have a non-empty alt attribute`).toBeTruthy();
    }
  });

  test('each project title is visible in the grid', async ({ page }) => {
    for (const title of EXPECTED_PROJECTS) {
      const titleEl = page.locator('#projects').getByText(title, { exact: false }).first();
      await expect(titleEl).toBeVisible({ timeout: 8000 });
    }
  });

  test('first project card opens a modal on click', async ({ page }) => {
    // Click the first image card
    const firstCard = page.locator('#projects img').first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.click();

    // Modal body should appear
    const modal = page.locator('[role="dialog"], .fixed.inset-0').first();
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    await expect(modal).toBeVisible();
  });

  test('modal shows project title after opening', async ({ page }) => {
    const firstCard = page.locator('#projects img').first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.click();

    // The modal heading contains the first project's title
    const modalHeading = page.getByText('System e-Prihatin UTHM', { exact: false }).first();
    await expect(modalHeading).toBeVisible({ timeout: 5000 });
  });

  test('modal has Cancel button', async ({ page }) => {
    const firstCard = page.locator('#projects img').first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.click();

    const cancelBtn = page.getByRole('button', { name: /cancel/i }).first();
    await expect(cancelBtn).toBeVisible({ timeout: 5000 });
  });

  test('modal has Visit button linking to GitHub', async ({ page }) => {
    const firstCard = page.locator('#projects img').first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.click();

    const visitLink = page.locator('a[href*="github.com"]').filter({
      has: page.getByText(/visit/i),
    }).first();
    await expect(visitLink).toBeVisible({ timeout: 5000 });
  });

  test('Cancel button closes the modal', async ({ page }) => {
    const firstCard = page.locator('#projects img').first();
    await firstCard.waitFor({ state: 'visible', timeout: 8000 });
    await firstCard.click();

    const cancelBtn = page.getByRole('button', { name: /cancel/i }).first();
    await cancelBtn.waitFor({ state: 'visible', timeout: 5000 });
    await cancelBtn.click();

    // Modal should disappear
    await page.waitForTimeout(500);
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveCount(0);
  });

  test('projects screenshot captured', async ({ page }) => {
    await page.screenshot({
      path: 'playwright-report/artifacts/04-projects-section.png',
    });
  });
});
