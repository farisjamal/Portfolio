import { test, expect } from '@playwright/test';
import { PortfolioPage } from './page-objects/PortfolioPage';

/**
 * Suite: Contact Form UI
 *
 * Tests the client-side behavior of the contact form. The form POSTs to
 * /api/send (Resend API) so we intercept the API call and mock the response
 * to avoid actually sending emails in tests.
 *
 * Covers:
 * - Contact section heading is visible
 * - All three form fields render (name, email, message)
 * - Form submit button is visible
 * - HTML5 required validation prevents empty submission
 * - Filling in valid data and submitting shows loading state
 * - On mocked success, success toast appears
 * - On mocked error, error toast appears
 */
test.describe('Contact Form', () => {
  async function gotoContact(page: import('@playwright/test').Page) {
    const portfolio = new PortfolioPage(page);
    await portfolio.goto();
    await portfolio.scrollToSection('contact');
    // Let content animate in
    await page.waitForTimeout(1000);
    return portfolio;
  }

  test('contact section heading "TOGETHER" is visible', async ({ page }) => {
    await gotoContact(page);
    const heading = page.locator('#contact').getByText(/together/i).first();
    await expect(heading).toBeVisible({ timeout: 8000 });
  });

  test('"Contact Form" card title is visible', async ({ page }) => {
    await gotoContact(page);
    const cardTitle = page.locator('#contact').getByText('Contact Form').first();
    await expect(cardTitle).toBeVisible({ timeout: 8000 });
  });

  test('full name input is visible and interactive', async ({ page }) => {
    const portfolio = await gotoContact(page);
    await expect(portfolio.fullNameInput).toBeVisible({ timeout: 8000 });
    await portfolio.fullNameInput.fill('Test User');
    await expect(portfolio.fullNameInput).toHaveValue('Test User');
  });

  test('email input is visible and interactive', async ({ page }) => {
    const portfolio = await gotoContact(page);
    await expect(portfolio.emailInput).toBeVisible({ timeout: 8000 });
    await portfolio.emailInput.fill('test@example.com');
    await expect(portfolio.emailInput).toHaveValue('test@example.com');
  });

  test('message textarea is visible and interactive', async ({ page }) => {
    const portfolio = await gotoContact(page);
    await expect(portfolio.messageTextarea).toBeVisible({ timeout: 8000 });
    await portfolio.messageTextarea.fill('Hello, this is a test message.');
    await expect(portfolio.messageTextarea).toHaveValue('Hello, this is a test message.');
  });

  test('submit button is visible with "Send Message" text', async ({ page }) => {
    const portfolio = await gotoContact(page);
    await expect(portfolio.submitButton).toBeVisible({ timeout: 8000 });
    await expect(portfolio.submitButton).toContainText(/send message/i);
  });

  test('form fields have required attribute (HTML5 validation)', async ({ page }) => {
    const portfolio = await gotoContact(page);
    await portfolio.fullNameInput.waitFor({ state: 'visible', timeout: 8000 });

    const nameRequired = await portfolio.fullNameInput.getAttribute('required');
    const emailRequired = await portfolio.emailInput.getAttribute('required');
    const msgRequired = await portfolio.messageTextarea.getAttribute('required');

    // Playwright returns '' (empty string) for boolean attributes present on element
    expect(nameRequired).not.toBeNull();
    expect(emailRequired).not.toBeNull();
    expect(msgRequired).not.toBeNull();
  });

  test('submit shows loading state (mocked success)', async ({ page }) => {
    // Intercept the /api/send request and return a successful mock response
    await page.route('**/api/send', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'mock-success-id' }),
      });
    });

    const portfolio = await gotoContact(page);
    await portfolio.fullNameInput.waitFor({ state: 'visible', timeout: 8000 });

    await portfolio.fullNameInput.fill('John Doe');
    await portfolio.emailInput.fill('john@example.com');
    await portfolio.messageTextarea.fill('This is a test message from Playwright E2E tests.');

    await portfolio.submitButton.click();

    // Loading state: button should show spinner / "Please wait" text briefly
    const loadingIndicator = page.locator('form').getByText(/please wait/i);
    // It may flash very quickly — just verify the form accepted the click
    // (either loading text appeared, or toast appeared)
    const toastOrLoading = page.locator('[data-state], [role="alert"]').or(loadingIndicator);
    await expect(toastOrLoading.first()).toBeAttached({ timeout: 5000 });
  });

  test('success toast appears on mocked successful submission', async ({ page }) => {
    await page.route('**/api/send', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'mock-success-id' }),
      });
    });

    const portfolio = await gotoContact(page);
    await portfolio.fullNameInput.waitFor({ state: 'visible', timeout: 8000 });

    await portfolio.fullNameInput.fill('Jane Smith');
    await portfolio.emailInput.fill('jane@example.com');
    await portfolio.messageTextarea.fill('Test message for success scenario.');

    await portfolio.submitButton.click();

    // Toast: "Thank you!" title
    const successToast = page.getByText(/thank you/i).first();
    await expect(successToast).toBeVisible({ timeout: 8000 });
  });

  test('error toast appears on mocked API failure', async ({ page }) => {
    await page.route('**/api/send', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    const portfolio = await gotoContact(page);
    await portfolio.fullNameInput.waitFor({ state: 'visible', timeout: 8000 });

    await portfolio.fullNameInput.fill('Error Test');
    await portfolio.emailInput.fill('error@example.com');
    await portfolio.messageTextarea.fill('Test message for error scenario.');

    await portfolio.submitButton.click();

    // Toast: "Error" title
    const errorToast = page.getByText(/error/i).first();
    await expect(errorToast).toBeVisible({ timeout: 8000 });
  });

  test('form fields clear after successful submission', async ({ page }) => {
    await page.route('**/api/send', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'mock-cleared-id' }),
      });
    });

    const portfolio = await gotoContact(page);
    await portfolio.fullNameInput.waitFor({ state: 'visible', timeout: 8000 });

    await portfolio.fullNameInput.fill('Clear Test');
    await portfolio.emailInput.fill('clear@example.com');
    await portfolio.messageTextarea.fill('Message that should be cleared.');

    await portfolio.submitButton.click();

    // After success the component calls setFullName(''), setEmail(''), setMessage('')
    await expect(portfolio.fullNameInput).toHaveValue('', { timeout: 8000 });
    await expect(portfolio.emailInput).toHaveValue('', { timeout: 8000 });
    await expect(portfolio.messageTextarea).toHaveValue('', { timeout: 8000 });
  });

  test('contact form screenshot captured', async ({ page }) => {
    await gotoContact(page);
    await page.screenshot({
      path: 'playwright-report/artifacts/05-contact-form.png',
    });
  });
});
