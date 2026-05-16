import User from "./user";

export class Vehicle {
  public id: number;
  public brand: string;
  public model: string;
  public color: string;
  public licensePlate: string;
  public manufactureYear: string;
  public type: VehicleTypes;
  public size: VehicleSizes;
  public user: User;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
  ) {
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
