import Property from "@/classes/property";
import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { Image } from "@/classes/data/Image";
import { map } from "@/mappers/property.mapper";
import { useGetAllStates } from "../location/useGeAllStates";
import { get } from "@/modules/property/property.controller";
import { getToken } from "@/services/browser.service";

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
    get(getToken() as any).then((properties) => {
      console.log("properties from controller");
      console.log(properties);
    });
  }, []);
  useEffect(() => {
    if (data && stateData) {
      // const apiData = { ...data, stateData: stateData };
      // console.log("stateData");
      console.log(data);
      // console.log(stateData);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProperties(data.map(map));
      setLoading(false);
    }
  }, [data, stateData]);

  return [properties, loading];
}
