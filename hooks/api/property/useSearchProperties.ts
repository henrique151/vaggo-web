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

type stateReturnProps = [result: SearchResult | undefined, loading: boolean, success: boolean];

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


  const [data, dataLoading, success] = useApi({
    uri: uri,
    dataOnly: false,
    useToken: true,
    req: { method: "GET", headers: { "Content-Type": "application/json" } },
  });
  const [stateData, stateDataLoading] = useGetAllStates();

  const [result, setResult] = useState<SearchResult | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se dataLoading terminou mas success = false (erro da API) ou não há data
    if (!dataLoading && !success) {
      setLoading(false);
      return;
    }
    if (data && stateData) {
      console.log("hello! inserting data");
      setResult(new SearchResult(data));
      setLoading(false);
    }
  }, [data, stateData, dataLoading, success]);

  return [result, loading, success];
}
