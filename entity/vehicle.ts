import {
  Vehicle as IVehicle,
  VehicleSizes,
  VehicleTypes,
} from "@/interface/vehicle";
import * as api from "@/entity/api";
import { User, UserDAO, useUser } from "./user";
import { useApi } from "./useApi";
import { useEffect, useState } from "react";

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
  static async getFromUser(): Promise<Vehicle[]> {
    const res = (await api.call(`vehicles/my-vehicles`, true, {
      dataOnly: true,
    })) as IVehicle[];
    const data: Vehicle[] = [];
    let user: User | undefined;

    if (res) {
      if (res.length > 0) {
        user = await UserDAO.get(res[0].userId!);
      }
      res.forEach(async (rawData: IVehicle) => {
        if (!user) return data; //Throw error instead of returning empty. smth wrong happened

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

    return data;
  }

  static register(obj: Vehicle) {}

  static list() {}
}

export function useUserVehicles(): [
  vehicles: Vehicle[] | undefined,
  loading: boolean,
] {
  const [data, dataLoading] = useApi({
    uri: `vehicles/my-vehicles`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [user, userLoading] = useUser({
    id: Number(localStorage.getItem("userId")),
  });
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

  useEffect(() => {
    if (data && user) {
      const instances = data.map(
        (vehicle) =>
          new Vehicle(
            vehicle.id,
            vehicle.brand,
            vehicle.model,
            vehicle.color,
            vehicle.licensePlate,
            vehicle.manufactureYear,
            vehicle.type,
            vehicle.size,
            user,
          ),
      );
      // const newUser = new UserTest(test);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVehicles(instances);
      setLoading(false);
    }
  }, [data, user]);

  // useEffect(() => {
  // }, [data]);

  return [vehicles, loading];
}
