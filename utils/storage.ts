import { FullConfig } from '@playwright/test';
import { chromium } from 'playwright';
import LoginPage from '../pages/login.page';
import { CREDENTIALS } from '../config/constants';

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const loginPage = new LoginPage(page);
    await loginPage.navigate(baseURL!);
    await loginPage.login(CREDENTIALS.STANDARD_USER.USERNAME, CREDENTIALS.STANDARD_USER.PASSWORD);
    
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;