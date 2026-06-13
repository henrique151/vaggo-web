"use server";
import { redirect } from "next/navigation";
import { AccessToken } from "../browser/browser.class";

import { AccessTokenClassInterface } from "@interfaces";
import { FormUtils } from "@utils";

const API_ADDRESS = process.env.API_ADDRESS ?? "http://localhost:3000";

export async function request(url: string): Promise<any>;
export async function request(
  url: string,
  token: AccessTokenClassInterface,
): Promise<any>;
export async function request(url: string, req: RequestInit): Promise<any>;
export async function request(
  url: string,
  token: AccessTokenClassInterface,
  req: RequestInit,
): Promise<any>;
export async function request(
  url: string,
  tokenOrReq?: AccessTokenClassInterface | RequestInit,
  reqBody?: RequestInit,
): Promise<any> {
  // -> check AccessToken expiry date
  //  -> if AccessToken is expired based on it's date, refresh  with http token for user automatically

  // map req and token to variables
  // console.log("from request");
  // console.log(tokenOrReq);
  const isToken = tokenOrReq && tokenOrReq["token"] ? true : false;
  // const isToken = tokenOrReq["token"] ? true : false;
  // type typeCheck<T, U> =
  //   (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  //     ? true
  //   : false;
  // type test = typeCheck<typeof tokenOrReq, AccessTokenStructureInterface>

  // const isToken = test;
  function resolveReq(): RequestInit {
    let req: RequestInit = {};
    if (isToken) {
      if (reqBody) req = Object.assign(req, reqBody);
    } else {
      req = Object.assign(req, tokenOrReq);
    }
    return req;
  }

  const req: RequestInit = resolveReq();
  // console.log(req);
  const token = isToken
    ? new AccessToken(tokenOrReq as AccessTokenClassInterface)
    : undefined;

  // console.log("token");
  // console.log(token);

  // console.log("req");
  // console.log(req);

  // console.log("tokenOrReq");
  // console.log(tokenOrReq);

  if (token) {
    req.headers = Object.assign(
      { Authorization: `Bearer ${token.token}` },
      req.headers,
    );
    // console.log("token inserted", req.headers);
  }

  const headers = req?.headers ? req.headers["Content-Type"] : undefined;
  console.log(headers);
  if (!headers && req.method === "GET" && !(req.body instanceof FormData)) {
    // console.log(
    //   "looks like header doesn't have content-type, fallbacking to application/json",
    // );
    req.headers["Content-Type"] = "application/json";
  }

  if (!req.method) {
    // console.log(
    //   "looks like method isn't defined, fallbacking to GET method for security purposes",
    // );
    req.method = "GET";
  }

  const res = await fetch(`${API_ADDRESS}/${url}`, req);
  // console.clear();
  console.group();
  console.log();
  console.log(
    `[APIService] request made to API at '${url}'. This is the following data entered while it's response:`,
  );
  console.log();

  console.group();
  console.log(`- URL: ${url}`);
  console.groupEnd();

  console.log();

  console.group();
  console.log(`- headers?:`, req);
  console.groupEnd();

  console.group();
  console.log(res);
  console.groupEnd();

  console.log();

  // console.group();
  // console.log(`- Response from API: `);
  // const logResData = res.ok ? await res.json() : undefined;
  // console.log(logResData);
  // console.groupEnd();

  console.log();
  console.groupEnd();
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

export async function genericEditRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id: number,
  form: FormData,
  bodyFormat: "json" | "form",
  returnResponse?: boolean,
  overrideMethod?: string,
) {
  const url = `${endpoint}${id !== -1 ? `/${id}` : ""}`;
  let body: string | FormData;
  const headers: HeadersInit = {};

  switch (bodyFormat) {
    case "json":
      body = JSON.stringify(FormUtils.toObject(form));
      headers["Content-Type"] = "application/json";
      break;
    case "form":
      body = form;
      break;
  }

  try {
    const res = await request(url, token, {
      method: overrideMethod ?? "PUT",
      body: body,
      headers: headers,
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      if (returnResponse) return data;
      return true;
    } else {
      const data = await res.json();
      console.log(data);

      if (returnResponse) return data;
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function genericPatchRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id?: number,
  form?: FormData,
  bodyFormat?: "json" | "form",
  returnResponse?: boolean,
) {
  const url = `${endpoint}${id != -1 ? `/${id}` : ""}`;
  const headers: HeadersInit = {};
  let body = undefined;

  const req: RequestInit = {
    method: "PATCH",
    headers: headers,
  };

  switch (bodyFormat) {
    case "json":
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(FormUtils.toObject(form));
      req["body"] = body;
      break;
    case "form":
      body = form;
      req["body"] = body;
      break;
  }
  try {
    const res = await request(url, token, req);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      if (returnResponse) return data;
      return true;
    } else {
      const data = await res.json();
      console.log(data);
      if (returnResponse) return data;
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function genericDeleteRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
): Promise<boolean>;
export async function genericDeleteRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id: number,
): Promise<boolean>;
export async function genericDeleteRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id: number,
  returnResponse: boolean,
): Promise<any>;
export async function genericDeleteRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id?: number,
  returnResponse?: boolean,
): Promise<any | boolean> {
  const url = `${endpoint}${id ? `/${id}` : ""}`;

  const res = await request(url, token, {
    method: "DELETE",
  });

  // console.log(res);

  if (res.ok) {
    if (returnResponse) return await res.json();
    return true;
  } else {
    if (returnResponse) return await res.json();
    return false;
  }
}

export async function genericGetRequest(endpoint: string): Promise<any>;
export async function genericGetRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
): Promise<any>;
export async function genericGetRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  mapper?: (value: any, index?: number, array?: any[]) => unknown,
): Promise<any>;
export async function genericGetRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id: number,
): Promise<any>;
export async function genericGetRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  id: number,
  mapper: CallableFunction,
): Promise<any>;
export async function genericGetRequest(
  tokenOrEndpoint: string | AccessTokenClassInterface,
  endpointParam?: string,
  idOrMapper?:
    | number
    | ((value: any, index?: number, array?: any[]) => unknown),
  mapperParam?: (value: any, index?: number, array?: any[]) => unknown,
): Promise<any> {
  let endpoint =
    typeof tokenOrEndpoint === "string" ? tokenOrEndpoint : endpointParam;
  const token =
    typeof tokenOrEndpoint !== "string" ? tokenOrEndpoint : undefined;
  const id = typeof idOrMapper === "number" ? idOrMapper : undefined;
  const mapper = typeof idOrMapper !== "number" ? idOrMapper : undefined;

  const reqModel: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (id) endpoint = endpoint.concat(`/${id}`);

  try {
    const res = token
      ? await request(endpoint, token, reqModel)
      : await request(endpoint, reqModel);

    if (res.ok) {
      const resData = await res.json();
      console.log(`[genericGetRequest] data from URL ${endpoint}:`);
      console.log(resData);
      if (mapper) {
        if (resData.data) {
          if (Array.isArray(resData.data)) {
            return resData.data.map(mapper);
          } else {
            return mapper(resData.data);
          }
        }
      }
      // else return resData.data ? resData.data : resData;
    } else {
      const data = await res.json();
      console.log(`[genericGetRequest] not succefull from URL ${endpoint}:`);
      console.log(data);
      // console.log(data);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function genericRegisterRequest(
  token: AccessTokenClassInterface,
  endpoint: string,
  form: FormData,
  bodyFormat: "json" | "form",
  returnResponse?: boolean,
) {
  // const url = `${endpoint}/${id}`;
  let body: string | FormData;
  const headers: HeadersInit = {};

  switch (bodyFormat) {
    case "json":
      body = JSON.stringify(FormUtils.toObject(form));
      headers["Content-Type"] = "application/json";
      break;
    case "form":
      body = form;
      break;
  }

  try {
    const res = await request(endpoint, token, {
      method: "POST",
      body: body,
      headers: headers,
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      if (returnResponse) return data;
      return true;
    } else {
      const data = await res.json();
      console.log(data);

      if (returnResponse) return data;
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
