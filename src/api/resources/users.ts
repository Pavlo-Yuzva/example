import { APIRequestContext } from '@playwright/test';
import { testsConfig } from '@src/environment';
import { BodyInRequest } from '@api/types/types';
import { handleResponse } from '@api/utils/utils';

/**
 * Class describes methods for /users (for example) resource.
 * It is useful in case the same request is needed in different tests.
 * If call this method and already know which data should be sent to have a successful response.
 */

export class Users {
  readonly request: APIRequestContext;
  readonly resource: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.resource = `${testsConfig.apiUrl}/users`;
  }

  public async generateFirewallToken() {
    const response = await this.request.get(
      `${this.resource}/generate-firewall-token`
    );

    return handleResponse(response);
  }

  public async login(data: {
    email: string;
    password: string;
    firewallToken: string;
  }) {
    const response = await this.request.post(`${this.resource}/login`, {
      data: {
        email: data.email,
        password: data.password,
        firewallToken: data.firewallToken,
      },
    });

    return handleResponse(response);
  }

  public async getUser(userId: number) {
    const response = await this.request.get(`${this.resource}/user/${userId}`);

    return handleResponse(response);
  }

  /**
   * Data is required. It means request will always return status code != OK without these values.
   * Body is optional. If there is a need to send a request with additional values you can specify them here.
   */

  public async createUser(
    data: {
      username: string;
      age: number;
    },
    body?: BodyInRequest
  ) {
    const response = await this.request.post(`${this.resource}/user`, {
      data: {
        username: data.username,
        age: data.age,
        ...body,
      },
    });

    return handleResponse(response);
  }
}
