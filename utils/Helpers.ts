import {expect,Locator,Page} from "@playwright/test";
export class Helpers{
    private page: Page;

  constructor(page: Page) {
      this.page = page;
  }

  async verifyCartItemCount(cartItems:Locator,productName:Locator,productPrice:Locator,productDescription:Locator,expectedProducts: {name: string; price: string; description: string }[]) {
    const count = await cartItems.count();

    if (count !== expectedProducts.length) {
      throw new Error(
        `Expected ${expectedProducts.length} products in cart but found ${count}`
      );
    }

    for (let i = 0; i < count; i++) {
      const itemName = await productName.nth(i).textContent();
      const itemPrice = await productPrice.nth(i).textContent();
      const itemDescription = await productDescription
        .nth(i)
        .textContent();

        console.log("Item Name:", itemName); 
        console.log("Item Price:", itemPrice);
        console.log("Item Description:", itemDescription);

      const expectedProduct = expectedProducts[i];
      // Check if the item name and price are in the expected products set
      if (
        itemName?.trim() !== expectedProduct.name ||
        itemPrice?.trim() !== expectedProduct.price ||
        itemDescription?.trim() !== expectedProduct.description
      ) {
        throw new Error(`Mismatch in cart for item ${i + 1}`);
      }
    }
  }
    async verifyTotal(productPrice:Locator,subTotalText:Locator) {
      const itemCount =await productPrice.count();
      let total=0;
    console.log("itemCount:",itemCount);

    for (let i=0;i<itemCount;i++) {
        const priceText = await productPrice.nth(i).innerText();
        const priceValue = parseFloat(priceText.replace("$","").trim());
        total +=priceValue
      }
      const subTotalTextValue= await subTotalText.innerText();
      const subTotal= parseFloat(subTotalTextValue.replace("Item total:","").replace("$","").trim());
      console.log("Total Price:",total);
      console.log("Subtotal Price:",subTotal);    
      await expect(total).toBe(subTotal);

  }

  async verifyTax(TaxText:Locator,subTotalText:Locator) {
      const subTotalTextValue= await subTotalText.innerText();
      const TaxTextValue= await TaxText.innerText();
      const subTotal= parseFloat(subTotalTextValue.replace("Item total:","").replace("$","").trim());
      let tax= parseFloat(TaxTextValue.replace("Tax:","").replace("$","").trim());
      tax =Number(tax.toFixed(2));
      let expectedTax = subTotal * 0.08; // Assuming a tax rate of 8%
      expectedTax = Number(expectedTax.toFixed(2));
      await expect(tax).toBe(expectedTax);

  }

  async verifyGrandTotal(TaxText:Locator,subTotalText:Locator){
      const subTotalTextValue= await subTotalText.innerText();
      const TaxTextValue= await TaxText.innerText();
      const subTotal= parseFloat(subTotalTextValue.replace("Item total:","").replace("$","").trim());
      let tax= parseFloat(TaxTextValue.replace("Tax:","").replace("$","").trim());
      tax =Number(tax.toFixed(2));
      let expectedGrandTotal = subTotal + tax; // Assuming grand total is subtotal + tax
      expectedGrandTotal = Number(expectedGrandTotal.toFixed(2));
      await expect(this.page.locator('.summary_total_label')).toHaveText(`Total: $${expectedGrandTotal}`);
  }

}