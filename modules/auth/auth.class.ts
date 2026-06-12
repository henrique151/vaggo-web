import {
  AuthCredentialsClassInterface,
  AuthCredentialsStructureInterface,
} from "@interfaces";

export class AuthCredentials implements AuthCredentialsClassInterface {
  email: string;
  password: string;

  constructor(i: AuthCredentialsStructureInterface) {
    this.email = i.email;
    this.password = i.password;
  }
}
