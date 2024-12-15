import { expect } from '@playwright/test';
import { test } from '@src/fixtures/test-fixtures';
import { testsConfig } from '@src/environment';

/**
 * This file is executed before all tests determined in api project (look on playwright.config.ts file)
 */

test('Login', async ({ am }) => {
  const firewallToken = await am.users.generateFirewallToken();

  const responseLogin = await am.users.login({
    email: testsConfig.testUser.email,
    password: testsConfig.testUser.password,
    firewallToken: firewallToken.json.data.firewallToken,
  });

  const token = responseLogin.headers['token'];
  expect(token).toBeDefined();

  process.env.TESTS_BEARER = token;
});
