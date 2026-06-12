import { Vehicle } from "@classes";
import { useState, useEffect } from "react";
import { useGetUserById } from "../user/useGetUserById";
import { useApi } from "../useApi";
import { map } from "@/mappers/vehicle.mapper";
// import { useUserToken } from "../user/useUserToken";
// import { getToken } from "@/services/user.service";
// import { useGetMyUser } from "../user/useGetMyUser";
// import { VehicleController } from "@/controllers/vehicle.controller";
import { VehicleClassInterface } from "@interfaces";
import { get } from "@/modules/vehicle/vehicle.controller";
// import { getToken } from "@/services/browser.service";
import { BrowserService } from "@services";

type stateReturnProps = [
  vehicles: VehicleClassInterface[] | undefined,
  loading: boolean,
];

export function useGetMyVehicles(): stateReturnProps {
  // const [data, dataLoading] = useApi({
  //   uri: `vehicles/my-vehicles`,
  //   dataOnly: true,
  //   useToken: true,
  //   req: { method: "GET" },
  // });
  const token = BrowserService.getToken();
  // const [user, userLoading] = useGetMyUser();

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>();

  useEffect(() => {
    get(token).then((data) => {
      setVehicles(
        data.map((v) => {
          return new Vehicle(v);
        }),
      );
    });
    // if (data) {
    // setVehicles(data.map(map));
    // setLoading(false);
    // }
  }, []);

  // useEffect(() => {
  // }, [data]);

  return [vehicles, loading];
}
