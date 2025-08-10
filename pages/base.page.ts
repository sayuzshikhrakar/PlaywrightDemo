import { Page, Locator } from '@playwright/test';

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string) {
        await this.page.goto(path);
    }

    async getTitle() {
        return await this.page.title();
    }
}