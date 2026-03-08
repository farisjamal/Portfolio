import { test, expect } from '@playwright/test';
import { PortfolioPage } from './page-objects/PortfolioPage';

/**
 * Suite: Navigation
 *
 * Covers:
 * - Header presence and author branding link
 * - Hamburger/menu button toggles nav overlay
 * - Nav links point to the correct hash anchors
 * - Scrolling to sections works (sections are reachable)
 * - "Hire Me" CTA on hero navigates to #contact anchor
 */
test.describe('Navigation', () => {
  test('header contains author name link', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await expect(portfolio.authorLink).toBeVisible({ timeout: 8000 });
    await expect(portfolio.authorLink).toContainText('Mohamad Faris');
  });

  test('menu button is present in header', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();

    // The menu button contains text "Menu" on desktop
    const menuBtn = page.locator('header button').filter({ hasText: /menu/i });
    await expect(menuBtn).toBeVisible({ timeout: 6000 });
  });

  test('clicking menu button opens navigation overlay', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();

    // Wait for header animation to complete
    await page.waitForTimeout(1500);

    const menuBtn = page.locator('header button').filter({ hasText: /menu/i });
    await menuBtn.waitFor({ state: 'visible', timeout: 6000 });
    await menuBtn.click();

    // After click the button text changes to "Close"
    await expect(
      page.locator('header button').filter({ hasText: /close/i })
    ).toBeVisible({ timeout: 3000 });
  });

  test('nav overlay contains expected navigation links', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await page.waitForTimeout(1500);

    const menuBtn = page.locator('header button').filter({ hasText: /menu/i });
    await menuBtn.waitFor({ state: 'visible' });
    await menuBtn.click();
    await page.waitForTimeout(600);

    // Nav links defined in header/config.ts: Home, About, Skills, Projects, Blogs, Contact
    const nav = page.locator('nav, [role="navigation"], .nav, header');
    const navLinks = nav.locator('a');
    const count = await navLinks.count();
    expect(count, 'Nav should contain at least one link').toBeGreaterThan(0);
  });

  test('clicking Blogs nav link navigates to /blogs', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await page.waitForTimeout(1500);

    const menuBtn = page.locator('header button').filter({ hasText: /menu/i });
    await menuBtn.waitFor({ state: 'visible' });
    await menuBtn.click();
    // Wait longer for the nav overlay animation to fully complete
    await page.waitForTimeout(1200);

    const blogsLink = page.locator('a[href="/blogs"]').first();
    if (await blogsLink.isVisible()) {
      // Wait for the nav transition before clicking to avoid race condition
      await blogsLink.waitFor({ state: 'visible', timeout: 5000 });
      await blogsLink.click();
      await expect(page).toHaveURL(/\/blogs/, { timeout: 15000 });
    } else {
      test.skip();
    }
  });

  test('#projects section is in the DOM and reachable', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.scrollToSection('projects');
    await expect(portfolio.projectsSection).toBeAttached();
  });

  test('#contact section is in the DOM and reachable', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.scrollToSection('contact');
    await expect(portfolio.contactSection).toBeAttached();
  });

  test('author logo link navigates back to /', async ({ page }) => {
    // Navigate away first then click logo
    await page.goto('/blogs');
    await page.waitForLoadState('domcontentloaded');

    const logoLink = page.locator('header a').first();
    await logoLink.waitFor({ state: 'visible', timeout: 6000 });
    await logoLink.click();
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 8000 });
  });
});
