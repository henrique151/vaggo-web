import { Vehicle } from "@/classes/vehicle";
import { useState, useEffect } from "react";
import { useGetUserById } from "../user/useGetUserById";
import { useApi } from "../useApi";
import { map } from "@/mappers/vehicle.mapper";
import { useUserToken } from "../user/useUserToken";

type stateReturnProps = [vehicles: Vehicle[] | undefined, loading: boolean];

export function useGetMyVehicles(): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `vehicles/my-vehicles`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [token] = useUserToken();
  const [user, userLoading] = useGetUserById({
    id: Number(token?.id),
  });

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>();

  useEffect(() => {
    if (data && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVehicles(data.map(map));
      setLoading(false);
    }
  }, [data, user]);

  // useEffect(() => {
  // }, [data]);

  return [vehicles, loading];
}
