import {
  Vehicle as IVehicle,
  VehicleSizes,
  VehicleTypes,
} from "@/interface/vehicle";
import * as api from "@/entity/api";
import { User, UserDAO } from "./user";

export class Vehicle implements IVehicle {
  constructor(
    public id: number,
    public brand: string,
    public model: string,
    public color: string,
    public licensePlate: string,
    public manufactureYear: string,
    public type: VehicleTypes,
    public size: VehicleSizes,
    public user: User,
  ) {}
}

export class VehicleDAO {
  static async get(id: number | string): Promise<Vehicle | undefined> {
    const res = (await api.call(`vehicles/${id}`, true, {
      dataOnly: true,
    })) as IVehicle;

    if (res) {
      console.log("from entity/vehicle.ts.");
      console.log(res);
      const user = await UserDAO.get(Number(res.userId));

      if (!user) return undefined; //throw error instead of undefined?

      const obj = new Vehicle(
        res.id,
        res.brand,
        res.model,
        res.color,
        res.licensePlate,
        res.manufactureYear,
        res.type,
        res.size,
        user,
      );

      console.log("below here, this is the vehicle it created:");
      console.log(obj);

      return obj;
    }

    return undefined;
  }

  /**
   * Returns a list of all vehicles registered by the current user. Requires Authentication
   * @returns An Array of all vehicles registered by the user
   */
  static async getFromUser(): Promise<Vehicle[] | []> {
    const res = (await api.call(`vehicles/my-vehicles`, true, {
      dataOnly: true,
    })) as IVehicle[];
    const data: Vehicle[] = [];

    if (res) {
      res.forEach(async (rawData: IVehicle) => {
        const user = await UserDAO.get(rawData.userId!);

        if (!user) return []; //Throw error instead of returning empty. smth wrong happened

        const obj = new Vehicle(
          rawData.id,
          rawData.brand,
          rawData.model,
          rawData.color,
          rawData.licensePlate,
          rawData.manufactureYear,
          rawData.type,
          rawData.size,
          user,
        );

        data.push(obj);
      });

      return data;
    }

    return [];
  }

  static register(obj: Vehicle) {}

  static list() {}
}
