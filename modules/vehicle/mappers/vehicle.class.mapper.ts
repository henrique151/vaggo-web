import { Vehicle } from "@classes";
import { VehicleClassInterface, VehicleStructureInterface } from "@interfaces";

export function map(d: VehicleStructureInterface) {
  return new Vehicle(d);
}
