import { Image } from "@/classes/data/Image";

export default class User {
  public id: number;
  public email: string;
  public password: string;
  public lastLogin: Date;
  public isBlocked: boolean;
  public isAdmin: boolean;
  public permissionLevel: number;
  public person: Person;
  public userPicture: Image;
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
  ) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.lastLogin = new Date(data.lastLogin);
    this.isBlocked = data.isBlocked;
    this.isAdmin = data.isAdmin;
    this.permissionLevel = data.permissionLevel;
    this.person = data.person;
    this.userPicture = data.userPicture;
  }
}

class Person {
  public id: number;
  public name: string;
  public cpf: string;
  public gender: string;
  public phone: string;
  public birthDate: string;
  public registrationDate: string;
  public isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.cpf = data.cpf;
    this.gender = data.gender;
    this.phone = data.phone;
    this.birthDate = data.birthDate;
    this.registrationDate = data.registrationDate;
    this.isActive = data.isActive;
  }
}
