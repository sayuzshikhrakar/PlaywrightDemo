import { expect, Page } from "@playwright/test";
import BasePage from "./base.page";
import { Helpers } from "../utils/Helpers";

export default class CartPage extends BasePage {
  readonly itemCount: string;
  readonly checkoutButton: string;
  readonly helper:Helpers;
  private readonly productName = this.page.locator(
    '[data-test="inventory-item-name"]'
  );
  private readonly productPrice = this.page.locator(
    '[data-test="inventory-item-price"]'
  );
  private readonly productDescription = this.page.locator(
    '[data-test="inventory-item-desc"]'
  );

  private readonly cartItem = this.page.locator(
    'div.cart_item_label'
  );

  constructor(page: Page) {
    super(page);
    this.itemCount = ".cart_item_count";
    this.checkoutButton = '[data-test="checkout"]';
    this.helper = new Helpers(page);
  }


  async goToCustomerInformation() {
    await this.page.click(this.checkoutButton);
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async verifyCartItemCount(expectedProducts: { name: string; price: string; description: string }[]) {
    await this.helper.verifyCartItemCount(
      this.cartItem,
      this.productName,
      this.productPrice,
      this.productDescription,
      expectedProducts
    );
  }
}
