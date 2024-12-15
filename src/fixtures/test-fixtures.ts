import { test as base, Route } from '@playwright/test';
import { PageManager } from '@pages/page-manager/page-manager';
import { ApiManager } from '@src/api/api-manager/api-manager';
import { BodyInRequest } from '@src/api/types/types';

type Fixtures = {
  pm: PageManager;
  am: ApiManager;
  mock: (
    urlPattern: string | RegExp,
    responseBody: object | (() => object),
    status?: number,
    contentType?: string
  ) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  am: async ({ page }, use) => {
    const am = new ApiManager(page);
    await use(am);
  },

  mock: async ({ page }, use) => {
    const mock = async (
      urlPattern: string | RegExp,
      responseBody: object | (() => object),
      status = 200,
      contentType = 'application/json'
    ) => {
      await page.route(urlPattern, async (route: Route) => {
        const body =
          typeof responseBody === 'function'
            ? (responseBody() as BodyInRequest)
            : (responseBody as BodyInRequest);

        await route.fulfill({
          status,
          contentType,
          body: JSON.stringify(body),
        });
      });
    };

    await use(mock);
  },
});
