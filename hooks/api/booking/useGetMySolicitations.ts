import { Booking } from "@/classes/booking";
import { useApi } from "../useApi";
import { useGetUserById } from "../user/useGetUserById";
import { useEffect, useState } from "react";
import { map } from "@/mappers/booking.mapper";
// import { useUserToken } from "../user/useUserToken";
// import { getToken } from "@/services/user.service";
import { useGetMyUser } from "../user/useGetMyUser";

type stateReturnProps = [
  solicitations: Booking[] | undefined,
  loading: boolean,
];

// export function useFetchPropertySolicitations(): stateReturnProps {
export function useGetMySolicitations(): stateReturnProps {
  // const token = getToken();
  const [data, dataLoading] = useApi({
    uri: `reservations/owner`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  // TODO investigate this line and delete if being unused
  const [user, userLoading] = useGetMyUser();

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
