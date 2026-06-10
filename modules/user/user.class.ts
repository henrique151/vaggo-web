import {
  ImageClassInterface,
  PersonClassInterface,
  PersonStructureInterface,
  UserClassInterface,
  UserStructureInterface,
} from "@interfaces";

export class User implements UserClassInterface {
  id: number;
  email: string;
  avatar: ImageClassInterface;
  lastTime: UserClassInterface["lastTime"];
  permissionLevel: "1" | "2" | "3";
  status: UserClassInterface["status"];
  person: UserClassInterface["person"];

  constructor(i: UserStructureInterface) {
    this.id = i.id;
    this.email = i.email;
    this.avatar = i.avatar as ImageClassInterface;
    this.lastTime = {
      // parse ISO date to correct datetype
      login: i.lastTime?.login && new Date(i.lastTime.login as Date),
      online: i.lastTime?.online && new Date(i.lastTime.online as Date),
    };
    this.permissionLevel = i.permissionLevel;
    this.status = i.status as typeof this.status;
    this.person = i.person && new Person(i.person);
  }
}

class Person implements PersonClassInterface {
  id: number;
  name: string;
  cpf: string;
  gender: "M" | "F" | "O";
  phone: string;
  date: PersonClassInterface["date"];
  status: PersonClassInterface["status"];

  constructor(i: PersonStructureInterface) {
    this.id = i.id;
    this.name = i.name;
    this.cpf = i.cpf;
    this.gender = i.gender;
    this.phone = i.phone;
    this.date = {
      birth: i.date?.birth && new Date(i.date.birth as Date),
      registration:
        i.date?.registration && new Date(i.date.registration as Date),
    };
    this.status = i.status as typeof this.status;
  }
}
