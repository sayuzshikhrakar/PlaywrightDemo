import { Page, expect } from '@playwright/test';
import BasePage from './base.page';
import { CREDENTIALS, PAGE_TITLES } from '../config/constants';

export default class LoginPage extends BasePage {
    readonly usernameInput: string;
    readonly passwordInput: string;
    readonly loginButton: string;
    readonly errorMessage: string;

    constructor(page: Page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    async verifyLoginPage() {
        const title = await this.getTitle();
        expect(title).toBe(PAGE_TITLES.LOGIN);
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async verifyErrorMessage(message: string) {
        await expect(this.page.locator(this.errorMessage)).toContainText(message);
    }
}