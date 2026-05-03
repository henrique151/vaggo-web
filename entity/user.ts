import { User as IUser, Person as IPerson } from "@/interface/user";
import * as api from "@/entity/api";
import { UserResponse } from "@/interface/api/user";

export class User implements IUser {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public lastLogin: string,
    public isBlocked: boolean,
    public isAdmin: boolean,
    public permissionLevel: number,
    public person: Person,
  ) {}
}

export class UserDAO {
  static async get(id: number | string): Promise<User | undefined> {
    const res = (await api.call(`users/${id}`, true, {
      dataOnly: true,
    })) as IUser;

    if (res) {
      console.log("from entity/user.ts.");
      console.log(res);

      const person = new Person(
        res.person.id,
        res.person.name,
        res.person.cpf,
        res.person.gender,
        res.person.phone,
        res.person.birthDate,
        res.person.registrationDate,
        res.person.isActive,
      );

      const user = new User(
        res.id,
        res.email,
        res.password,
        res.lastLogin,
        res.isBlocked,
        res.isAdmin,
        res.permissionLevel,
        person, // convert to Person Object
      );

      console.log("below here, this is the user it created:");
      console.log(user);

      return user;
    }

    return undefined;
  }

  static register(obj: User) {}

  static list() {}

  /**
   * Authenticates user to access full functionality by providing credentials.
   * @param email user's email
   * @param pass user's password
   * @returns
   */
  static async authenticate(email: string, pass: string) {
    const reqBody = JSON.stringify({ email: email, password: pass });
    const res = await api.call("users/login", true, {
      dataOnly: true,
      body: reqBody,
      method: "POST",
      contentType: "json",
    });

    console.log(res);
    if (res) {
      return res;
    }

    return undefined;
  }
}

class Person implements IPerson {
  constructor(
    public id: number,
    public name: string,
    public cpf: string,
    public gender: string,
    public phone: string,
    public birthDate: string,
    public registrationDate: string,
    public isActive: boolean,
  ) {}
}
