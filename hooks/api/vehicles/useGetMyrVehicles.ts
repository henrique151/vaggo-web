import { Vehicle } from "@/classes/vehicle";
import { useState, useEffect } from "react";
import { useGetUserById } from "../user/useGetUserById";
import { useApi } from "../useApi";
import { map } from "@/mappers/vehicle.mapper";
// import { useUserToken } from "../user/useUserToken";
import { getToken } from "@/services/user.service";
import { useGetMyUser } from "../user/useGetMyUser";

type stateReturnProps = [vehicles: Vehicle[] | undefined, loading: boolean];

export function useGetMyVehicles(): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `vehicles/my-vehicles`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const token = getToken();
  // const [user, userLoading] = useGetMyUser();

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>();

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVehicles(data.map(map));
      setLoading(false);
    }
  }, [data]);

  // useEffect(() => {
  // }, [data]);

  return [vehicles, loading];
}
