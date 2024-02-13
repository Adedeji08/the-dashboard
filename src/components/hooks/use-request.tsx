import { useState } from "react";

const baseURL = process.env.BACKEND_URL ? process.env.BACKEND_URL : "https://vendstash.mitochronhub.com";

export default function useRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  headers?: Record<string, any>
) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [statusCode, setStatusCode] = useState(0);
  const token = localStorage.getItem("token");

  async function makeRequest(data?: any, params?: Record<string, any>) {
    setLoading(true);

    const queryParams = new URLSearchParams(params).toString();
    const urlWithParams = queryParams
      ? `${baseURL}${endpoint}?${queryParams}`
      : `${baseURL}${endpoint}`;

    const response = await fetch(urlWithParams, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body:
        method === "POST" || method === "PUT" || method === "DELETE"
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
