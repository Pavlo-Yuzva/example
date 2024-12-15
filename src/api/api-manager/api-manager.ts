import { APIRequestContext, Page } from '@playwright/test';
import { Users } from '@src/api/resources/users';

/**
 * Class should be used for calling all api resources in one place.
 * APIRequestContext is a built-in interface in PW.
 */

export class ApiManager {
  /**
   * Page (not directly APIRequestContext which is an argument for initializing Users) is here to make possible changing the context using page.context() if needed.
   */

  readonly page: Page;
  readonly request: APIRequestContext;
  readonly users: Users;

  constructor(page: Page) {
    this.page = page;
    this.request = this.page.request;
    this.users = new Users(this.request);
  }
}
