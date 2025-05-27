// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use.*/
  reporter: 'html',
  /* Shared settings for all the projects below.*/
  use: {
    /* Collect trace when retrying the failed test.*/
    trace: 'on-first-retry',
    // Add fallback URL if BASE_URL is not set
    baseURL: process.env.BASE_URL
  },

  /* Configure projects*/
  projects: [
    {
      name: 'barrel-monitoring',
    }
  ]
});