import { expect } from '@playwright/test';
import { test } from '@src/fixtures/test-fixtures';
import { generateString, generateNumber } from '@src/utils/utils';
import { isValidAge } from '@src/utils/validators';

/**
 * All tests here are executed after setup file.
 * It means they will already have "token" in their header (specified in playwright.config.ts)
 */

test.describe('/users tests', () => {
  test('Should get user info', async ({ am }) => {
    const response = await am.users.getUser(generateNumber());

    expect(isValidAge(response.json.age)).toBeTruthy();
  });

  test('Should create a user', async ({ am }) => {
    const username = generateString();

    const response = await am.users.createUser({
      username: username,
      age: generateNumber(2),
    });

    expect(response.json.username).toBe(username);
    expect(response.json.user_id).toBeDefined();
  });
});
