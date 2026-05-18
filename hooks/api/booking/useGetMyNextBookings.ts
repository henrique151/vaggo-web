import { Booking } from "@/classes/booking";
import { useApi } from "../useApi";
import DatePeriod from "@/classes/data/DatePeriod";
import { useState, useEffect } from "react";
import { useGetUserById } from "../user/useGetUserById";
import { map } from "@/mappers/booking.mapper";
// import { useUserToken } from "../user/useUserToken";
import { getToken } from "@/services/user.service";
import { useGetMyUser } from "../user/useGetMyUser";

type stateReturnProps = [bookings: Booking[], loading: boolean];

export function useGetMyNextBookings(): stateReturnProps {
  const token = getToken();
  const [data, dataLoading] = useApi({
    uri: `reservations`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });
  const [user, userLoading] = useGetMyUser();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookings(data.map(map));
      setLoading(false);
    }
  }, [data, user]);

  return [bookings, loading];
}
