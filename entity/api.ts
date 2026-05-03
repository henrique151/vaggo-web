import { ApiResponse, DataResponse } from "@/interface/api/api";

const API_ADDRESS = "http://localhost:3000/";

export type contentTypeSupport = "json";
export type requestTypeSupport = "GET" | "POST" | "UPDATE" | "DELETE" | "PATCH";

const contentTypeTable: Record<contentTypeSupport, string> = {
  json: "application/json",
};

interface IcallParams {
  header?: HeadersInit;
  body?: any;
  method?: any;
  rawResponse?: boolean;
  dataOnly?: boolean;
  contentType?: contentTypeSupport;
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Fetch the application's API data and returns based on demand
 * @param uri API URI
 * @param useToken Insert Login Token on request
 * @param params Request Parameters
 * @returns API Response or Raw Response from fetch function. Returns undefined on anormalities
 */
export async function call(
  uri: string,
  useToken?: boolean,
): Promise<ApiResponse | undefined>;
export async function call(
  uri: string,
  useToken: boolean,
  params?: IcallParams,
): Promise<ApiResponse | DataResponse | Response | undefined>;
export async function call(
  uri: string,
  useToken: boolean = true,
  params?: IcallParams,
): Promise<ApiResponse | DataResponse | Response | undefined> {
  console.log(
    `params: -URI:${uri}, -Token?:${useToken}, Params:${JSON.stringify(params)}, content-type: ${params?.contentType}`,
  );

  let requestHeader: HeadersInit = {};
  let requestBody: any = {};
  const requestMethod = params?.method ? params.method : "GET";

  if (typeof window !== "undefined") {
    useToken
      ? (requestHeader["Authorization"] =
          `Bearer ${localStorage.getItem("token")}`)
      : null;
  }

  if (params) {
    params.contentType
      ? (requestHeader["Content-Type"] = contentTypeTable[params.contentType])
      : null;

    params.body ? (requestBody = params.body) : null;
    params.header ? Object.assign(requestHeader, params.header) : null;
    params.method ? null : (params.method = "GET");
    // params.header ? requestHeader = {...requestHeader, ...params.header} : null
    // params.body ? requestBody = {...requestBody, ...params.body} : null
  }

  requestHeader = isEmpty(requestHeader) ? { mode: "no-cors" } : requestHeader;
  requestBody = isEmpty(requestBody) ? undefined : requestBody;

  const res = await fetch(`${API_ADDRESS}${uri}`, {
    headers: requestHeader,
    body: requestBody,
    method: requestMethod,
  });

  // console.log(res)

  if (params && params.rawResponse) return res;

  if (res.ok) {
    if (params?.dataOnly) {
      const data = (await res.json()) as ApiResponse;

      return data.data as DataResponse;
    }
    return (await res.json()) as ApiResponse;
  }

  return undefined;
}

export default class API {
  readonly API_ADDRESS = "http://localhost:3000/";

  /**
   * Fetch the application's API data and returns based on demand
   * @param uri API URI
   * @param useToken Insert Login Token on request
   * @param params Request Parameters
   * @returns API Response or Raw Response from fetch function. Returns undefined on anormalities
   */
  async call(uri: string, useToken?: boolean): Promise<ApiResponse | undefined>;
  async call(
    uri: string,
    useToken: boolean,
    params?: IcallParams,
  ): Promise<ApiResponse | DataResponse | Response | undefined>;
  async call(
    uri: string,
    useToken: boolean = true,
    params?: IcallParams,
  ): Promise<ApiResponse | DataResponse | Response | undefined> {
    console.log(
      `params: -URI:${uri}, -Token?:${useToken}, Params:${JSON.stringify(params)}, content-type: ${params?.contentType}`,
    );

    let requestHeader: HeadersInit = {};
    let requestBody: any = {};
    const requestMethod = params?.method ? params.method : "GET";

    if (typeof window !== "undefined") {
      // on Typescript with ESlint, it gives an warning about using expressions where there is either no returnal or assingment in a variable or a line.
      // like this one down here and the others, where the expression "useToken" is being used as a single line condition-checking instead of a assigmnent or smth,
      // which i don't want to have anything declared inside `resquestHeader["Authorization"]` to prevent bugs, which happened some time ago.s
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      useToken
        ? (requestHeader["Authorization"] =
            `Bearer ${localStorage.getItem("token")}`)
        : null;
    }

    if (params) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      params.contentType
        ? (requestHeader["Content-Type"] = contentTypeTable[params.contentType])
        : null;

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      params.body ? (requestBody = params.body) : null;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      params.header ? Object.assign(requestHeader, params.header) : null;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      params.method ? null : (params.method = "GET");

      // params.header ? requestHeader = {...requestHeader, ...params.header} : null
      // params.body ? requestBody = {...requestBody, ...params.body} : null
    }

    requestHeader = isEmpty(requestHeader)
      ? { mode: "no-cors" }
      : requestHeader;
    requestBody = isEmpty(requestBody) ? undefined : requestBody;

    const res = await fetch(`${this.API_ADDRESS}${uri}`, {
      headers: requestHeader,
      body: requestBody,
      method: requestMethod,
    });

    // console.log(res)

    if (params && params.rawResponse) return res;

    if (res.ok) {
      if (params?.dataOnly) {
        const data = (await res.json()) as ApiResponse;

        return data.data as DataResponse;
      }
      return (await res.json()) as ApiResponse;
    }

    return undefined;
  }
}
// export async function calla(uri:string, header={}, options:fetchOptions = {contentType: 'json'}) {
//     const requestHeader : Record<string, string> = {...header}

//     requestHeader["Content-Type"] = contentTypeTable[options.contentType]

//     options.useToken ? requestHeader['Authorization'] = `Bearer ${localStorage.getItem('token')}` : null

//     // console.log(header)
//     // console.log(options)

//     const res = await fetch(`${API_ADDRESS}${uri}`, {
//         headers: requestHeader
//     })

//     if (options.returnResponse) {
//         return res
//     }

//     if (res.ok) {
//         switch  (options.contentType) {
//             case 'json':
//                 const data = await res.json()
//                 return data
//         }
//     }

//     // check if fetch was success and return the data fetched from API
//     // if API says that token is expired, redirects user directly to login page?
//     // if API returns 404, tries to resolve into another ips?
//     // if fetch returns any error, returns undefined or null

//     // return fetch(`${API_ADDRESS}${uri}`, {
//         // headers: requestHeader
//     // })

// }
