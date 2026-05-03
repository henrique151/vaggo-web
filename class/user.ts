export default interface User {
  id: string;
  email: string;
  password: string;
  lastLogin: Date;
  isBlocked: boolean;
  isAdmin: boolean;
  permissionLevel: "1" | "2" | "3";
  person: Person;

  // public constructor(id:string) {
  // this.id = id
  // }

  // set user info here.
  // if putting sensible data here, how can this be achiveable to prevent attacks from outside? also htf is easy to hack this or smth smh
}

export interface Person {
  id: number;
  name: string;
  cpf: string;
  gender: string;
  phone: string;
  birthDate: Date;
  registrationDate: Date;
  isActive: boolean;
  profilePicture: string;
}
