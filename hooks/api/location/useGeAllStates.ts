import State from "@/classes/address/state";
import { useState, useEffect } from "react";
import { useApi } from "../useApi";
import { map } from "@/mappers/state.mapper";

type stateReturnProps = [states: State[], loading: boolean];

export function useGetAllStates(): stateReturnProps {
  const [data, dataLoading] = useApi({
    uri: `locations/states`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      // const instances: State[] = [];

      // for (const state of data) {
      //   instances.push(new State(state));
      // }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStates(data.map(map));
      setLoading(false);
    }
  }, [data]);

  return [states, loading];
}
