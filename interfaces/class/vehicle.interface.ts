import { DeepPartial } from "../types";
import { UserClassInterface } from "./user.interface";

export type VehicleClassInterface = Vehicle;
export type VehicleStructureInterface = DeepPartial<Vehicle>;

export type VehicleSizes = "PEQUENO" | "MEDIO" | "GRANDE";
export type VehicleTypes = "CARRO" | "MOTO";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  manufactureYear: Date;
  type: VehicleTypes;
  size: VehicleSizes;
  active: boolean;
  user: UserClassInterface;
}
