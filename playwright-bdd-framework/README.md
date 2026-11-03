# Playwright + Cucumber BDD Framework

This project demonstrates a beginner-friendly BDD automation framework using Playwright and Cucumber with TypeScript. It automates login scenarios on SauceDemo and generates HTML-based test reporting.

## A. Project architecture

```text
playwright-bdd-framework/
├── features/                  # Gherkin feature files
├── step-definitions/         # Cucumber step mappings to TypeScript code
├── pages/                    # Page Object Model classes
├── hooks/                    # Before/After hooks for browser lifecycle
├── config/                  # Environment variables and configuration
├── test-runner/             # Cucumber CLI runner
├── utils/                   # Shared utilities
├── reports/                 # HTML reports and JSON output
├── screenshots/             # Failure screenshots
├── playwright.config.ts     # Browser and Playwright settings
├── tsconfig.json            # TypeScript compiler configuration
├── package.json             # Dependencies and scripts
├── README.md                # Documentation
├── .gitignore               # Ignored files/folders
└── .env.qa/.env.uat        # Environment config files
```

## B. Installation commands

```bash
npm install
```

## C. How to install Playwright browsers

```bash
npx playwright install --with-deps chromium
```

If you are on Windows, the same command works in PowerShell or Command Prompt.

## D. How to configure environment files

The project supports environment-specific configuration using `.env.qa` and `.env.uat` files in the `config` folder.

Example values:

```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
INVALID_USERNAME=locked_out_user
INVALID_PASSWORD=wrong_password
BROWSER=chromium
HEADLESS=true
TIMEOUT_MS=30000
```

Select the environment by setting:

```bash
TEST_ENV=qa
```

or

```bash
TEST_ENV=uat
```

## E. How to execute all BDD tests

```bash
npm run test:bdd
```

## F. How to execute a specific feature

```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require step-definitions/**/*.ts --require hooks/**/*.ts --format progress
```

## G. How to execute a specific scenario/tag

```bash
npx cucumber-js --tags "@smoke" --require-module ts-node/register --require step-definitions/**/*.ts --require hooks/**/*.ts
```

```bash
npx cucumber-js --tags "@regression" --require-module ts-node/register --require step-definitions/**/*.ts --require hooks/**/*.ts
```

## H. How to run in headed mode

```bash
HEADLESS=false npm run test:bdd
```

## I. How to generate the HTML report

```bash
npm run test:bdd:html
```

The report is saved in the `reports` folder as `cucumber-report.html`.

## J. How screenshots are captured on failure

On every scenario, the `After` hook checks whether the scenario failed. If it did, the framework:

1. Takes a full-page screenshot
2. Saves it under `screenshots/`
3. Attaches it to the Cucumber report
4. Closes browser resources to avoid leaks

## K. How the framework works end-to-end

1. A `.feature` file defines the business scenario in Gherkin.
2. Cucumber reads the feature file and executes matching steps.
3. The step definition invokes the page object methods.
4. The page object keeps locators and direct browser actions together.
5. Playwright performs the actual browser automation.
6. The browser opens the SauceDemo application and interacts with the page.
7. Cucumber records pass/fail results and produces the HTML report.

## Execution flow

```text
Feature File
     ↓
Cucumber
     ↓
Step Definition
     ↓
Page Object
     ↓
Playwright
     ↓
Browser
     ↓
Application
     ↓
Cucumber Report
```

## Notes

- The framework uses environment variables, not hardcoded credentials.
- Each scenario gets its own browser context and page.
- Screenshots are generated automatically on failure.
- The POM keeps selectors and UI actions organized and reusable.
