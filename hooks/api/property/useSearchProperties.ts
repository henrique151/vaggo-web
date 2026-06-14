import { SearchResult } from "@/classes/SearchResult";
import DatePeriod from "@/classes/data/DatePeriod";
import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { useGetAllStates } from "../location/useGeAllStates";

type stateProps = {
  address: string;
  datePeriod?: DatePeriod;
  cep?: string;
};

type stateReturnProps = [result: SearchResult | undefined, loading: boolean];

export function useSearchProperties({
  address,
  datePeriod,
  cep,
}: stateProps): stateReturnProps {
  const params = new URLSearchParams();
  if (address) params.set("address", address);

  if (datePeriod) {
    const dateString = datePeriod.toString();
    params.set("startDate", dateString.start);
    params.set("endDate", dateString.end);
  }

  if (cep) params.set("cep", cep);

  const queryString = params.toString();
  let uri = `reservations/search/address${queryString ? `?${queryString}` : ""}`;


  const [data, dataLoading] = useApi({
    uri: uri,
    dataOnly: false,
    useToken: true,
    req: { method: "GET", headers: { "Content-Type": "application/json" } },
  });
  const [stateData, stateDataLoading] = useGetAllStates();

  const [result, setResult] = useState<SearchResult | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("result from search: ");
    // console.log(data, stateData);
    if (data && stateData) {
      console.log("hello! inserting data");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(new SearchResult(data));
      setLoading(false);
    }
  }, [data, stateData]);

  return [result, loading];
}
