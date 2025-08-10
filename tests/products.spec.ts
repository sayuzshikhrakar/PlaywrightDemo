import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login.page";
import ProductsPage from "../pages/products.page";
import CartPage from "../pages/cart.page";
import { TestDataHelper } from "../utils/testDataHelper";
import CustomerInformationPage from "../pages/customerInformation.page";
import { log } from "console";
import { CheckoutOverviewPage } from "../pages/checkoutOverview.page";
test.describe.serial("Product details validation", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let customerInformationPage: CustomerInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let addedProducts: [];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    customerInformationPage = new CustomerInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    //Just go directly to the products page since you're logged in
    await page.goto("/inventory.html");
    //you can still verify you're on the products page
    await productsPage.verifyProductsPage;
  });
  TestDataHelper.getProductDetail().forEach((product) => {
    test("TC 006 Verify Product Details:", async () => {
      await productsPage.verifyProductDetail(
        product.name,
        product.price,
        product.description
      );
    });
  });

  test("tc 007 Add random product to cart and checkout", async ({ page }) => {
    let addedProducts: { name: any; price: any; description: any }[] = [];
    for (let i = 0; i < 2; i++) {
      let product: { name: any; price: any; description: any };
      do {
        product = TestDataHelper.getRandomProductDetail();
      } while (addedProducts.some((p) => p.name === product.name));
      await productsPage.addToCart(product.name);
      addedProducts.push({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
    productsPage.verifyCartCount(addedProducts.length);
    await productsPage.goToCart();
    await cartPage.verifyCartItemCount(addedProducts);

    await cartPage.goToCustomerInformation();

    const customerDataArray = TestDataHelper.getCustomerInformation();
    const customerData =
      customerDataArray[Math.floor(Math.random() * customerDataArray.length)];
    await customerInformationPage.enterCustomerInformation(
      customerData.firstname,
      customerData.lastname,
      customerData.postalcode
    );

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.verifyLabels();
    await checkoutOverviewPage.verifyCartOverview(addedProducts);
    await checkoutOverviewPage.verifyItemTotal();
    await checkoutOverviewPage.verifyTax();
    await checkoutOverviewPage.verifyGrandTotal();
    await checkoutOverviewPage.goToFinish();
  });
});
