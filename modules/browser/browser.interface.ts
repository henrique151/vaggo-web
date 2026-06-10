import { DeepPartial, UserClassInterface } from "@interfaces";

export type AccessTokenClassInterface = AccessToken;
export type AccessTokenStructureInterface = DeepPartial<AccessToken>;

interface AccessToken {
  token: string;
  expiration: Date;
  user: UserClassInterface;
}
