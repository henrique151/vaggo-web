import { User } from "@classes";
import {
  VehicleClassInterface,
  VehicleSizes,
  VehicleStructureInterface,
  VehicleTypes,
} from "@interfaces";

export class Vehicle implements VehicleClassInterface {
  id: number;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  manufactureYear: Date;
  type: VehicleTypes;
  size: VehicleSizes;
  active: boolean;
  user: User;

  constructor(i: VehicleStructureInterface) {
    this.id = i.id;
    this.brand = i.brand;
    this.model = i.model;
    this.color = i.color;
    this.licensePlate = i.licensePlate;
    this.manufactureYear =
      i.manufactureYear && new Date(i.manufactureYear as Date);
    this.type = i.type;
    this.size = i.size;
    this.active = i.active;
    this.user = i.user && new User(i.user);
  }
}
