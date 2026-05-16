import { useEffect, useState } from "react";
import { useApi } from "../useApi";
import AccessToken from "@/classes/AccessToken";
import DatePeriod from "@/classes/data/DatePeriod";

type stateProps = {
  vehicleId: number;
  spotId: number;
  datePeriod: DatePeriod;
};

type stateReturnProps = [
  data: any | undefined,
  loading: boolean,
  success: boolean,
];

export function useReserveSpot({
  vehicleId,
  spotId,
  datePeriod,
}: stateProps): stateReturnProps {
  const dateIntervals = datePeriod.toString();

  const [data, loaded] = useApi({
    uri: "reservations",
    dataOnly: true,
    useToken: true,
    req: {
      method: "POST",
      body: JSON.stringify({
        spotId: spotId,
        vehicleId: vehicleId,
        startDate: dateIntervals.start,
        endDate: dateIntervals.end,
      }),
      headers: { "Content-Type": "application/json" },
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return [data, loading, success];
}
