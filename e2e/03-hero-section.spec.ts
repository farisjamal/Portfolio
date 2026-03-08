import { test, expect } from '@playwright/test';
import { PortfolioPage } from './page-objects/PortfolioPage';

/**
 * Suite: Hero Section
 *
 * The hero content is conditionally rendered after the preloader animation
 * completes (controlled by PreloaderContext.isLoading). Tests must wait for
 * the preloader to finish before asserting on hero elements.
 *
 * Covers:
 * - Author name rendered in h1
 * - Subtitle text visible
 * - Resume CTA button present and links externally
 * - "Hire Me" button present and links to #contact
 * - GitHub / LinkedIn social buttons present
 */
test.describe('Hero Section', () => {
  test('hero section is present in the DOM', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await expect(portfolio.heroSection).toBeAttached();
  });

  test('author name appears in h1 after preloader', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const h1 = portfolio.heroHeading;
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    // Config splits "Mohamad Faris" across two lines via <br>
    expect(text?.replace(/\s+/g, ' ').trim()).toMatch(/Mohamad\s*Faris/i);
  });

  test('subtitle "Information Security Student & Developer" is visible', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const subtitle = page.locator('#hero').getByText(/Information Security Student/i);
    await expect(subtitle).toBeVisible();
  });

  test('"Hi, I am" greeting text is visible', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const greeting = page.locator('#hero').getByText(/hi, i am/i);
    await expect(greeting).toBeVisible();
  });

  test('Resume button is visible and points to Google Drive', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const resumeLink = page.locator('#hero a[href*="drive.google.com"]').first();
    await expect(resumeLink).toBeVisible();
    const href = await resumeLink.getAttribute('href');
    expect(href).toContain('drive.google.com');
  });

  test('"Hire Me" button is visible and links to #contact', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const hireMeLink = page.locator('#hero a[href="#contact"]').first();
    await expect(hireMeLink).toBeVisible();
  });

  test('GitHub social button is visible', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const githubLink = page.locator('#hero a[href*="github.com"]').first();
    await expect(githubLink).toBeVisible();
  });

  test('LinkedIn social button is visible', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    const linkedinLink = page.locator('#hero a[href*="linkedin.com"]').first();
    await expect(linkedinLink).toBeVisible();
  });

  test('hero screenshot captured after preloader', async ({ page }) => {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.waitForPreloader();

    await page.screenshot({
      path: 'playwright-report/artifacts/03-hero-section.png',
    });
  });
});
