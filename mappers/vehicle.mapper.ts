import { Vehicle } from "@/classes/vehicle";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function map(d: any) {
  return new Vehicle(d);
}
