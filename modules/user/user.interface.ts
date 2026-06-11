// import {  } from "@/interfaces/types";
import {
  ImageClassInterface,
  DeepPartial,
  ImageStructureInterface,
} from "@interfaces";

/**
 * System User interface structure for working with partial data.
 */
export type UserStructureInterface = DeepPartial<User>;

/**
 * System User interface for class usage or other strict data structures
 */
export type UserClassInterface = User;

/**
 * Person interface for class usage or other strict data structures
 */
export type PersonClassInterface = Person;

/**
 * Person interface structure for working with partial data.
 */
export type PersonStructureInterface = DeepPartial<Person>;

/**
 * System User Details
 */
interface User {
  id: number;
  email: string;
  avatar: ImageClassInterface | ImageStructureInterface;
  lastTime: UserLastTimeDetails;
  permissionLevel: "1" | "2" | "3";
  status: UserStatus;
  person: Person;
}

interface UserStatus {
  blocked: boolean;
  admin: boolean;
}

interface UserLastTimeDetails {
  login: Date;
  online: Date;
}

/**
 * Person Details. for use with classes
 */
interface Person {
  id: number;
  name: string;
  cpf: string;
  gender: "M" | "F" | "O";
  phone: string;
  date: PersonDateDetails;
  status: PersonStatus;
}

interface PersonDateDetails {
  birth: Date;
  registration: Date;
}

interface PersonStatus {
  active: boolean;
}
