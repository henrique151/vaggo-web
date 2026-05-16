import { useEffect, useState } from "react";
import { useApi } from "../useApi";
import AccessToken from "@/classes/AccessToken";

type stateProps = {
  email?: string;
  password?: string;
};

type stateReturnProps = [
  access: AccessToken | undefined,
  loading: boolean,
  success: boolean,
];

export function useAuthenticateUser({
  email,
  password,
}: stateProps): stateReturnProps {
  const [apiRequestBody, setApiRequestBody] = useState({});

  const [data, loaded] = useApi(apiRequestBody);

  const [access, setAccess] = useState<AccessToken | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (email && password) {
      const apiRequestBodyObj = {
        uri: "users/login",
        dataOnly: true,
        useToken: false,
        req: {
          method: "POST",
          body: {},
          headers: { "Content-Type": "application/json" },
        },
      };

      apiRequestBodyObj.req.body = JSON.stringify({
        email: email,
        password: password,
      });

      console.log(data);

      setApiRequestBody(apiRequestBodyObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  useEffect(() => {
    if (data) {
      setAccess(new AccessToken(data));
      console.log(access);
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [access, loading, success];
}
