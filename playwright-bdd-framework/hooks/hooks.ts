import fs from 'fs';
import path from 'path';
import { After, Before, Status, World, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { config } from '../config/config';

interface CucumberWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

setDefaultTimeout(120000);

Before(async function (this: CucumberWorld) {
  // Launch the browser and create a fresh browser context for every scenario.
  this.browser = await chromium.launch({
    headless: config.headless,
    args: ['--disable-dev-shm-usage']
  });

  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true
  });

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.timeout);
});

After(async function (this: CucumberWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshotsDir = path.resolve(__dirname, '..', 'screenshots');
      fs.mkdirSync(screenshotsDir, { recursive: true });

      const scenarioName = scenario.pickle?.name ?? 'scenario';
      const screenshotName = `${Date.now()}-${scenarioName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      const screenshotPath = path.join(screenshotsDir, screenshotName);

      try {
        await this.page.screenshot({
          path: screenshotPath,
          fullPage: false,
          animations: 'disabled',
          timeout: 30000
        });

        // Attach the screenshot to the Cucumber HTML report so the test failure is easier to debug.
        await this.attach(fs.readFileSync(screenshotPath), 'image/png');
        console.error(`Scenario failed and screenshot saved at: ${screenshotPath}`);
      } catch (screenshotError) {
        console.error(`Failed to capture screenshot: ${screenshotError}`);
      }
    }
  } finally {
    await this.page?.close().catch(() => undefined);
    await this.context?.close().catch(() => undefined);
    await this.browser?.close().catch(() => undefined);
  }
});
