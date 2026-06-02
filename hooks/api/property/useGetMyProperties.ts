import Property from "@/classes/property";
import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { Image } from "@/classes/data/Image";
import { map } from "@/mappers/property.mapper";
import { useGetAllStates } from "../location/useGeAllStates";

type stateReturnProps = [properties: Property[] | undefined, loading: boolean];

export function useGetMyProperties(): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `properties/my-properties`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [stateData, stateDataLoading] = useGetAllStates();

  const [properties, setProperties] = useState<Property[] | undefined>(
    undefined,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && stateData) {
      console.log("stateData");
      console.log(stateData);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProperties(
        data.map((d) => {
          return map(d, stateData);
        }),
      );
      setLoading(false);
    }
  }, [data, stateData]);

  return [properties, loading];
}
