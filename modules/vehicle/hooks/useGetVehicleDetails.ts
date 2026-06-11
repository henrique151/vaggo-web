"use client";
import { useEffect, useState } from "react";
import { Vehicle } from "@classes";
import { BrowserService } from "@services";
import { VehicleController } from "@controllers";
import { map } from "../mappers/vehicle.class.mapper";

export default function useGetVehicleDetails(): [
  vehicles: Vehicle[],
  loaded: boolean,
];
export default function useGetVehicleDetails(
  id: number,
): [vehicle: Vehicle, loaded: boolean];
export default function useGetVehicleDetails(
  id?: number,
): [vehicle: Vehicle | Vehicle[], loaded: boolean] {
  const [vehicle, setVehicle] = useState<Vehicle | Vehicle[] | undefined>(
    undefined,
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const v = await VehicleController.get(BrowserService.getToken(), id);
      const res = id ? map(v) : (v as unknown as Vehicle[]).map(map);

      setVehicle(res);
      setLoaded(true);
    };
    load();
  }, []);

  // useEffect(() => {
  //   console.log("property. possibly this migth appear some times");
  //   console.log(vehicle);
  // }, [vehicle]);

  return [vehicle, loaded];
}
