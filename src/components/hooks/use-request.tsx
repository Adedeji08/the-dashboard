import { useState } from "react";

const baseURL =  process.env.REACT_APP_BACKEND_URL || 'https://staging-api.admin.vendstash.com'

export default function useRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  headers?: Record<string, any>
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [statusCode, setStatusCode] = useState(0);
  const token = localStorage.getItem("token");
async function makeRequest(data?: any, pathParams?: string, params?: Record<string, any>) {
  setLoading(true);

  let urlWithParams = `${baseURL}${endpoint}`;
  if (pathParams) {
    urlWithParams += `/${pathParams}`;
  }
  if (params) {
    const queryParams = new URLSearchParams(params).toString();
    urlWithParams += `?${queryParams}`;
  }

  const response = await fetch(urlWithParams, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body:
      method === "POST" || method === "PUT" || method === "DELETE" || method === "PATCH"
        ? JSON.stringify(data)
        : undefined,
  });

  const json = await response.json();

  setResponse(json);
  setStatusCode(response.status);

  setLoading(false);

  return [json, response.status];
}


  return { loading, makeRequest, response, statusCode };
}
