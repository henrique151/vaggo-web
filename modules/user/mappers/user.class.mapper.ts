import { User } from "@classes";
import { UserClassInterface, UserStructureInterface } from "@interfaces";

export default function map(data: UserStructureInterface): User {
  return new User(data);
}
