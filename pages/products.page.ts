import { Page, expect } from '@playwright/test';
import BasePage from './base.page';
import { PAGE_TITLES } from '../config/constants';
import { log } from 'console';

export default class ProductsPage extends BasePage {
    readonly title: string;
    readonly inventoryItems: string;
    readonly shoppingCart: string;

    private readonly productCard = this.page.locator('.inventory_item');
    private readonly productName = this.page.locator('[data-test="item-4-title-link"]');
    private readonly productPrice = this.page.locator('[data-test="inventory-item-price"]');
    private readonly productDescription = this.page.locator('[data-test="inventory-item-desc"]');
    private readonly itemsInCart = this.page.locator('.shopping_cart_badge');
    private readonly productContainer = (productName: string) => {
        return this.productCard.filter({ hasText: productName });
    }

    constructor(page: Page) {
        super(page);
        this.title = '.title';
        this.inventoryItems = '.inventory_item';
        this.shoppingCart = '.shopping_cart_link';
    }

    async verifyProductsPage() {
        const title = await this.getTitle();
        await expect(this.page.locator(this.title)).toBeVisible();
        await expect(title).toContain(PAGE_TITLES.PRODUCTS);
    }

    async selectProductByName(name: string) {
        const items = await this.page.locator(this.inventoryItems).all();
        for (const item of items) {
            const itemName = await item.locator('.inventory_item_name').textContent();
            if (itemName?.includes(name)) {
                await item.locator('.inventory_item_name').click();
                break;
            }
        }
    }

    async verifyProductDetail(name: string, price: string, description: string) {
       const item = this.productContainer(name);
       await expect(item.locator(this.productName)).toHaveText(name);
       await expect(item.locator(this.productPrice)).toHaveText(price);
       await expect(item.locator(this.productDescription)).toHaveText(description);
    }

    async addToCart(productName: string) { 
        //Convert product name to lowercase and replace spaces/special chars with hyphens
        const formattedName = productName .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
        const addtoCartSelector = `[data-test="add-to-cart-${formattedName}"]`;
        const addToCartBtn = this.page.locator(addtoCartSelector);

     await addToCartBtn.scrollIntoViewIfNeeded();
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    await expect(this.page.locator(this.shoppingCart)).toBeVisible();
    }

    async verifyCartCount(expectedCount: number) {
        const cartCount = await this.itemsInCart.textContent();
       await expect(Number(cartCount)).toBe(expectedCount);
    }

    async goToCart() {
        await this.page.locator(this.shoppingCart).click();
        await expect(this.page).toHaveURL(/cart/);
    
    }

}