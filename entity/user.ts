import { User as IUser, Person as IPerson } from "@/interface/user";
import * as api from "@/entity/api";
import { UserResponse } from "@/interface/api/user";
import { Image } from "@/interface/media";
import { useApi } from "./useApi";
import { useEffect, useState } from "react";

export class User implements IUser, Exportable {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public lastLogin: string,
    public isBlocked: boolean,
    public isAdmin: boolean,
    public permissionLevel: number,
    public person: Person,
    public userPicture: Image,
  ) {}

  export(): string {
    throw new Error("Method not implemented.");
  }
}

export class UserDAO {
  static async get(id: number | string): Promise<User | undefined> {
    const res = (await api.call(`users/${id}`, true, {
      dataOnly: true,
    })) as IUser & { avatarUrl: string };

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

      const image = new Image(res.avatarUrl);

      const user = new User(
        res.id,
        res.email,
        res.password,
        res.lastLogin,
        res.isBlocked,
        res.isAdmin,
        res.permissionLevel,
        person, // convert to Person Object
        image,
      );

      // console.log("below here, this is the user it created:");
      // console.log(user);

      return user;
    }

    return undefined;
  }

  static async register(data: {
    name: string;
    cpf: string;
    gender: string | "M" | "F";
    phone: string;
    birthDate: string;
    email: string;
    password: string;
    avatarUrl: File;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any> {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      console.log([key, value]);
      form.append(key, value);
    }

    // form.set("avatarUrl", URL.createObjectURL(data.avatarUrl));

    for (const [key, value] of Object.entries(form)) {
      console.log([key, value]);
    }

    // console.log(form.get("avatarUrl"));
    // const res = await api.call("users", false, {
    //   contentType: "null",
    //   method: "POST",
    //   body: form,
    //   dataOnly: true,
    //   rawResponse: true,
    // }); //Something's happening while sending the data on server here. replace later when possible

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: form,
    });

    console.log(res);

    type responseData = {
      success: boolean;
      message: string;
      data: {
        id: number;
        email: string;
        permissionLevel: string;
        personId: number;
        lastLogin: Date;
        isBlocked: boolean;
        isAdmin: boolean;
        avatarUrl: string;
      };
    };

    if (res.ok) {
      const data = (await res.json()) as responseData;

      return data.data;
    } else {
      const data = (await res.json()) as Pick<
        responseData,
        "message" | "success"
      >;

      return data;
    }

    // return res;
    // call api on POST /users/ : multipart/form-data
    // if res.ok
    //  return data returned by api
    // else
    //  show message from api
    // api.call();
  }

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

export function useUser({
  id,
}: {
  id: number;
}): [user: User | undefined, loading: boolean, success: boolean] {
  const [data, success] = useApi({
    uri: `users/${id}`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  if (data && !loading) {
    // console.log("userDAta:");
    // console.log(data);
    const image = new Image(data.avatarUrl);
    const test = {
      ...data,
      userPicture: image,
    };
    const newUser = new User(
      test.id,
      test.email,
      test.password,
      test.lastLogin,
      test.isBlocked,
      test.isAdmin,
      test.permissionLevel,
      test.person,
      test.userPicture,
    );
    // const newUser = new UserTest(test);
    setUser(newUser);
    setLoading(true);
  }
  // useEffect(() => {
  // }, [data]);

  return [user, loading, success];
}
