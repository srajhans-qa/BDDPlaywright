import { defineConfig, devices } from '@playwright/test';

export const playwrightConfig = defineConfig({
  timeout: Number(process.env.TIMEOUT_MS ?? 30000),
  fullyParallel: false,
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium'
      }
    }
  ]
});

export default playwrightConfig;
