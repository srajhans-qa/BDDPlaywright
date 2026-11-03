import { Given, When, Then } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { config } from '../config/config';
import { LoginPage } from '../pages/LoginPage';

type ScenarioWorld = {
  page: Page;
};

const createLoginPage = (page: Page): LoginPage => new LoginPage(page);

Given('I navigate to the login page', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.navigateToLoginPage();
});

When('I enter valid username and password', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
});

When('I enter invalid username and password', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.enterUsername(config.invalidUsername);
  await loginPage.enterPassword(config.invalidPassword);
});

When('I click the login button', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.clickLogin();
});

Then('I should be successfully logged in', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.verifySuccessfulLogin();
});

Then('I should see an error message indicating invalid credentials', async function (this: ScenarioWorld) {
  const loginPage = createLoginPage(this.page);
  await loginPage.verifyInvalidLogin();
});
