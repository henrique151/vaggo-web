import { UserClassInterface } from "@/modules/user/user.interface";
// import User from "../user";


// SÓ PRA FUNCIONAR BUILD
export interface AccessTokenStructureInterface {
  token: string;
  expiration: Date | string;
  user: UserClassInterface;
}

export interface AccessTokenClassInterface {
  token: string;
  expiration: Date;
  user: UserClassInterface;
}

export default class AccessTokenTest implements AccessTokenClassInterface {
  token: string;
  expiration: Date;
  user: UserClassInterface;

  constructor(i: AccessTokenStructureInterface) {
    this.token = i.token;
    this.expiration = i.expiration && new Date(i.expiration);
    this.user = i.user;
  }
}