import VehicleClassInterface, {
  VehicleStructureInterface,
} from "@/interfaces/class/vehicle.interface";
// import User from "./user";
import UserClassInterface from "@/interfaces/class/user.interface";
// import { UserInfoOptionsWithBufferEncoding } from "node:os";

export class Vehicle implements VehicleClassInterface {
  public id: number;
  public brand: string;
  public model: string;
  public color: string;
  public licensePlate: string;
  public manufactureYear: Date;
  public type: VehicleTypes;
  public size: VehicleSizes;
  public user: UserClassInterface;

  constructor(data: VehicleStructureInterface) {
    this.id = data.id;
    this.brand = data.brand;
    this.model = data.model;
    this.color = data.color;
    this.licensePlate = data.licensePlate;
    this.manufactureYear = data.manufactureYear;
    this.type = data.type;
    this.size = data.size;
    this.user = data.user;
  }
}

export type VehicleTypes = "CARRO" | "MOTO";
export type VehicleSizes = "PEQUENO" | "MEDIO" | "GRANDE";
