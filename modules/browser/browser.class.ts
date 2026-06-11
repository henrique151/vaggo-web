import {
  AccessTokenClassInterface,
  AccessTokenStructureInterface,
  UserClassInterface,
} from "@interfaces";

export class AccessToken implements AccessTokenClassInterface {
  token: string;
  expiration: Date;
  user: UserClassInterface;

  constructor(i: AccessTokenStructureInterface) {
    this.token = i.token;
    this.expiration = i.expiration as Date;
    this.user = i.user as UserClassInterface;
  }

  // public static fromInterface(d) {
  //   const obj = {
  //     accessToken: d.token,
  //     expiresIn: d.expiration,
  //     user: {
  //       id: d.id,
  //     },
  //   };
  //   const token = new AccessToken(obj);
  //   return token;
  // }
}
