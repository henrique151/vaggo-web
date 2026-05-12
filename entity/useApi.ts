import { useEffect, useState } from "react";

const API_ADDRESS = "http://localhost:3000";

// type genericApiResponse = { success?: boolean; message?: string; data?: any };

export function useApi({
  uri,
  req = {},
  useToken = false,
  dataOnly = false,
}: {
  uri: string;
  req?: RequestInit;
  useToken?: boolean;
  dataOnly?: boolean;
}) {
  const [data, setData] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // on this one, i guess useEffect is not needed, since we don't need to execute everytime something changes
  // make urgent test above
  useEffect(() => {
    if (useToken && localStorage.getItem("token")) {
      const apiHeader: HeadersInit = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      req.headers = Object.assign(apiHeader, req.headers);
    }

    fetch(`${API_ADDRESS}/${uri}`, req).then((res) => {
      setSuccess(res.ok);
      if (res.ok) {
        res.json().then((resData) => {
          console.log("from useApi: ");
          console.log(resData);

          if (dataOnly && resData) {
            // console.log(resData);
            setData(resData.data);
            setLoading(false);
          } else {
            setData(resData);
            setLoading(false);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, success];
}
