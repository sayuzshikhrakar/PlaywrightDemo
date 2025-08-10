import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import ProductsPage from '../pages/products.page';
import { TestDataHelper } from '../utils/testDataHelper';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.navigate('');
        await loginPage.verifyLoginPage();
    });
  // Parameterized test for valid users
  TestDataHelper.getValidUsers().forEach(user => {
    test(`TC 001:Login with valid credentials: ${user.description}`, async () => {
      await loginPage.login(user.username, user.password);
      await productsPage.verifyProductsPage();
    });
  });

  // Parameterized test for invalid users
  TestDataHelper.getInvalidUsers().forEach(user => {
    test(`TC 002:Login with invalid credentials: ${user.description}`, async () => {
      await loginPage.login(user.username, user.password);
      if (user.expectedError) {
        await loginPage.verifyErrorMessage(user.expectedError);
      }
    });
  });

  test('TC 003:Login with random valid user', async () => {
    const randomUser = TestDataHelper.getRandomValidUser();
    await loginPage.login(randomUser.username, randomUser.password);
    await productsPage.verifyProductsPage();
  });

  test('TC 004:Login with blank credentials', async () => {
    await loginPage.login('', '');
    await loginPage.verifyErrorMessage('Username is required');
  });

  TestDataHelper.getBlankUserName().forEach((user: { description: any; username: string; password: string; expectedError: string; }) => {
    test(`Login with blank username: ${user.description}`, async () => {
      await loginPage.login(user.username, user.password);
      if (user.expectedError) {
        await loginPage.verifyErrorMessage(user.expectedError);
      }
    });
  });

});