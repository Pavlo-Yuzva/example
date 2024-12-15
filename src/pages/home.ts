import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public locators = {
    /**
     * I do not use built-in PW functions for taking locators for next reasons:
     * 1. Harder to debug. But if we use locators as below - we can copy-paste it in browser and easily find changed block (if locator breaks).
     * 2. If we need to take a really hard locator, using pure XPATH is more complex.
     * PW gives also complexity, but for really hard locators anyway you asks for page.locator('') what is similar to XPATH.
     * In my opinion it is better to use one approach in the whole code rather than mix different approaches.
     */

    openAccount: () =>
      this.page.locator(
        '//div[contains(@class, "primary-banner-section__actions")]//a[contains(@href, "sign-up")]'
      ),
    viewPricing: () =>
      this.page.locator(
        '//div[contains(@class, "primary-banner-section__actions")]//a[contains(@href, "pricing")]'
      ),
  };

  public async goto() {
    await this.page.goto(testsConfig.baseUrl);
  }
}
