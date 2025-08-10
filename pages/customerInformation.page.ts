import { expect, Page } from "@playwright/test";
import BasePage from "./base.page";

export default class CustomerInformationPage extends BasePage {
  readonly continueButton: string;

  private readonly firstName = this.page.locator(
    '[data-test="firstName"]'
  );

  private readonly lastName = this.page.locator(
    '[data-test="lastName"]'
  );
  private readonly postalCode = this.page.locator(
    '[data-test="postalCode"]'
  );

  constructor(page: Page) {
    super(page);
    this.continueButton = '[data-test="continue"]';
  }

  async enterCustomerInformation(
    firstname: string,
    lastname: string,
    postalcode: string
  ) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postalCode.fill(postalcode);
    await this.page.click(this.continueButton);
      await expect(this.page).toHaveURL(/checkout-step-two/);
  }
}
