import dotenv from 'dotenv';
import path from 'path';

// Select the target environment using TEST_ENV=qa or TEST_ENV=uat.
const activeEnvironment = process.env.TEST_ENV ?? 'qa';
const envFilePath = path.resolve(__dirname, `.env.${activeEnvironment}`);

dotenv.config({ path: envFilePath, override: true });

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  username: process.env.USERNAME ?? 'standard_user',
  password: process.env.PASSWORD ?? 'secret_sauce',
  invalidUsername: process.env.INVALID_USERNAME ?? 'locked_out_user',
  invalidPassword: process.env.INVALID_PASSWORD ?? 'wrong_password',
  browser: process.env.BROWSER ?? 'chromium',
  headless: process.env.HEADLESS !== 'false',
  timeout: Number(process.env.TIMEOUT_MS ?? 30000)
};
