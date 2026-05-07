import { Image } from "./media";

export interface User {
  id: number;
  email: string;
  password: string; // hashed password
  lastLogin: string; // ISO datetime string
  isBlocked: boolean;
  isAdmin: boolean;
  permissionLevel: number;
  // personId?: number;
  userPicture: Image;
  person: Person;
}

export type UserPreview = Pick<User, "id" | "email">;

export interface Person {
  id: number;
  name: string;
  cpf: string;
  gender: string | "M" | "F";
  phone: string;
  birthDate: string; //yyyy-mm-dd
  registrationDate: string; //yyyy-mm-dd
  isActive: boolean;
}

// OLD
// export interface User extends DataResponse {
//     id: number,
//     email: string,
//     lastLogin: string, //JS Date Object string format
//     isBlocked: boolean,
//     isAdmin: boolean,
//     permissionLevel: number,
//     personId?: number,
//     PES_INT_ID?: number,
//     person: Person
// }
