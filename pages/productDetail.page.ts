import { Page, expect } from '@playwright/test';
import BasePage from './base.page';
import { PAGE_TITLES } from '../config/constants';

export default class ProductDetailPage extends BasePage {
    readonly backButton: string;
    readonly productName: string;
    readonly productDescription: string;
    readonly productPrice: string;
    readonly addToCartButton: string;

    constructor(page: Page) {
        super(page);
        this.backButton = '#back-to-products';
        this.productName = '.inventory_details_name';
        this.productDescription = '.inventory_details_desc';
        this.productPrice = '.inventory_details_price';
        this.addToCartButton = 'button:has-text("Add to cart")';
    }

    async verifyProductDetailPage() {
        await expect(this.page.locator(this.backButton)).toBeVisible();
    }

    async getProductDetails() {
        return {
            name: await this.page.locator(this.productName).textContent(),
            description: await this.page.locator(this.productDescription).textContent(),
            price: await this.page.locator(this.productPrice).textContent()
        };
    }
}