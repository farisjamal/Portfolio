import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Mohamad Faris Portfolio
 *
 * The site has a preloader animation that runs for ~3 seconds on first load.
 * Most interactive content is hidden until isLoading === false in the preloader
 * context, so tests must wait for the preloader to finish before asserting on
 * hero content.
 */
export class PortfolioPage {
  readonly page: Page;

  // Header / navigation
  readonly header: Locator;
  readonly menuButton: Locator;
  readonly authorLink: Locator;

  // Sections (identified by their id attributes set in SectionWrapper)
  readonly heroSection: Locator;
  readonly projectsSection: Locator;
  readonly contactSection: Locator;
  readonly skillsSection: Locator;
  readonly experienceSection: Locator;

  // Hero content
  readonly heroHeading: Locator;
  readonly heroSubtitle: Locator;
  readonly resumeButton: Locator;
  readonly hireMeButton: Locator;

  // Projects
  readonly projectCards: Locator;

  // Contact form
  readonly contactForm: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.header = page.locator('header');
    this.menuButton = page.locator('header button', { hasText: /menu/i });
    this.authorLink = page.locator('header a', { hasText: /Mohamad Faris/i });

    // Sections
    this.heroSection = page.locator('#hero');
    this.projectsSection = page.locator('#projects');
    this.contactSection = page.locator('#contact');
    this.skillsSection = page.locator('#skills');
    this.experienceSection = page.locator('#experience');

    // Hero content — rendered only after preloader finishes
    this.heroHeading = page.locator('#hero h1');
    this.heroSubtitle = page.locator('#hero', { hasText: /Information Security/i });
    this.resumeButton = page.locator('#hero a[href*="drive.google.com"]').first();
    this.hireMeButton = page.locator('#hero a[href="#contact"]').first();

    // Projects
    this.projectCards = page.locator('#projects .relative.w-\\[400px\\]');

    // Contact form
    this.contactForm = page.locator('form');
    this.fullNameInput = page.locator('#fullname');
    this.emailInput = page.locator('#email');
    this.messageTextarea = page.locator('#content');
    this.submitButton = page.locator('form button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  /**
   * Wait for the preloader to disappear.
   * The preloader is a full-screen overlay; once it's gone the hero content
   * becomes visible. We wait up to 10 s — the animation is ~3–4 s.
   */
  async waitForPreloader() {
    // Wait until the hero h1 (rendered only post-preloader) is visible
    await this.page
      .locator('#hero h1')
      .waitFor({ state: 'visible', timeout: 12000 });
  }

  async scrollToSection(sectionId: string) {
    await this.page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, sectionId);
    // Allow smooth-scroll animation to settle
    await this.page.waitForTimeout(800);
  }

  async openNavMenu() {
    await this.menuButton.click();
    // Wait for nav overlay to animate in
    await this.page.waitForTimeout(500);
  }
}
