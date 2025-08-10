// saveAuthState.ts
import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/'); // replace with your login URL

  // Perform login - replace selectors and credentials accordingly
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for navigation after login
  await page.waitForURL('**/inventory.html');

  // Save storage state to file
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
  console.log('Logged in and saved storage state');
})();
