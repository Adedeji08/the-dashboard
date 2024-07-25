import { useState } from "react";
import { showToast } from "../toast";

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

  async function makeRequest(data?: any, params?: Record<string, any>) {
    setLoading(true);

    const queryParams = new URLSearchParams(params).toString();
    const urlWithParams = queryParams
      ? `${baseURL}${endpoint}?${queryParams}`
      : `${baseURL}${endpoint}`;

      try {
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
  
        if (response.status === 500) {
          showToast(
            json.message || "An error occurred, please try again",
            false,
            {
              position: "top-center",
            }
          );
        }
  
        setLoading(false);
  
        return [json, response.status];
      } catch (error) {
        setLoading(false);
        showToast("An error occurred, please try again", false, {
          position: "top-center",
        });
        return [{}, 500];
      }
    }
  
    return { loading, makeRequest, response, statusCode };
  }
  