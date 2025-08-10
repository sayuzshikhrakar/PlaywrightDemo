import { expect, Page } from "@playwright/test";
import BasePage from "./base.page";
import { Helpers } from "../utils/Helpers";

export class CheckoutOverviewPage extends BasePage {
  readonly finishBtn: string;

  private readonly cartLabel = this.page.locator(".cart_item_label");
  private readonly itemName = this.page.locator(".inventory_item_name");
  private readonly itemPrice = this.page.locator(".inventory_item_price");
  private readonly itemDescription = this.page.locator(".inventory_item_desc");
  private readonly paymentInfo =  this.page.locator('[data-test="payment-info-label"]'
);
  private readonly shippingInfo = this.page.locator('[data-test="shipping-info-label"]');
  private readonly priceTotal = this.page.locator('[data-test="total-info-label"]');
  private readonly subtotal = this.page.locator('.summary_subtotal_label');
  private readonly tax = this.page.locator('.summary_tax_label');

  private helpers: Helpers;
  constructor(page: Page) {
    super(page);
    this.finishBtn = "[data-test='finish']";
    this.helpers = new Helpers(page);
  }

  async verifyLabels(){
    await expect(this.paymentInfo).toHaveText('Payment Information:');
    await expect(this.shippingInfo).toHaveText('Shipping Information:');
    await expect(this.priceTotal).toHaveText('Price Total');
  }

  async verifyCartOverview(
    expectedProducts: { name: string; price: string; description: string }[]
  ) {
    // send expectedProducts,cartlabel,itemname,itemprice,item description using helper.verifycartitemcount
    await this.helpers.verifyCartItemCount(
      this.cartLabel,
      this.itemName,
      this.itemPrice,
      this.itemDescription,
      expectedProducts
    );
  }
   
    async verifyItemTotal(){
        await this.helpers.verifyTotal(this.itemPrice,this.subtotal);
    }

    async verifyTax(){
        await this.helpers.verifyTax(this.tax,this.subtotal);
    }

    async verifyGrandTotal(){
        await this.helpers.verifyGrandTotal(this.tax,this.subtotal);
    }

    async goToFinish(){
        await this.page.locator(this.finishBtn).click();
            await expect(this.page).toHaveURL(/checkout-complete/);

    }
}
