import { Property } from "@classes";
import { PropertyClassInterface } from "@interfaces";

export default function map(d: PropertyClassInterface) {
  return new Property(d);
}
