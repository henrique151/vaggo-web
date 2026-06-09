import { DeepPartial } from "@/interfaces/types";
import UserClassInterface from "../user.interface";

export type AccessTokenClassInterface = AccessToken;
export type AccessTokenStructureInterface = DeepPartial<AccessToken>;

interface AccessToken {
  token: string;
  expiration: Date;
  user: UserClassInterface;
}
