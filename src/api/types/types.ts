export type BodyInRequest = Record<
  string,
  string | number | object | boolean | null | undefined
>;

/**
 * Determines the possible response from server.
 * If they are very different between resources it is better to create this type for every resource so values won't be mixed.
 */

export type PossibleServerResponse = {
  data: {
    firewallToken: string;
  };
  status: number;
  username: string;
  age: number;
  user_id: number;
};

export type HandleResponseResult = {
  json: PossibleServerResponse;
  statusCode: number;
  headers: { [key: string]: string };
};
