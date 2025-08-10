import { PlaywrightTestConfig, devices,test } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
  globalSetup:require.resolve('./utils/storage.ts'),
  timeout: 30 * 1000,
  testDir: './tests',
  outputDir: './test-results',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com/', // Example e-commerce site
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    storageState: 'storageState.json'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ]
};

export default config;