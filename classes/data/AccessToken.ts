import {
  AccessTokenClassInterface,
  AccessTokenStructureInterface,
} from "@/interfaces/class/data/AccessToken";
import UserClassInterface from "@/modules/user/user.interface";
// import User from "../user";

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
