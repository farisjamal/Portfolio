import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration for Mohamad Faris Portfolio
 * Target: http://localhost:3000 (Next.js dev server)
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // Portfolio has a preloader animation — give it time
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  outputDir: 'playwright-report/artifacts',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Do NOT auto-start dev server; user is expected to run it separately.
  // webServer block is intentionally omitted to keep the config simple.
});
