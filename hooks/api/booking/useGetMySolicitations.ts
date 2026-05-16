import { Booking } from "@/classes/booking";
import { useApi } from "../useApi";
import { useGetUserById } from "../user/useGetUserById";
import { useEffect, useState } from "react";
import { map } from "@/mappers/booking.mapper";
import { useUserToken } from "../user/useUserToken";

type stateReturnProps = [
  solicitations: Booking[] | undefined,
  loading: boolean,
];

// export function useFetchPropertySolicitations(): stateReturnProps {
export function useGetMySolicitations(): stateReturnProps {
  const [token] = useUserToken();
  const [data, dataLoading] = useApi({
    uri: `reservations/owner`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  // TODO investigate this line and delete if being unused
  const [user, userLoading] = useGetUserById({
    id: Number(token?.id),
  });

  const [loading, setLoading] = useState(true);
  const [solicitations, setSolicitations] = useState<Booking[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (data && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolicitations(data.map(map));
      setLoading(false);
    }
  }, [data, user]);

  return [solicitations, loading];
}
