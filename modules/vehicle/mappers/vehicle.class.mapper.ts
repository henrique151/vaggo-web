import { Vehicle } from "@classes";
import { VehicleClassInterface, VehicleStructureInterface } from "@interfaces";

export function map(d: VehicleStructureInterface): Vehicle {
  return new Vehicle(d);
}
