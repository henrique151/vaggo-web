import { ApiResponse, DataResponse } from "@/interface/api/api";

const API_ADDRESS = "http://localhost:3000/";

export type contentTypeSupport = "json" | "form-data";
export type requestTypeSupport = "GET" | "POST" | "UPDATE" | "DELETE" | "PATCH";

const contentTypeTable: Record<contentTypeSupport, string> = {
  json: "application/json",
  "form-data": "multipart/form-data",
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

  // console.log(
  // `header: ${JSON.stringify(requestHeader)}. body: ${JSON.stringify(requestBody)}`,
  // );

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
