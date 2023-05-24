import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import User from "../models/user.model";

export const buildFetcher = async <RequestType, ResponseType>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  user?: User,
  data?: RequestType,
  pathParams?: string[],
  queryParams?: Record<string, string>
) => {
  const endpointURL = `${url}${pathParams && pathParams?.length > 0 ? `/${pathParams.join('/')}` : ''}`;

  const options: AxiosRequestConfig<any> = {
    params: queryParams,
    paramsSerializer: (params) => {
      return Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
    },
    headers: {
      'Accept': 'application/json',
    }
  }
  if (user?.jwtToken) options.headers!['Authorization'] = `Bearer ${user.jwtToken}`

  if ([ 'get', 'delete', 'head', 'options' ].includes(method)) {
    return (await axios[method]<any, AxiosResponse<ResponseType>>(endpointURL, options)).data
  }
  return (await axios[method]<any, AxiosResponse<ResponseType>>(endpointURL, data, options)).data
}

export async function getFetcher<ResponseType>([url, user, pathParams, queryParams]: [string, User | undefined, string[] | undefined, Record<string, string> | undefined]) {
  return buildFetcher<never, ResponseType>(url, 'get', user, undefined, pathParams, queryParams)
}

export async function postFetcher<RequestType, ResponseType>([url, data, user, pathParams, queryParams]: [string, RequestType, User | undefined, string[] | undefined, Record<string, string> | undefined]) {
  return buildFetcher<RequestType, ResponseType>(url, 'post', user, data, pathParams, queryParams)
}

export async function patchFetcher<RequestType, ResponseType>([url, data, user, pathParams, queryParams]: [string, RequestType, User | undefined, string[] | undefined, Record<string, string> | undefined]) {
  return buildFetcher<RequestType, ResponseType>(url, 'patch', user, data, pathParams, queryParams)
}

export async function putFetcher<RequestType, ResponseType>([url, data, user, pathParams, queryParams]: [string, RequestType, User | undefined, string[] | undefined, Record<string, string> | undefined]) {
  return buildFetcher<RequestType, ResponseType>(url, 'put', user, data, pathParams, queryParams)
}

export async function deleteFetcher<ResponseType>([url, user, pathParams, queryParams]: [string, User | undefined, string[] | undefined, Record<string, string> | undefined]) {
  return buildFetcher<never, ResponseType>(url, 'delete', user, undefined, pathParams, queryParams)
}
