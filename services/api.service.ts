import { redirect } from "next/navigation";
import { getToken } from "./user.service";
import AccessToken from "@/classes/AccessToken";

const API_ADDRESS = process.env.API_ADDRESS || "http://localhost:3000";

type requestProps = { url: string; useToken?: boolean; req: RequestInit };

export default async function request({ url, useToken, req }: requestProps) {
  // const request;
  // const router = useRouter();
  if (useToken) {
    const token = await getToken();
    if (!token) {
      console.warn(
        "Looks like the token isn't valid, redirecting to login page",
      );
      redirect("/login", "replace");
    }

    const apiHeader: HeadersInit = {
      Authorization: `Bearer ${token.token}`,
    };
    req.headers = Object.assign(apiHeader, req.headers);
  }
  const res = await fetch(`${API_ADDRESS}/${url}`, req);

  if (res.status == 429) redirect("/error/429", "replace");

  if (res.status == 401) {
    const data = await res.json();
    if (data.message != "E-mail ou senha incorretos.") {
      redirect("/login", "replace");
    }
  }

  return res;
}

export async function requestTest(url: string): Promise<any>;
export async function requestTest(
  url: string,
  token: AccessToken,
): Promise<any>;
export async function requestTest(url: string, req: RequestInit): Promise<any>;
export async function requestTest(
  url: string,
  token: AccessToken,
  req: RequestInit,
): Promise<any>;
export async function requestTest(
  url: string,
  tokenOrReq?: AccessToken | RequestInit,
  reqBody?: RequestInit,
): Promise<any> {
  // map req and token to variables
  console.log("from requestTest");
  const isToken = tokenOrReq instanceof AccessToken;
  const req = (reqBody ?? isToken) ? {} : tokenOrReq;
  const token = isToken ? tokenOrReq : undefined;

  console.log("token");
  console.log(token);

  console.log("req");
  console.log(req);

  console.log("tokenOrReq");
  console.log(tokenOrReq);

  if (token) {
    req.headers = Object.assign(
      { Authorization: `Bearer ${token.token}` },
      req.headers,
    );
    console.log("token inserted", req.headers);
  }

  const res = await fetch(`${API_ADDRESS}/${url}`, req);
  // const res = { status: 200 };

  if (res.status == 429) redirect("/error/429", "replace");

  // if (res.status == 401) {
  //   const data = await res.json();
  //   if (data.message != "E-mail ou senha incorretos.") {
  //     redirect("/login", "replace");
  //   }
  // }

  // console.log(res);
  return res;

  // if (useToken) {
  //   const token = await getToken();
  //   if (!token) {
  //     console.warn(
  //       "Looks like the token isn't valid, redirecting to login page",
  //     );
  //     redirect("/login", "replace");
  //   }

  //   const apiHeader: HeadersInit = {
  //     Authorization: `Bearer ${token.token}`,
  //   };
  //   req.headers = Object.assign(apiHeader, req.headers);
  // }
  // const res = await fetch(`${API_ADDRESS}/${url}`, req);

  // if (res.status == 429) redirect("/error/429", "replace");

  // if (res.status == 401) {
  //   const data = await res.json();
  //   if (data.message != "E-mail ou senha incorretos.") {
  //     redirect("/login", "replace");
  //   }
  // }

  // return res;
}

// export class APIService {
//   public static async request(url: string);
//   public static async request(url: string, token: AccessToken);
//   public static async request(url: string, req: RequestInit);
//   public static async request(
//     url: string,
//     token: AccessToken,
//     req: RequestInit,
//   );
//   public static async request(
//     url: string,
//     tokenOrReq?: AccessToken | RequestInit,
//     reqBody?: RequestInit,
//   ) {
//     // map req and token to variables
//     // const req:RequestInit
//     // const token:AccessToken
//   }
// }
