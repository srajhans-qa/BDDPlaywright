import { Locator, Page } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryList = page.locator('.inventory_list');
  }

  async navigateToLoginPage(): Promise<void> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.page.goto(config.baseUrl, {
          waitUntil: 'domcontentloaded',
          timeout: config.timeout + 15000
        });

        await this.usernameInput.waitFor({
          state: 'visible',
          timeout: config.timeout + 15000
        });

        return;
      } catch (error) {
        lastError = error as Error;
        await this.page.waitForTimeout(2000);
      }
    }

    throw lastError ?? new Error('Failed to navigate to the login page.');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: config.timeout }).catch(() => undefined);
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.page.waitForTimeout(3000);

    const bodyText = await this.page.locator('body').textContent();
    if (!bodyText || !bodyText.includes('Products')) {
      const currentUrl = this.page.url();
      throw new Error(`Expected Products page after login but found body content: ${bodyText ?? 'empty'} at URL: ${currentUrl}`);
    }
  }

  async verifyInvalidLogin(): Promise<void> {
    await this.errorMessage.waitFor({
      state: 'visible',
      timeout: config.timeout
    });

    const errorText = await this.errorMessage.textContent();
    if (!errorText || !errorText.includes('Username and password do not match')) {
      throw new Error(`Expected invalid login error message but got: ${errorText ?? 'No message'}`);
    }
  }
}
