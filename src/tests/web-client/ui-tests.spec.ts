import { expect } from '@playwright/test';
import { test } from '@src/fixtures/test-fixtures';
import { generateString } from '@src/utils/utils';

test.describe('UI tests', () => {
  test(`Should ensure all elements are visible on registration page`, async ({
    pm,
  }) => {
    await pm.homePage.goto();
    await pm.homePage.locators.openAccount().click();

    for (const locator of Object.values(pm.signUpPage.locators)) {
      await expect(locator()).toBeVisible();
    }
  });
});

test('Should ensure error message is appeared when user types incorrect credentials', async ({
  pm,
}) => {
  await pm.loginPage.goto();

  await pm.loginPage.locators.email().fill(`${generateString()}@gmail.com`);
  await pm.loginPage.locators.password().fill(generateString());
  await pm.loginPage.locators.logIn().click();

  /**
   * This test only checks error message on UI if credentials are invalid, there is no E2E scenario.
   * In such scenarios better use mocking server responses to fasten the flow. Mocking example is presented in test below.
   */

  await expect(pm.loginPage.locators.credentialsInvalidError()).toBeVisible();
});

test('MOCKED: Should ensure error message is appeared when user types incorrect credentials', async ({
  pm,
  mock,
}) => {
  await mock(/\/login/, {
    message: '["The email address or password you entered is incorrect"]',
    status: 0,
  });

  await pm.loginPage.goto();
  await pm.loginPage.locators.email().fill(`${generateString()}@gmail.com`);
  await pm.loginPage.locators.password().fill(generateString());
  await pm.loginPage.locators.logIn().click();

  await expect(pm.loginPage.locators.credentialsInvalidError()).toBeVisible();
});
