import { APIResponse } from '@playwright/test';
import { HandleResponseResult, PossibleServerResponse } from '@api/types/types';

export async function handleResponse(
  response: APIResponse
): Promise<HandleResponseResult> {
  let json: object;

  try {
    json = await response.json();
  } catch {
    json = {};
  }

  return {
    json: json as PossibleServerResponse,
    statusCode: response.status(),
    headers: response.headers(),
  };
}
