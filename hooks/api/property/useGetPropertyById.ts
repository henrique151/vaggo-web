/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import Property from "@/classes/property";
// import { useFetchSpotsFromProperty } from "@/entity/spot";
import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { useGetSpotsFromProperty } from "../spot/useGetSpotsFromProperty";

type stateProps = {
  id: number;
  withSpots?: boolean;
};

type stateReturnProps = [property: Property | undefined, loading: boolean];

export function useGetPropertyById({
  id,
  withSpots = false,
}: stateProps): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `properties/${id}`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [spots, spotsLoading] = withSpots
    ? useGetSpotsFromProperty({ id: id })
    : [null, null];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && (spots || withSpots)) {
      data.spots = withSpots ? spots : [];

      //TODO add address data here

      const property = new Property(data);

      setProperty(property);
      // console.log("property");
      // console.log(property);
      setLoading(false);
    }
  }, [data, loading]);

  return [property, loading];
}
