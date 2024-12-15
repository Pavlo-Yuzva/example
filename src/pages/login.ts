import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public locators = {
    email: () => this.page.locator('//auth-sign-in//input[@id="mat-input-0"]'),
    password: () =>
      this.page.locator('//auth-sign-in//input[@id="mat-input-1"]'),
    logIn: () => this.page.locator('//auth-sign-in//button'),
    credentialsInvalidError: () =>
      this.page.locator(
        '//auth-sign-in//ngp-info-block[contains(@class, "error")]'
      ),
  };

  public async goto() {
    await this.page.goto(`${testsConfig.accountsUrl}/en/auth/personal/sign-in`);
  }
}
