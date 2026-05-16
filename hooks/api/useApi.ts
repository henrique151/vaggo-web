import { useEffect, useMemo, useState } from "react";
import { useUserToken } from "./user/useUserToken";

const API_ADDRESS = "http://localhost:3000";

type stateProps = {
  uri?: string;
  req?: RequestInit;
  useToken?: boolean;
  dataOnly?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type stateReturnProps = [data: any, loaded: boolean, success: boolean];

export function useApi({
  uri,
  req = {},
  useToken = false,
  dataOnly = false,
}: stateProps): stateReturnProps {
  const [data, setData] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [token, tokenLoaded] = useToken ? useUserToken() : [null, false];

  useEffect(() => {
    const fetchData = async () => {
      // if (!loaded) {
      if (useToken && token) {
        //check token's expiration date
        // if still valid, proceed with operation
        // else, throws error or redirects user automatically to login page

        const apiHeader: HeadersInit = {
          Authorization: `Bearer ${token.token}`,
        };
        req.headers = Object.assign(apiHeader, req.headers);
      } else if (useToken && !token) {
        return null;
      }

      console.log(
        "Fetch is below this logging. If is appearing many times, it means api is being called alot",
      );
      console.log(req);
      const res = await fetch(`${API_ADDRESS}/${uri}`, req);

      setSuccess(res.ok);

      const data = await res.json();

      if (dataOnly && data) {
        console.log("data from api");
        console.log(data);
        setData(data.data);
      } else {
        setData(data);
      }
      setLoaded(true);

      // .then((res) => {
      //   setSuccess(res.ok);
      //   if (res.ok) {
      //     res.json().then((resData) => {
      //       console.log("from useApi: ");
      //       console.log(resData);

      //       if (dataOnly && resData) {
      //         // console.log(resData);
      //         setData(resData.data);
      //       } else {
      //         setData(resData);
      //         setLoaded(true);
      //       }
      //     });
      //   }
      // });
      // }
    };

    if (!loaded && uri) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri, data, loaded, token]);

  return [data, loaded, success];
}
