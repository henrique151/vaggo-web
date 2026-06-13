"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User, Vehicle } from "@classes";
import { BrowserService } from "@services";
import { UserController, VehicleController } from "@controllers";
import { map } from "../mappers/vehicle.class.mapper";
// import { useRouter } from "next/navigation";

export default function useGetAllVehicles(): [
  vehicle: Vehicle[],
  loaded: boolean,
  refresh: CallableFunction,
] {
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadData() {
    setLoaded(false);
    const data = await VehicleController.get(BrowserService.getToken(), true);
    const vehicles: Vehicle[] = data.map(map);
    console.log(data);
    setVehicles(vehicles);
    setLoaded(true);
  }

  // startTransition(loadUser);
  useEffect(() => {
    const load = () => {
      // console.log("loading user?");
      loadData();
    };
    load();
  }, []);

  const refresh = () => {
    // router.refresh();
    loadData();
    // console.log("refreshing user?");
    console.log(vehicles);
  };

  return [vehicles, loaded, refresh];
}
