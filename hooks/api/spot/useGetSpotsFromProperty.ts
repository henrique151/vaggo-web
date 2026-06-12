import { Spot } from "@classes";
import { useApi } from "../useApi";
import { useState, useEffect } from "react";
import { map } from "@/mappers/spot.mapper";

type stateProps = {
  id: number;
};

type stateReturnProps = [spots: Spot[] | undefined, loading: boolean];

export function useGetSpotsFromProperty({ id }: stateProps): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `spots/properties/${id}/spots`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpots(data.map(map));
      setLoading(false);
    }
  }, [data]);

  return [spots, loading];
}
