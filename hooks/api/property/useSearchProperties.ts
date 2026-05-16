import { SearchResult } from "@/classes/SearchResult";
import { DatePeriod } from "@/classes/data/DatePeriod";
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
  let uri = `reservations/search/address`;

  uri = uri.concat(`?address=${address}`);

  // console.log(uri);

  if (datePeriod) {
    const dateString = datePeriod.toString();
    uri = uri.concat(
      `&startDate=${dateString.start}&endDate=${dateString.end}`,
    );
  }

  if (cep) {
    uri = uri.concat(`&cep=${cep}`);
  }

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
