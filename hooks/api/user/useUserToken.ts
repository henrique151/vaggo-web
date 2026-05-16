import { useEffect, useState } from "react";
import AccessToken from "@/classes/AccessToken";

type stateReturnProps = [token: AccessToken | undefined];

export function useUserToken(): stateReturnProps {
  const [data, setData] = useState<AccessToken | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(JSON.parse(token));
      setLoaded(true);
    }
  }, []);

  return [data];
}
